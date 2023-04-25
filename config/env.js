import dotenv from "dotenv";
dotenv.config();

export const ENV = {
  PORT: process.env.PORT,
  LOGIN: process.env.LOGIN,
  PASSWORD: process.env.PASSWORD,
  URI: process.env.URI,
};
