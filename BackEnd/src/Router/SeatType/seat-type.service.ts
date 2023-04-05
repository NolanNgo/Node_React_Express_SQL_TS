import { Express , Request , Response } from "express";
import { v4 } from "uuid";
import { config } from "../../dbconfig";
import sql from "mssql";
import { CustomResponse, Json } from "../../Response/Response";
import {createAccessToken, RequestCheckToken} from "../../Middleware/Middleware";

export const CreateSeatType = async (req: Request , res : Response) : Promise<CustomResponse> =>{
    try{

        let{
            seat_type_name,
            is_active,
            is_delete
        } = req.body;

        let {
            id
        } = req.params


        if(!seat_type_name){
            return res.json({
                code: 500,
                data: {},
                type : false,
                message: "Vui lòng điền đẩy đủ thông tin cần thiết"
            });
        }


        let {user_id , user_type_id} = (req as RequestCheckToken);
        if(user_type_id != `1`){
            return res.json({
                code: 500,
                data: {},
                type : false,
                message: "Bạn không thuộc nhóm người dùng dùng chức năng này"
            });
        }

        let pool = await sql.connect(config);
        let result = await pool.request()
        .input('id', id)
        .input('seat_type_name', seat_type_name)
        .input('is_active', is_active)
        .input('is_delete', is_delete)
        .execute('SeatType_CreateOrUpdate_AdminWeb')


        return res.json({
            code: 200,
            type: true,
            message: "Lưu thành công",
            // data: result,
        });
    }catch(error : any){
        return res.json({
            code: 400,
            type : false,
            data: {},
            message: `${error.message}`
        });
    }
}

export const getList = async (req: Request, res: Response)  : Promise<CustomResponse> =>{
    try{
                
        let pool = await sql.connect(config);
        let result = await pool.request().execute('SeatType_GetList_AdminWeb')
        
        const ListSeatType = result &&  result.recordset && result.recordset.length >0 ? result.recordset: null ;
        if(!ListSeatType){
            return res.json({
                code: 500,
                type : false,
                data: {},
                message: "Không tìm thấy danh sách loại chỗ ngồi"
            });
        }
        return res.json({
            code: 200,
            type: true,
            data: ListSeatType,
            message: "Lấy danh sách thành công",
        });
    }catch (error: any) {
        return res.json({
            code: 400,
            type : false,
            data: {},
            message: `${error.message}`
        });
    }
}

export const deleteSeatType = async (req: Request, res: Response)  : Promise<CustomResponse> =>{
    try{
        let {user_id , user_type_id} = (req as RequestCheckToken);
        if(user_type_id != `1`){
            return res.json({
                code: 500,
                type : false,
                message: "Bạn không thuộc nhóm người dùng dùng chức năng này",
                data: {},
            });
        }
        let {
            id
        } = req.params
                
        let pool = await sql.connect(config);
        let result = await pool.request()
        .input('id', id)
        .execute('SeatType_DeletebyId_AdminWeb')
        
        const ListUserType = result &&  result.recordset && result.recordset.length >0 && result.recordset[0] && result.recordset[0].RESULT ? result.recordset[0].RESULT : null;
        if(!ListUserType){
            return res.json({
                code: 500,
                type : false,
                data: {},
                message: "Xóa loại chỗ ngồi thất bại"
            });
        }
        return res.json({
            code: 200,
            type: true,
            data: ListUserType,
            message: "Xóa loại chỗ ngồi thành công",
        });
    }catch (error: any) {
        return res.json({
            code: 400,
            type : false,
            data: {},
            message: `${error.message}`
        });
    }
}


export const getSeatTypeByID = async (req: Request, res: Response)  : Promise<CustomResponse> =>{
    try{
        let {user_id , user_type_id} = (req as RequestCheckToken);
        if(user_type_id != `1`){
            return res.json({
                code: 500,
                type : false,
                message: "Bạn không thuộc nhóm người dùng dùng chức năng này",
                data: {},
            });
        }
        let {
            id
        } = req.params
                
        let pool = await sql.connect(config);
        let result = await pool.request()
        .input('id', id)
        .execute('SeatType_getDetailByID_AdminWeb')
        
        const SeatTypeDetail = result &&  result.recordset && result.recordset.length >0 && result.recordset[0] ? result.recordset[0] : null;
        if(!SeatTypeDetail){
            return res.json({
                code: 500,
                type : false,
                data: {},
                message: "Lấy chi tiết loại chỗ ngồi thất bại"
            });
        }
        return res.json({
            code: 200,
            type: true,
            data: SeatTypeDetail,
            message: "Lấy chi tiết loại chỗ ngồi thành công",
        });
    }catch (error: any) {
        return res.json({
            code: 400,
            type : false,
            data: {},
            message: `${error.message}`
        });
    }
}