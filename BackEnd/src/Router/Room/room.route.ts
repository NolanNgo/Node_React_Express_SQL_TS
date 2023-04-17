import express, { Request, Response } from "express";
import {checkToken} from "../../Middleware/Middleware";

import {
    creatOrUpdateRoom,
    getDetailRoomById,
    deleteRoomById,
    getListRoom
} from "./room.service";

export const router = express.Router({
    strict : true
})

router.post('/', checkToken, creatOrUpdateRoom);

router.get('/', checkToken ,getListRoom);

router.put('/:id(\\d+)', checkToken , creatOrUpdateRoom);

router.get('/:id(\\d+)', checkToken , getDetailRoomById);

router.delete('/:id(\\d+)', checkToken , deleteRoomById)