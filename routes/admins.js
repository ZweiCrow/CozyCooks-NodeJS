import express from "express";
import { getAdmin } from "../controller/admins.controlleur.js";

const routeur = express.Router()

// ROUTES
routeur.get("/", getAdmin)


export default routeur;