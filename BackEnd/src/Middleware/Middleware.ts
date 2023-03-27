// const jwt = require("jsonwebtoken");
import jwt, { Secret, JwtPayload} from 'jsonwebtoken';
import dotenv from "dotenv";
import express, { Request, Response , NextFunction} from "express";
import { CustomResponse, Json } from "../Response/Response";
dotenv.config();

// Định nghĩa định dạng của interfaceToken
export interface TokenInterface {
    data : {
        id: string;
        user_type_id: string;
        username : string;
    }
}


// Định nghĩa interface mở rộng của Request để đính user_id và loại người dùng vào ở middleware
export interface RequestCheckToken extends Request {
    user_id: string;
    user_type_id: string;
    username : string;

}

// Tạo secret key có dạng là Secret là 1 dạng trong jsonwebtoken 
export const SECRET_KEY: Secret = process.env.ACCESS_TOKEN!;


export const checkToken = (req : Request , res : Response ,  next: NextFunction ) =>{
    try{
        const authorToken = req.header("Authorization");
        const token = authorToken && authorToken.split(" ")[1];
        if (!token) {
            return res.json({ code: 404, message: "Access Token Not Found " , data: {} });
        }
        const decrypt = jwt.verify(token, SECRET_KEY);
		(req as RequestCheckToken).user_id = (decrypt as TokenInterface).data.id;
        (req as RequestCheckToken).user_type_id = (decrypt as TokenInterface).data.user_type_id;
        (req as RequestCheckToken).username = (decrypt as TokenInterface).data.username;
		next();
    }catch(error : any){
        return res.json({ code: 500, message: error.message , data: {}});
        // res.status(401).send('Please authenticate');
    }
}

export const createAccessToken = (data : Object) : String =>{
    const accessToken = jwt.sign({
        data
    }, SECRET_KEY ,  {
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
