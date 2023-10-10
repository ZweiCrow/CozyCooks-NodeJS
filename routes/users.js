const express = require("express")
const { addFavoriteToUser, addUser, getRecipesOfUser, getUserById, getUsers, removeFavoriteToUser, verifyUser, deleteUser, modifyUser } = require("../model/User.js")

const routeur = express.Router()

// ROUTES
routeur.get("/", getUsers)

routeur.get("/:id", getUserById)

routeur.get("/recipes/:id", getRecipesOfUser)

routeur.post("/add", addUser)

routeur.post("/verify", verifyUser)

routeur.patch("/modify/:id", modifyUser)

routeur.patch("/addFav/:id", addFavoriteToUser)

routeur.patch("/removeFav/:id", removeFavoriteToUser)

routeur.delete("/delete/:id", deleteUser)

module.exports = routeur ;