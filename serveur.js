const { default: mongoose } = require("mongoose");
const { ENV } = require("./config/env.js")
const express = require("express")
const fileUpload = require("express-fileupload")
const cors = require("cors")
const app = express();

const recettes = require("./routes/recettes.js")
const users = require("./routes/users.js")

// PORT
const PORT = process.env.PORT || 8000;

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

const Connexion = async () => {
  await mongoose.connect(`mongodb+srv://${process.env.LOGIN}:${process.env.PASSWORD}@argon.e4u0pbq.mongodb.net/CozyCooks`)
  console.log(`Connecté à la base de donnée !`);
}

app.listen(PORT, ()=>{
  console.log(`Listening at http://localhost:${PORT}`);
  Connexion();
});
