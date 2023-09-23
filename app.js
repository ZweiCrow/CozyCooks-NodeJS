// import express from "express";
// import fileUpload from "express-fileupload";
// import cors from "cors";

const express = require("express")
const fileUpload = require("express-fileupload")
const cors = require("cors")

// ROUTES
// import recettes from "./routes/recettes.js";
// import users from "./routes/users.js"
const recettes = require("./routes/recettes.js")
const users = require("./routes/users.js")
const messages = require("./routes/messages.js")

// CONST
const app = express();

// MIDDLEWARES
app.use(express.json());
app.use(cors());
app.use(express.static('public'));
app.use('/images', express.static('images'));
app.use(
  fileUpload({
      limits: {
          fileSize: 10000000, // Around 10 MB
      },
      abortOnLimit: true,
  })
);

// PATH URL
app.use("/recettes", recettes)
app.use("/users", users)
app.use("/messages", messages)

// export default app;
