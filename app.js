import express from "express";
import cors from "cors";

// ROUTES
import chefs from "./routes/chefs.js";
import comments from "./routes/comments.js";
import newsletter from "./routes/newsletter.js";
import contacts from "./routes/contacts.js";
import admins from "./routes/admins.js";

// CONST
const app = express();

// MIDDLEWARES
app.use(express.json());
app.use(cors());

// PATH URL
app.use("/chefs", chefs);
app.use("/comments", comments);
app.use("/newsletter", newsletter);
app.use("/contacts", contacts);
app.use("/admins", admins);

export default app;
