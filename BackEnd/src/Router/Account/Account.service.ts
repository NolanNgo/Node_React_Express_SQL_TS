import express, { Request, Response } from "express";
import { v4 } from "uuid";
import { config } from "../../dbconfig";
import sql from "mssql";
import { CustomResponse, Json } from "../../Response/Response";
import { createHash } from "../../Middleware/config";
import {createAccessToken} from "../../Middleware/Middleware";
import bcrypt from "bcrypt";




export const signUp = async (req: Request, res: Response): Promise<CustomResponse> => {
    let {
        password,
        username,
        google_id,
        user_type_id,
        first_name,
        last_name,
        full_name,
        email,
        number_phone,
        age,
        gender,
        address,
        province_code,
        district_code,
        ward_code,
        avartar,
        user_type,
        logo,
        avatar = null,
        birthday,
        description
    } = req.body

    try {
        let passwordHash = createHash(password);
        let pool = await sql.connect(config);
        let result = await pool.request()
            .input('username', username)
            .input('password', passwordHash)
            .input('is_active', 1)
            .input('is_delete', 0)
            .input('first_name', first_name)
            .input('last_name', last_name)
            .input('user_type_id', user_type_id)
            .input('email', email)
            .input('age', age)
            .input('avatar', avatar)
            .input('full_name', full_name)
            .input('gender', gender)
            .input('number_phone', number_phone)
            .input('district_code', district_code)
            .input('province_code', province_code)
            .input('ward_code', ward_code)
            .input('birthday', birthday)
            .input('description', description)
            .input('address', address)
            .execute('User_Account_CreateOrUpdate_AdminWeb')
        const accountId = result.recordset[0].RESULT;
        if (!accountId) {
            return res.json({
                code: 500,
                data: {},
                message: "Đăng kí thất bại"
            });
        }
        return res.json({
            code: 200,
            data: {},
            message: "Đăng kí thành công"
        });
    } catch (error: any) {
        return res.json({
            code: 400,
            data: {},
            message: `${error.message}`
        });
    }
}

export const signIn = async (req: Request , res : Response) : Promise<CustomResponse> =>{
    try{
        let {
            password,
            username,
        } = req.body

        let pool = await sql.connect(config);
        let result = await pool.request()
        .input('username',username)
        .execute('User_Account_getInfor_AdminWeb');
        const account = result &&  result.recordset && result.recordset.length >0 && result.recordset[0] ? result.recordset[0] : null ;

        if(!account){
            return res.json({
                code: 404,
                data: {},
                message: "Tài khoản không tồn tại"
            });
        }
        let verify = bcrypt.compareSync(password, account.password);
        if(!verify){
            return res.json({
                code: 404,
                data: {},
                message: "Tài khoản hoặc mật khẩu không chính xác !"
            });
        }
        let accessToken : String = createAccessToken(account);
        return res.json({
            code: 200,
            data: account,
            message: "Đăng nhập thành công",
            AccessToken : accessToken
        });
    }catch(error : any){
        return res.json({
            code: 400,
            data: {},
            message: `${error.message}`
        });
    }
}