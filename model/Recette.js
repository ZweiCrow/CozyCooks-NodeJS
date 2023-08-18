import mongoose from "mongoose";

// MODEL

export const Recette = mongoose.model("Recettes",{
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
export async function getRecettes(){
  const recettes = await Recette.find({auteur: "admin"})
  return recettes;
}

export async function getRecetteById(id){
  const recettes = await Recette.findById(id)
  return recettes;
}

// POST
export async function addRecette(nom, auteur, niveau, style, categorie, temps, ingredients, etapes, display){
  const recette = new Recette({
    nom: nom,
    auteur: auteur,
    niveau: niveau,
    style: style,
    categorie: categorie,
    temps: temps,
    ingredients: ingredients,
    etapes: etapes,
    display: display
  }) 
  // console.log(recette);
  
  await recette.save()
}

// DELETE
export async function supprRecetteById(id){
  await Recette.deleteOne({_id: id})
}