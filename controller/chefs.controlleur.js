import { Chefs } from "../model/database.js"

export const getChefs = async (request, response, next)=>{
  try {
    const list = await Chefs()
    response.status(200).json(list)
  } catch (error) {
    next(error)
  }
}