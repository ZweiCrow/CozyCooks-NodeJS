const express = require("express")

const { sendMessage } = require("../controller/Messages.js")
const routeur = express.Router()

// ROUTES

//POST
routeur.post("/send", sendMessage)


module.exports = routeur ;
