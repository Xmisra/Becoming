import User from "../models/user.model.js";
import setUser from "../services/user.auth.js";
import bcrypt from "bcrypt";

// signup
async function handleUserSignup(req, res) {

    try {

        const { username, email, password } = req.body;

        // validation
        if (!username || !email || !password) {
            return res.status(400).json({
                error: "All fields are required",
            });
        }

        // check existing user
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(409).json({
                error: "Email already exists",
            });
        }

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // create user
        const user = await User.create({
            username,
            email,
            password: hashedPassword,
        });

        return res.status(201).json({
            message: "User signup successful",
            id : user._id,
            username : user.username,
            email : user.email
        });

    } catch (error) {

        return res.status(500).json({
            error: error.message,
        });
    }
}

// login
async function handleUserLogin(req, res) {

    try {

        const { email, password } = req.body;

        // validation
        if (!email || !password) {
            return res.status(400).json({
                error: "Email and password are required",
            });
        }

        // find user
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                error: "User not found",
            });
        }

        // compare password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                error: "Incorrect password",
            });
        }

        // generate token
        const token = setUser(user);

        // set cookie
        res.cookie("uid", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        return res.status(200).json({
            message: "Login successful",
        });

    } catch (error) {

        return res.status(500).json({
            error: error.message,
        });
    }
}

async function handleUserLogOut(req,res){

    res.clearCookie("uid",{
        httpOnly : true,
        secure : process.env.NODE_ENV === "production",
        sameSite : "strict"
    });

    return res.status(200).json({
        message : "logged out successfully"
    });
}

async function handleCurrentUser(req,res)
{
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
        return res.status(404).json({
            error: "User not found",
        });
    }

    return res.status(200).json({
        user
    });
}

async function handleProfilePictureUpload(req,res){
    
    try{
        if(!req.file)
        {
            return res.status(400).json({error : "No file uploaded!!"});
        }

        const filename = req.file.filename;

        const userId = req.user.id;

        const uploadFile = await User.findByIdAndUpdate(
            userId,

            {
                profilePicture : filename
            },

            {
                new : true
            }
        ).select("-password");

        if (!uploadFile) {
            return res.status(404).json({
                error: "User not found",
            });
        }

        return res.status(200).json({
            message : "File uploaded Successfully!!!",
            profilePicture : uploadFile.profilePicture,
            user: uploadFile
        });
    }
    catch(err)
    {
        return res.status(500).json({
            error : err.message
        });
    }
    
}
export { handleUserSignup, handleUserLogin,handleUserLogOut , handleCurrentUser,handleProfilePictureUpload};
