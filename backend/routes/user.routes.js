import express from "express";
import { handleUserSignup,handleUserLogin ,handleUserLogOut,handleCurrentUser,handleProfilePictureUpload} from "../controllers/user.controller.js";
import restrictValidUsersOnly from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multer.middleware.js";

const router = express.Router();

//create user/signup

router.post("/signup",handleUserSignup);

//login

router.post("/login",handleUserLogin);

//logout

router.post("/logout",handleUserLogOut);

//handling(validating) current user

router.get("/me",restrictValidUsersOnly,handleCurrentUser);


//uploading profile pic
router.post("/upload",restrictValidUsersOnly,upload.single("profilePicture"),handleProfilePictureUpload);


export default router;