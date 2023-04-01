import express, { Request, Response } from "express";
import {checkToken} from "../../Middleware/Middleware";
import {
    CreateSeatType,
    getList,
    deleteSeatType
} from "./seat-type.service";

export const router = express.Router({
    strict: true
});

router.post('/', checkToken ,  CreateSeatType);

router.post('/:id(\\d+)', checkToken ,  CreateSeatType);

router.get('/', getList)

router.delete('/:id(\\d+)', checkToken ,  deleteSeatType);





