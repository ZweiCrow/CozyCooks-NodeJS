import app from "./app.js";
import { ENV } from "./config/env.js";
// import { Commande } from "./database.js";

// PORT
const PORT = ENV.PORT || 8000;

// LISTENER
app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});
