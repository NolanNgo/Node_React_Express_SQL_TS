// const express = require("express");
import express, { Request, Response } from "express";
import dotenv from "dotenv";
import bodyParse from "body-parser";
import cors from "cors";
import {CustomResponse} from "./Response/Response";
import helmet from "helmet";
import {router} from "./app.route";



dotenv.config();
const port = process.env.PORT || 4000;
const app = express();

const corsConfig = {
  credentials: true,
	origin: true,
};


app.use(bodyParse.json());
app.use(cors(corsConfig));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(express.static('upload'));

declare global {
    namespace Express {
      interface Request {
        user_id?: string,
        user_type_id? : string
      }
    }
  }
app.use("/api",router);



app.get('/' , (req : Request , res : Response) : CustomResponse =>{
    return res.json( {
        code : true , 
        data : {},
        message : "Welcome to my API"
    })
})


app.listen(port, () : void =>{
    console.log("App running at http://localhost:4000");
})

