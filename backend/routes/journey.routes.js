import express from "express";
import { handleGetAllJourneys, handleGetJourneyByVersion, handleGetJourneys, handleJourneyReflection, handlePostJourney } from "../controllers/journey.controller.js";
import restrictValidUsersOnly from "../middlewares/auth.middleware.js";
import { optionalAuth } from "../middlewares/auth.middleware.js";

const journeyRoute = express.Router();

//get all journeys for logged-in user
journeyRoute.get("/",restrictValidUsersOnly,handleGetJourneys);

//get all journeys in a reading mode
journeyRoute.get("/explore",handleGetAllJourneys);

//post a journey
journeyRoute.post("/",restrictValidUsersOnly,handlePostJourney);

//generate journey reflection
journeyRoute.post("/:id/reflection",restrictValidUsersOnly,handleJourneyReflection);

//get a journey
journeyRoute.get("/:id",optionalAuth,handleGetJourneyByVersion);


export default journeyRoute;
