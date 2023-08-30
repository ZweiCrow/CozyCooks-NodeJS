const express = require("express")
const { response } = require("express")
const fs = require("fs")
const path = require("path")
const { fileURLToPath } = require("url")

const { addRecette, getRecetteById, getRecettes, supprRecetteById } = require("../model/Recette.js")
const routeur = express.Router()

// ROUTES
routeur.get("/", getRecettes)

routeur.get("/:id", getRecetteById)

routeur.post("/add", addRecette)

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

routeur.delete("/delete/:img/:id", supprRecetteById)

module.exports = routeur ;