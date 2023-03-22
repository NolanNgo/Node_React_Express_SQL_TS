import express, { Request, Response } from "express";
import {
    signIn,
    signUp


} from "./Account.service";
export const router = express.Router({
    strict: true
});


router.post('/sign-up', signUp)

router.post('/sign-in', signIn)

