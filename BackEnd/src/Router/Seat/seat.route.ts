import express, { Request, Response } from "express";
import {checkToken} from "../../Middleware/Middleware";
import {
    createSeat
} from "./seat.service";


export const router = express.Router({
    strict: true
});


router.post('/', checkToken ,  createSeat);