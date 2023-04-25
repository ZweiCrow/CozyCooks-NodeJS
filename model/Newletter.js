import mongoose from "mongoose";

export const Mail = mongoose.model("Newsletter",{
  mail: String,
})