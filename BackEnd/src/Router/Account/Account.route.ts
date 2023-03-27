import express, { Request, Response } from "express";
import {checkToken} from "../../Middleware/Middleware";
import {
    signIn,
    signUp,
    updateProfile,
    updatePassword


} from "./Account.service";
export const router = express.Router({
    strict: true
});


router.post('/sign-up', signUp)

router.post('/sign-in', signIn)

router.post('/update-profile', checkToken , updateProfile)

router.post('/update-password',checkToken , updatePassword)

