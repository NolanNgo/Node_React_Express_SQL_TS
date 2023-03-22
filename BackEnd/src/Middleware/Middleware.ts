// const jwt = require("jsonwebtoken");
import jwt, { Secret} from 'jsonwebtoken';
import dotenv from "dotenv";
import express, { Request, Response , NextFunction} from "express";
import { CustomResponse, Json } from "../Response/Response";
dotenv.config();

export interface TokenInterface {
    id: string;
    user_type_id: string;
}

export const SECRET_KEY: Secret = process.env.ACCESS_TOKEN!;

export const checkToken = (req : Request , res : Response ,  next: NextFunction ) : any =>{
    try{
        const authorToken = req.header("Authorization");
        const token = authorToken && authorToken.split(" ")[1];
        if (!token) {
            return res.json({ code: 404, message: "Access Token Not Found " , data: {} });
        }
        const decrypt = jwt.verify(token, SECRET_KEY);
		req.user_id = (decrypt as TokenInterface).id;
		req.user_type_id = (decrypt as TokenInterface).user_type_id;
		next();
    }catch(error : any){
        return res.json({ code: 500, message: error.message , data: {}});
    }
}

export const createAccessToken = (data : Object) : String =>{
    const accessToken = jwt.sign({ data }, SECRET_KEY ,  {
        expiresIn: '2 days',
    });
    return accessToken
}


// const checkToken = (req, res, next) => {
// 	const authorToken = req.header("Authorization");
// 	const token = authorToken && authorToken.split(" ")[1];
// 	if (!token) {
// 		return res.json({ code: 404, message: "Access Token Not Found " });
// 	}
// 	try {
// 		const decrypt = jwt.verify(token, process.env.ACCESS_TOKEN);
// 		req.user_id = decrypt.id;
// 		req.user_type_id = decrypt.user_type_id;
// 		next();
// 	} catch (error) {
// 		return res.json({ code: 500, message: error.message });
// 	}
// };

// const checkTokenForgotPassword = (req, res, next) => {
// 	const authorToken = req.header("Authorization");
// 	const token = authorToken && authorToken.split(" ")[1];
// 	if (!token) {
// 		return res.json({ code: 404, message: "Access Token Not Found " });
// 	}
// 	try {
// 		const decrypt = jwt.verify(token, process.env.ACCESS_TOKEN_VERIFY);
// 		req.user_id = decrypt.id;
// 		req.user_type_id = decrypt.user_type_id;
// 		req.user_name = decrypt.user_name;
// 		req.email = decrypt.email;
// 		next();
// 	} catch (error) {
// 		return res.json({ code: 500, message: error.message });
// 	}
// };

// module.exports = {
// 	checkToken,
// 	checkTokenForgotPassword
// };
