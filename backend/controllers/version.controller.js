import Version from "../models/version.model.js";
import Journey from "../models/journey.model.js";

async function handleJourneyVersion(req, res)
{
    try {

        const {
            content,
            mood
        } = req.body;

        // validation
        if(!content || !mood)
        {
            return res.status(400).json({
                error: "Content and mood are required"
            });
        }

        // get journey id
        const journeyId = req.params.id;

        // find journey
        const journey = await Journey.findById(journeyId);

        if(!journey)
        {
            return res.status(404).json({
                error: "Journey not found"
            });
        }

        // authorization check
        if(journey.author.toString() !== req.user.id)
        {
            return res.status(403).json({
                error:
                "You are not allowed to modify this journey"
            });
        }

        // create version
        const payload = await Version.create({

            journeyId,
            content,
            mood

        });

        return res.status(201).json({

            message:
            "Journey version updated successfully",

            payload

        });

    }
    catch(err)
    {
        return res.status(500).json({
            error: err.message
        });
    }
}

export { handleJourneyVersion };