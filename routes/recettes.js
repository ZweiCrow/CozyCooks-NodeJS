import express, { response } from "express";
import { addRecette, getRecetteById, getRecettes, supprRecetteById } from "../model/Recette.js";
import fs from "fs"
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const routeur = express.Router()

// ROUTES
routeur.get("/", async (request, response,next)=>{
  try {
    const list = await getRecettes()
    response.status(200).json(list)
  } catch (error) {
    next(error)
  }
})
routeur.get("/:id", async (request, response,next)=>{
  try {
    const recette = await getRecetteById(request.params.id)
    response.status(200).json(recette)
  } catch (error) {
    next(error)
  }
})

routeur.post("/add", (request, response, next)=>{
  try {
    addRecette(
      request.body.nom,
      request.body.auteur,
      request.body.niveau,
      request.body.style,
      request.body.categorie,
      request.body.temps,
      request.body.ingredients,
      request.body.etapes,
      request.body.display
    );
    response.send("Send ! 🆗")
  } catch (error) {
    next(error)
  }
})

routeur.post("/upload", (request, response, next)=>{
  try {
    // Récuperer l'image
    const {image} = request.files

    
    const dt = new Date();
    const padL = (nr, len = 2, chr = `0`) => `${nr}`.padStart(2, chr);
    const date = `${padL(dt.getMonth()+1)}${padL(dt.getDate())}${dt.getFullYear()}${padL(dt.getHours())}${padL(dt.getMinutes())}`

    // Changement du nom de l'image pour qu'il corresponde a celui de la recette
    image.name = date+image.name

    // Enregistrement de l'image dans le back-end
    image.mv(__dirname.slice(0, -6) + '/public/images/' + image.name);
    // console.log(__dirname.slice(0, -6))

    response.send("Uploaded ! 🆗")
  } catch (error) {
    next(error)
  }
})

routeur.delete("/delete/:id", (request, response, next) => {
  const path = `./public/images/${request.params.id}.jpg`
  try {
    supprRecetteById(request.params.id)
    fs.unlink(path, (err) => {
      if (err) {
        console.error(err)
        return
      }
      //file removed
    })
    response.send("Deleted ! 🆗")
  } catch (error) {
    next(error)
  }
})

export default routeur;