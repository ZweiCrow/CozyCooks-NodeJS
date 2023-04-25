import express from "express";
import { deleteMail, newMail } from "../model/database.js";
import { getMails } from "../controller/newsletters.controlleur.js";

const routeur = express.Router();

// ROUTES
routeur.get("/", getMails);
routeur.post("/add", (request, response, next) => {
  try {
    newMail(request.body.mail);
    response.send("Send ! 🆗");
  } catch (error) {
    next(error);
  }
});
routeur.delete("/delete/:id", (request, response, next)=>{
  try {
    deleteMail(request.params.id);
  } catch (error) {
    next(error)
  }
})

export default routeur;
