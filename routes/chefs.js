import express from "express";
import { getChefs } from "../controller/chefs.controlleur.js";
import { newChef } from "../model/database.js";

const routeur = express.Router()

// ROUTES
routeur.get("/", getChefs)
routeur.post("/add", (request, response, next)=>{
  try {
    newChef(request.body.nom,request.body.job,request.body.photo,request.body.instagram,request.body.facebook,request.body.twitter);
    response.send("Send ! 🆗")
  } catch (error) {
    next(error)
  }
})

export default routeur;