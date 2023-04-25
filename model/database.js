import { ENV } from "../config/env.js";
import mongoose from 'mongoose';

// MODELES
import { Chef } from "./Chef.js";
import { Comment } from "./Comment.js"
import { Mail } from "./Newletter.js"
import { Message } from "./Message.js";
import { Admin } from "./Admin.js";


// FONCTIONS

async function connexion(){
  await mongoose.connect(`mongodb+srv://${ENV.LOGIN}:${ENV.PASSWORD}@argon.e4u0pbq.mongodb.net/Restoral`)
}

export async function Chefs(){
  await mongoose.connect(`mongodb+srv://${ENV.LOGIN}:${ENV.PASSWORD}@argon.e4u0pbq.mongodb.net/Restoral`)

  const chefs = await Chef.find()
  return chefs;
}

export async function newChef(nom, job, photo, instagram, facebook, twitter){
  await mongoose.connect(`mongodb+srv://${ENV.LOGIN}:${ENV.PASSWORD}@argon.e4u0pbq.mongodb.net/Restoral`)
  
  const chef = new Chef({
    name: nom,
    job: job,
    photo: photo,
    instagram: instagram,
    facebook: facebook,
    twitter: twitter
  }) 
  
  await chef.save();
}

export async function Comments(){
  await mongoose.connect(`mongodb+srv://${ENV.LOGIN}:${ENV.PASSWORD}@argon.e4u0pbq.mongodb.net/Restoral`)

  const comment = await Comment.find()
  return comment;
}

export async function newComment(nom, title, message, photo){
  await mongoose.connect(`mongodb+srv://${ENV.LOGIN}:${ENV.PASSWORD}@argon.e4u0pbq.mongodb.net/Restoral`)
  
  const comment = new Comment({
    name: nom,
    title: title,
    message: message,
    photo: photo,
  }) 
  
  await comment.save();
}

export async function deleteComment(mail){
  await mongoose.connect(`mongodb+srv://${ENV.LOGIN}:${ENV.PASSWORD}@argon.e4u0pbq.mongodb.net/Restoral`)
  
  // await Mail.deleteOne({_id: mail})
  await Comment.deleteOne({_id: mail})
}

export async function Mails(){
  await mongoose.connect(`mongodb+srv://${ENV.LOGIN}:${ENV.PASSWORD}@argon.e4u0pbq.mongodb.net/Restoral`)

  const email = await Mail.find()
  return email;
}

export async function newMail(mail){
  await mongoose.connect(`mongodb+srv://${ENV.LOGIN}:${ENV.PASSWORD}@argon.e4u0pbq.mongodb.net/Restoral`)
  
  const email = new Mail({
    mail: mail,
  }) 
  
  await email.save();
}

export async function deleteMail(mail){
  await mongoose.connect(`mongodb+srv://${ENV.LOGIN}:${ENV.PASSWORD}@argon.e4u0pbq.mongodb.net/Restoral`)
  
  // await Mail.deleteOne({_id: mail})
  await Mail.deleteOne({_id: mail})
}

export async function Messages(){
  await mongoose.connect(`mongodb+srv://${ENV.LOGIN}:${ENV.PASSWORD}@argon.e4u0pbq.mongodb.net/Restoral`)

  const contact = await Message.find()
  return contact;
}

export async function newMessage(Fname, Lname, message, email){
  await mongoose.connect(`mongodb+srv://${ENV.LOGIN}:${ENV.PASSWORD}@argon.e4u0pbq.mongodb.net/Restoral`)
  
  const contact = new Message({
    Fname: Fname,
    Lname: Lname,
    message: message,
    email: email,
  }) 
  
  await contact.save();
}

export async function Admins(){
  await mongoose.connect(`mongodb+srv://${ENV.LOGIN}:${ENV.PASSWORD}@argon.e4u0pbq.mongodb.net/Restoral`)

  const login = await Admin.find()
  return login;
}

