import express from "express";
import { deleteComment, newComment } from "../model/database.js";
import { getComments } from "../controller/comments.controlleur.js";

const routeur = express.Router();

// ROUTES
routeur.get("/", getComments);
routeur.post("/add", (request, response, next) => {
  try {
    newComment(
      request.body.nom,
      request.body.title,
      request.body.message,
      request.body.photo
    );
    response.send("Send ! 🆗");
  } catch (error) {
    next(error);
  }
});
routeur.delete("/delete/:id", (request, response, next)=>{
  try {
    deleteComment(request.params.id);
  } catch (error) {
    next(error)
  }
})

export default routeur;
