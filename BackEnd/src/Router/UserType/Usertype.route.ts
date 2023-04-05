import express, { Request, Response } from "express";
import {checkToken} from "../../Middleware/Middleware";
import {
    createOrUpdateUserType,
    getList,
    deleteUserType,
    getUserTypeByID
} from "./Usertype.service";


export const router = express.Router({
    strict: true
});

router.post('/', checkToken ,createOrUpdateUserType)

router.put('/:id(\\d+)', checkToken ,  createOrUpdateUserType)

router.get('/', checkToken ,  getList)

router.delete('/:id(\\d+)', checkToken ,  deleteUserType)


router.get('/:id(\\d+)', checkToken ,  getUserTypeByID)


