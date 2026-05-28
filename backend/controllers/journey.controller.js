import Journey from "../models/journey.model.js";
import Version from "../models/version.model.js";
import generateJourneyReflection from "../services/ai.service.js";

async function handleGetJourneys(req, res) {
    try {
        const journeys = await Journey.find({
            author: req.user.id,
        }).sort({
            createdAt: -1,
        }).lean();

        const journeyIds = journeys.map((journey) => journey._id);

        const latestVersions = await Version.find({
            journeyId: {
                $in: journeyIds
            }
        })
        .sort({
            createdAt: -1
        })
        .lean();

        const latestVersionByJourney = new Map();

        latestVersions.forEach((version) => {
            const journeyId = version.journeyId.toString();

            if (!latestVersionByJourney.has(journeyId)) {
                latestVersionByJourney.set(journeyId, version);
            }
        });

        const journeysWithLatestUpdate = journeys.map((journey) => ({
            ...journey,
            latestVersion: latestVersionByJourney.get(journey._id.toString()) || null
        }));

        return res.status(200).json({
            journeys: journeysWithLatestUpdate,
        });
    } catch (err) {
        return res.status(500).json({
            error: err.message,
        });
    }
}

async function handlePostJourney(req,res)
{
    try{
        const {title,description,tags,isPublic = true} = req.body;
        if(!title || !description)
        {
            return res.status(400).json(
                {
                    error:"title and description are required!!!"
                }
            );
        }

        if (typeof isPublic !== "boolean") {
            return res.status(400).json({
                error: "isPublic must be true or false"
            });
        }
        
        const author = req.user.id;

        const journey = await Journey.create({
            title,
            description,
            author,
            tags,
            isPublic
        });

        return res.status(201).json({
            message : "Your journey has been posted",
            journey
        });
    }
    catch(err)
    {
        return res.status(500).json({error : err.message});
    }

}

async function handleGetJourneyByVersion(req,res)
{
    try{
        const journeyId = req.params.id;

        const journey = await Journey.findById(journeyId)
        .populate("author","username email profilePicture");

        if(!journey)
        {
            return res.status(404).json({error : "jouney not found!!"});
        }

        const isOwner = req.user?.id && journey.author._id.toString() === req.user.id;

        if (!journey.isPublic && !isOwner) {
            return res.status(403).json({
                error: "You are not allowed to view this journey"
            });
        }

        const versions = await Version.find({
            journeyId : journeyId
        }).sort({
            createdAt : 1
        });

        return res.status(200).json({
            journey,
            versions,
            canEdit: Boolean(isOwner)
        });
    }
    catch(err)
    {
        return res.status(500).json({
            error: err.message
        });
    }
}

async function handleGetAllJourneys(req,res){
    try{

        const journeys = await Journey.find({
            isPublic : true
        })
        .populate("author","username profilePicture")
        .sort({
            createdAt : -1
        })
        .lean();

        const journeyIds = journeys.map((journey) => journey._id);

        const latestVersions = await Version.find({
            journeyId: {
                $in: journeyIds
            }
        })
        .sort({
            createdAt: -1
        })
        .lean();

        const latestVersionByJourney = new Map();

        latestVersions.forEach((version) => {
            const journeyId = version.journeyId.toString();

            if (!latestVersionByJourney.has(journeyId)) {
                latestVersionByJourney.set(journeyId, version);
            }
        });

        const journeysWithLatestUpdate = journeys.map((journey) => ({
            ...journey,
            latestVersion: latestVersionByJourney.get(journey._id.toString()) || null
        }));

        return res.status(200).json({
            journeys: journeysWithLatestUpdate
        });
    }catch(err)
    {
        return res.status(500).json({
            error : err.message
        });
    }
}

async function handleJourneyReflection(req,res){
    
    try{
        const journeyId = req.params.id;

        const journey = await Journey.findById(journeyId);

        if(!journey)
        {
            return res.status(404).json({error:"no journey found!!"});
        }


        //check authorizations
        const user = journey.author.toString();

        if(user !== req.user.id)
        {
            return res.status(403).json({error:"unauthorized user!!"});
        }

        //fetch versions
        const versions = await Version.find({
            journeyId
        }).sort({
            createdAt : 1
        });

        if(versions.length === 0)
        {
            return res.status(400).json({
                error : "there are currently no versions!!!"
            });
        }

        //build reflection
        let timelineText = "";

        versions.forEach((version,index) => {
            timelineText += `Version ${index+1}
            Mood: ${version.mood}
            content: ${version.content}
            --------------------------`;
        });

        //generate reflection

        const reflection = await generateJourneyReflection(timelineText);
        return res.status(200).json({
            reflection
        });
    }catch(err)
    {
        return res.status(500).json({
            error : err.message
        });
    }
}
export {handleGetJourneys,handlePostJourney,handleGetJourneyByVersion,handleGetAllJourneys,handleJourneyReflection};
