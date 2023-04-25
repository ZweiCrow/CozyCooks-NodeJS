import { Comments } from "../model/database.js";

export const getComments = async (request, response, next)=>{
  try {
    const list = await Comments();
    response.status(200).json(list)
  } catch (error) {
    next(error)
  }
}