import mongoose from "mongoose";

export const Chef = mongoose.model("Chefs",{
  name: String,
  job: String,
  photo: String,
  instagram: String,
  facebook: String,
  twitter: String
})