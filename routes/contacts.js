import express from "express";
import { newMessage } from "../model/database.js";
import { getMessages } from "../controller/messages.controlleur.js";

const routeur = express.Router();

// ROUTES
routeur.get("/", getMessages)
routeur.post("/add", (request, response, next) => {
  try {
    newMessage(
      request.body.Fname,
      request.body.Lname,
      request.body.message,
      request.body.email
    );
    response.send("Send ! 🆗");
  } catch (error) {
    next(error);
  }
});

export default routeur;
