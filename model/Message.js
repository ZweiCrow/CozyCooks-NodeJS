import mongoose from "mongoose";

export const Message = mongoose.model("Messages",{
  Fname: String,
  Lname: String,
  message: String,
  email: String,
})