import express, { Request, Response } from "express";
import {checkToken} from "../../Middleware/Middleware";
import {
    CreateCinemaType,
    getList,
    deleteCinemaType
} from "./cinema-type.service";

export const router = express.Router({
    strict: true
});

router.post('/', checkToken ,  CreateCinemaType);

router.post('/:id(\\d+)', checkToken ,  CreateCinemaType);

router.get('/', getList)

router.delete('/:id(\\d+)', checkToken ,  deleteCinemaType);





