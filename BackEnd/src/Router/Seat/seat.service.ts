import express, { Request, Response } from "express";
import { v4 } from "uuid";
import { config } from "../../dbconfig";
import sql from "mssql";
import { CustomResponse, Json } from "../../Response/Response";
import {createAccessToken, RequestCheckToken} from "../../Middleware/Middleware";

const arrayRow = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']



export const createSeat = async(req : Request , res : Response) : Promise<CustomResponse> =>{
    let pool = await sql.connect(config);
    const transaction = await new sql.Transaction(pool);
    try{
        let {
            room_id,
            list_seat = [],
        } = req.body
        await transaction.begin();
        for(let i = 0; i< list_seat.length ; i++){
            const requestCreateOrUpdateListSeat = new sql.Request(transaction);
            const data = await requestCreateOrUpdateListSeat
            .input('seat_id', parseInt(list_seat[i].seat_id || 0))
            .input('room_id', room_id)
            .input('seat_type_id', list_seat[i].seat_type_id)
            .input('row', list_seat[i].row)
            .input('number_seat', list_seat[i].number_seat)
            .input('is_active', list_seat[i].is_active)
            .execute('Seats_CreateOrUpdate_AdminWeb')
            const Seat =  data &&  data.recordset && data.recordset.length >0 && data.recordset[0] && data.recordset[0].RESULT ? data.recordset[0].RESULT : null;
            if(!Seat){
                await transaction.rollback();
                return res.json({
                    code: 500,
                    type : false,
                    data: {},
                    message: `Đã xảy ra lỗi khi thêm chỗ ngồi`
                });
            }
        }
        await transaction.commit();
        return res.json({
            code: 200,
            type : true,
            data: {},
            message: `Lưu thành công`
        });
    }catch(error : any){
        console.log(error);
        await transaction.rollback();
        return res.json({
            code: 400,
            type : false,
            data: {},
            message: `${error.message}`
        });
    }
}