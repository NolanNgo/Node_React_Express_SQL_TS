import { Express, Request, Response } from "express";
import { v4 } from "uuid";
import { config } from "../../dbconfig";
import sql from "mssql";
import { CustomResponse, Json } from "../../Response/Response";
import { createAccessToken, RequestCheckToken } from "../../Middleware/Middleware";


export const createCinema = async (req: Request, res: Response): Promise<CustomResponse> => {
    try {
        let {
            cinema_type_id,
            cinema_name,
            cinema_address,
            district_code,
            province_code,
            ward_code,
            is_active
        } = req.body;


        let {
            id
        } = req.params


        if (!cinema_type_id ||
            !cinema_name ||
            !cinema_address ||
            !district_code ||
            !province_code ||
            !ward_code) {
            return res.json({
                code: 500,
                data: {},
                type: false,
                message: "Vui lòng điền đẩy đủ thông tin cần thiết"
            });
        }
        let { user_id, user_type_id } = (req as RequestCheckToken);
        if (user_type_id != `1`) {
            return res.json({
                code: 500,
                data: {},
                type: false,
                message: "Bạn không thuộc nhóm người dùng dùng chức năng này"
            });
        }

        let pool = await sql.connect(config);
        let result = await pool.request()
        .input('id', id)
        .input('cinema_type_id', cinema_type_id)
        .input('cinema_name', cinema_name)
        .input('is_active', is_active)
        .input('is_delete', 0)
        .input('district_code', district_code)
        .input('province_code', province_code)
        .input('ward_code', ward_code)
        .input('address', cinema_address)
        .execute('Cinemas_CreateOrUpdate_AdminWeb')

        const cinemas = result &&  result.recordset && result.recordset.length >0 && result.recordset[0] ? result.recordset[0] : null ;

        if(!cinemas){
            return res.json({
                code: 500,
                data: {},
                type: false,
                message : "Khởi tạo rạp phim thất bại vui lòng thử lại"
            });
        }
        return res.json({
            code: 200,
            data: cinemas,
            type: false,
            message: "Lưu rạp phim thành công"
        });
    } catch (error: any) {
        return res.json({
            code: 500,
            data: {},
            type: false,
            message: error.message
        });
    }
}


export const getList = async (req: Request, res: Response)  : Promise<CustomResponse> =>{
    try{
                
        let {
            itemsPerPage,
            currentPage,
            keyword
        } = req.query

        let pool = await sql.connect(config);
        let result = await pool.request()
        .input('PageSize', itemsPerPage)
        .input('PageIndex', currentPage)
        .input('KEYWORD', keyword)
        .execute('Cinemas_GetList_AdminWeb')
        
        const ListSeatType = result &&  result.recordset && result.recordset.length >0 ? result.recordset: null ;
        if(!ListSeatType){
            return res.json({
                code: 500,
                type : false,
                data: {},
                message: "Không tìm thấy danh sách loại ráp chiếu thất bại"
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

export const deleteCinemas = async (req: Request, res: Response)  : Promise<CustomResponse> =>{
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
        .execute('Cinemas_DeletebyId_AdminWeb')
        
        const ListRoomType = result &&  result.recordset && result.recordset.length >0 && result.recordset[0] && result.recordset[0].RESULT ? result.recordset[0].RESULT : null;
        if(!ListRoomType){
            return res.json({
                code: 500,
                type : false,
                data: {},
                message: "Đã xảy ra lỗi khi xóa rạp phim"
            });
        }
        return res.json({
            code: 200,
            type: true,
            data: ListRoomType,
            message: "Xóa rạp phim thành công",
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