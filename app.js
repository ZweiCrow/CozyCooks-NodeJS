import express from "express";
import fileUpload from "express-fileupload";
import cors from "cors";

// ROUTES
import recettes from "./routes/recettes.js";
import users from "./routes/users.js"

// CONST
const app = express();

// MIDDLEWARES
app.use(express.json());
app.use(cors());
app.use(express.static('public'));
app.use('/images', express.static('images'));
app.use(fileUpload());

// PATH URL
app.use("/recettes", recettes)
app.use("/users", users)

export default app;
