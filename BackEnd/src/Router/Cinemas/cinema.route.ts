import express, { Request, Response } from "express";
import {checkToken} from "../../Middleware/Middleware";
import {
    createCinema,
    getList ,
    deleteCinemas
} from "./cinemas.service";
export const router = express.Router({
    strict: true
});


router.post('/', checkToken ,createCinema)

// Cập nhật
router.post('/:id(\\d+)', checkToken ,  createCinema); 


router.get('/', getList)

router.delete('/:id(\\d+)', checkToken ,  deleteCinemas);