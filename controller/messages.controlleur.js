import { Messages } from "../model/database.js";

export const getMessages = async (request, response, next)=>{
  try {
    const list = await Messages();
    response.status(200).json(list)
  } catch (error) {
    next(error)
  }
}