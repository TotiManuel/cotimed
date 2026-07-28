import jwt from "jsonwebtoken";


const SECRET = process.env.JWT_SECRET || "cotimed_secret";


export const generarToken = (payload:any)=>{


    return jwt.sign(
        payload,
        SECRET,
        {
            expiresIn:"7d"
        }
    );


};