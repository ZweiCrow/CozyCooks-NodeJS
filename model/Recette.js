const { default: mongoose } = require("mongoose");
const { response } = require("express");
const fs = require("fs")
const path = require("path")

// MODEL
const Recette = mongoose.model("Recettes",{
  nom: String,
  auteur: String,
  niveau: String,
  style: String,
  categorie: String,
  temps: Number,
  ingredients: Array,
  etapes: Array,
  display: String, // image pour la page de la recette
})

// FONCTIONS DE CE MODEL

// GET
const getRecettes = async (request, response, next) => {
  try {
    const recettes = await Recette.find({auteur: "admin"})
    response.status(200).json(recettes)
  } catch (error) {}
}

const getRecetteById = async (request, response, next) => {
  try {
    const id = request.params.id
    const recette = await Recette.findById(id)
    response.status(200).json(recette)
  } catch (error) {}
}

// POST
const addRecette = async (request, response, next) => {
  try {
    const recette = new Recette({
      nom: request.body.nom,
      auteur: request.body.auteur,
      niveau: request.body.niveau,
      style: request.body.style,
      categorie: request.body.categorie,
      temps: request.body.temps,
      ingredients: request.body.ingredients,
      etapes: request.body.etapes,
      display: request.body.display
    }) 
    
    await recette.save()
  } catch (error) {}
}

// PATCH
const patchRecetteById = async (request, response, next) =>{
  try {
    const id = request.params.id
    const recette = new Recette({
      nom: request.body.nom,
      auteur: request.body.auteur,
      niveau: request.body.niveau,
      style: request.body.style,
      categorie: request.body.categorie,
      temps: request.body.temps,
      ingredients: request.body.ingredients,
      etapes: request.body.etapes,
      display: request.body.display
    })
    response.json(recette)
  } catch (error) {}
}

// DELETE
const supprRecetteById = async (request, response, next) => {
  try {
    const path = `./public/images/${request.params.img}`
    const id = request.params.id
    const deleted = await Recette.deleteOne({_id: id})
    fs.unlink(path, (err) => {
      if (err) {
        console.error(err)
        return
      }
      //file removed
    })
    response.status(200).json(path)
  } catch (error) {}
}

module.exports = { Recette, addRecette, getRecetteById, getRecettes, patchRecetteById, supprRecetteById }