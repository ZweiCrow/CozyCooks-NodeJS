import mongoose from "mongoose";

export const Admin = mongoose.model("Admins",{
  login: String,
  password: String,
})