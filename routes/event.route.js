import express from "express";
import { createEvent, getAllEvents } from "../controllers/event.controller.js";

//   in this file we are defining the required routes for our application
const router = express.Router();

router.post("/createEvent", createEvent);  //   for creating a new event from database
router.get("/getAllEvents",  getAllEvents);    // for getting all the stored events from database

export default router;
