import { Mails } from "../model/database.js";

export const getMails = async (request, response, next)=>{
  try {
    const list = await Mails();
    response.status(200).json(list)
  } catch (error) {
    next(error)
  }
}