import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
/**
 * Generates jwt token for user to access the system(if only user exists).
\ * returns accessToken
 * @param {string} userId - user Id  from client. 
\ */
export const createToken = (userId) => {
  const accessToken = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "7d"
  });
  return accessToken;
};


