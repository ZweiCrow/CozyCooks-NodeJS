import mongoose from "mongoose";
import app from "./app.js";
import { ENV } from "./config/env.js";

// PORT
const PORT = ENV.PORT || 8000;

const Connexion = async () => {
  await mongoose.connect(`mongodb+srv://${ENV.LOGIN}:${ENV.PASSWORD}@argon.e4u0pbq.mongodb.net/CozyCooks`)
  console.log(`Connecté à la base de donnée !`);
}

// LISTENER
app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
  Connexion();
});
