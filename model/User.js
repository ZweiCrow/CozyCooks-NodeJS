const { default: mongoose } = require("mongoose");
const bcrypt = require("bcrypt");
const {Recette} = require("./Recette.js")

// MODEL
 const User = mongoose.model("Users",{
  nom: String,
  email: String,
  password: String,
  favorites: Array,
})


// FONCTIONS DE CE MODEL

// GET
const getUsers = async (request, response, next) => {
  try {
    const users = await User.find()
    response.status(200).json(users)
  } catch (error) {}
}

const getUserById = async (request, response, next) => {
  try {
    const id = request.params.id
    const user = await User.findById(id)
    response.status(200).json(user)
  } catch (error) {}
}

const getRecipesOfUser = async (request, response, next) => {
  try {
    const id = request.params.id
    const user = await User.findById(id)
    const recettes = await Recette.find({auteur: id})
    const favRecipes = []

    for (const id of user.favorites) {
      const recipe = await Recette.findById(id)
      favRecipes.push(recipe)
    }
  
    for (const recipe of recettes) {
      favRecipes.push(recipe)
    }

    response.status(200).json(favRecipes)
  } catch (error) {}
}

// POST
const addUser = async (request, response, next) => {
  try {
    let salt = await bcrypt.genSalt(10)
    let hash = await bcrypt.hash(request.body.password, salt)
    const users = await User.find({email: request.body.email})

    const user = new User({
      nom: request.body.nom,
      email: request.body.email,
      password: hash,
      favorites: []
    }) 
  
    if(users.length === 0){
      await user.save();
      return response.status(200).json({ message: "User saved" })
    } else {
      return response.status(500).json({ message: "User with this email already exist" })
    }
  } catch (error) {}
}

const verifyUser = async (request, response, next) => {
  try {
    const user = await User.find({email: request.body.email})

    if(user.length !== 0){
      let compare = await bcrypt.compare(request.body.password, user[0].password)
      if(compare){
        return response.status(200).json({ message: user[0]._id })
      } else {
        return response.status(500).json({ message: "Wrong password" })
      }
    } else {
      return response.status(500).json({ message: "No user found" })
    }
  } catch (error) {}
}

// PATCH
const addFavoriteToUser = async (request, response, next) => {
  try {
    const id = request.params.id
    const recipe = request.body.recipe

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
    response.send(user)
    // response.send("Patched ! 🆗")
  } catch (error) {}
}

const removeFavoriteToUser = async (request, response, next) => {
  try {
    const id = request.params.id
    const user = await User.findById(id)                                            // Récupère l'utilisateur
    const newFav = [] 

    for (let i = 0; i < user.favorites.length; i++) {                               // Créer un nouveau tableau
      if (user.favorites[i] !== request.body.recipe) {
        newFav.push(user.favorites[i])
      }
    }
    user.favorites = newFav 
    const patchedUser = await User.findOneAndUpdate({_id: id}, user, {new: true})
    response.send("Patched ! 🆗")
  } catch (error) {}
}

module.exports = { User, addFavoriteToUser, addUser, getRecipesOfUser, getUserById, getUsers, removeFavoriteToUser, verifyUser }