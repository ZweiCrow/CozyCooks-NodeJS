import mongoose from "mongoose";

export const Comment = mongoose.model("Comments",{
  name: String,
  title: String,
  message: String,
  photo: String,
})