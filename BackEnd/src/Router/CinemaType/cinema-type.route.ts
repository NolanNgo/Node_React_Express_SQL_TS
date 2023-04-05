import express, { Request, Response } from "express";
import {checkToken} from "../../Middleware/Middleware";
import {
    CreateCinemaType,
    getList,
    deleteCinemaType,
    getCinemaTypeByID
} from "./cinema-type.service";

export const router = express.Router({
    strict: true
});

router.post('/', checkToken ,  CreateCinemaType);

router.post('/:id(\\d+)', checkToken ,  CreateCinemaType);

router.get('/', getList)

router.delete('/:id(\\d+)', checkToken ,  deleteCinemaType);

router.get('/:id(\\d+)', checkToken ,  getCinemaTypeByID);






