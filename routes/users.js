const express = require("express")
const { addFavoriteToUser, addUser, getRecipesOfUser, getUserById, getUsers, removeFavoriteToUser, verifyUser } = require("../model/User.js")

const routeur = express.Router()

// ROUTES
routeur.get("/", getUsers)

routeur.get("/:id", getUserById)

routeur.get("/recipes/:id", getRecipesOfUser)

routeur.post("/add", addUser)

routeur.post("/verify", verifyUser)

routeur.patch("/addFav/:id", addFavoriteToUser)

routeur.patch("/removeFav/:id", removeFavoriteToUser)

module.exports = routeur ;