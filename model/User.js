import mongoose from "mongoose";
import bcrypt from "bcrypt"
import { Recette } from "./Recette.js";

// MODEL

export const User = mongoose.model("Users",{
  nom: String,
  email: String,
  password: String,
  favorites: Array,
})


// FONCTIONS DE CE MODEL

// GET
export async function getUsers(){
  const users = await User.find()
  return users;
}

export async function getUserById(id){
  const user = await User.findById(id)
  return user;
}

export async function getRecipesOfUser(id){
  const user = await User.findById(id)
  const recettes = await Recette.find({auteur: id})
  const favRecipes = []

  console.log(recettes);

  for (const id of user.favorites) {
    const recipe = await Recette.findById(id)
    favRecipes.push(recipe)
  }

  for (const recipe of recettes) {
    favRecipes.push(recipe)
  }

  return favRecipes;
}

// POST
export async function addUser(nom, email, password){
  let salt = await bcrypt.genSalt(10)
  let hash = await bcrypt.hash(password, salt)
  const users = await User.find({email: email})

  const user = new User({
    nom: nom,
    email: email,
    password: hash,
    favorites: []
  }) 

  if(users.length === 0){
    await user.save();
    return { message: "User saved" }
  } else {
    return { message: "User with this email already exist" }
  }
}

export async function verifyUser(email, password){
  const user = await User.find({email: email})

  if(user.length !== 0){
    let compare = await bcrypt.compare(password, user[0].password)
    if(compare){
      return { message: user[0]._id }
    } else {
      return { message: "Wrong password" }
    }
  } else {
    return { message: "No user found" }
  }

  // await user.save();
}

// PATCH
export async function addFavoriteToUser(id, recipe){
  const user = await User.findById(id)                                              // Récupère l'utilisateur

  const isFound = user.favorites.some(e=>{                                        // Vérifie si l'id de la recette existe déjà
    if(e === recipe){
      return true;
    }
    return false
  })
  
  if(!isFound){                                                                   // Si l'id n'existe pas, alors il l'ajoute
    user.favorites.push(recipe)
  }
  
  const patchedUser = await User.findOneAndUpdate({_id: id}, user, {new: true})
  return patchedUser;
}

export async function removeFavoriteToUser(id, recipe){
  const user = await User.findById(id)                                            // Récupère l'utilisateur
  const newFav = []                                            

  for (let i = 0; i < user.favorites.length; i++) {                               // Créer un nouveau tableau
    if (user.favorites[i] !== recipe) {
      newFav.push(user.favorites[i])
    }
  }

  user.favorites = newFav                                                         // Remplace l'ancien par le nouveau
  
  
  const patchedUser = await User.findOneAndUpdate({_id: id}, user, {new: true})
  return patchedUser;
}