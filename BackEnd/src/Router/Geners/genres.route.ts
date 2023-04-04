import express, { Request, Response } from "express";
import {checkToken} from "../../Middleware/Middleware";


import {
    CreateGenres,
    getList,
    deleteGenres
} from "./genres.service";

export const router = express.Router({
    strict: true
});

router.post('/', checkToken ,  CreateGenres);

router.post('/:id(\\d+)', checkToken ,  CreateGenres);

router.get('/', getList)

router.delete('/:id(\\d+)', checkToken ,  deleteGenres);
