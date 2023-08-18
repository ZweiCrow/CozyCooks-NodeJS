import express from "express";
import { addFavoriteToUser, addUser, getRecipesOfUser, getUserById, getUsers, removeFavoriteToUser, verifyUser } from "../model/User.js";

const routeur = express.Router()

// ROUTES
routeur.get("/", async (request, response, next)=>{
  try {
    const list = await getUsers()
    response.status(200).json(list)
  } catch (error) {
    next(error)
  }
})

routeur.get("/:id", async (request, response, next)=>{
  try {
    const user = await getUserById(request.params.id)
    response.status(200).json(user)
  } catch (error) {
    next(error)
  }
})

routeur.get("/recipes/:id", async (request, response, next)=>{
  try {
    const user = await getRecipesOfUser(request.params.id)
    response.status(200).json(user)
  } catch (error) {
    next(error)
  }
})

routeur.post("/add", async (request, response, next)=>{
  try {
    addUser(
      request.body.nom,
      request.body.email,
      request.body.password,
    ).then(verif => {
      response.send(verif.message)
    })
  } catch (error) {
    next(error)
  }
})

routeur.post("/verify", async (request, response, next)=>{
  try {
    verifyUser(
      request.body.email,
      request.body.password,
    ).then(verif => {
        response.send(verif.message);
    })
  } catch (error) {
    next(error)
  }
})

routeur.patch("/addFav/:id", async (request, response, next)=>{
  try {
    addFavoriteToUser(request.params.id, request.body.recipe)
    response.send("Patched ! 🆗")
  } catch (error) {
    next(error)
  }
})
routeur.patch("/removeFav/:id", async (request, response, next)=>{
  try {
    removeFavoriteToUser(request.params.id, request.body.recipe)
    response.send("Patched ! 🆗")
  } catch (error) {
    next(error)
  }
})


export default routeur;