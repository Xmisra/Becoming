import express from "express";

import {handleJourneyVersion} from "../controllers/version.controller.js";

import restrictValidUsersOnly from "../middlewares/auth.middleware.js";

const versionRoute = express.Router();

// add version to journey
versionRoute.post(
    "/:id",
    restrictValidUsersOnly,
    handleJourneyVersion
);

export default versionRoute;