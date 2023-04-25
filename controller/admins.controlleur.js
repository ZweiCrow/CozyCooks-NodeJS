import { Admins } from "../model/database.js"

export const getAdmin = async (request, response, next)=>{
  try {
    const list = await Admins()
    response.status(200).json(list)
  } catch (error) {
    next(error)
  }
}