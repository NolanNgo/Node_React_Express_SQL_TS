import express, { Request, Response } from "express";
import {checkToken} from "../../Middleware/Middleware";
import {
    CreateRoomType,
    getList,
    deleteRoomType
} from "./room-type.service";

export const router = express.Router({
    strict: true
});

router.post('/', checkToken ,  CreateRoomType);

router.post('/:id(\\d+)', checkToken ,  CreateRoomType);

router.get('/', getList)

router.delete('/:id(\\d+)', checkToken ,  deleteRoomType);





