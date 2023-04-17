import { Express , Request , Response } from "express";
import { v4 } from "uuid";
import { config } from "../../dbconfig";
import sql from "mssql";
import { CustomResponse, Json } from "../../Response/Response";
import { RequestCheckToken} from "../../Middleware/Middleware";



export const creatOrUpdateRoom = async (req : Request , res : Response) : Promise<CustomResponse> =>{
    try{

        let {
            room_name,
            cinema_id,
            room_type_id,
            is_active
        } = req.body

        let {
            id
        } = req.params

        
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
        .input('id', parseInt(id))
        .input('room_name', room_name)
        .input('cinema_id', cinema_id)
        .input('room_type_id', room_type_id)
        .input('is_active', is_active)
        .input('is_delete', 0)
        .execute('Room_CreateOrUpdate_AdminWeb')
        
        const data = result && result.recordset && result.recordset.length > 0 && result.recordset[0] && result.recordset[0].RESULT ?  result.recordset[0].RESULT : null ;
        if(!data){
            return res.json({
                code : 500,
                data : {},
                type : false,
                message : "Khởi tạo phòng chiếu thất bại",
            })
        }
        
        return res.json({
            code : 200,
            type : true,
            data : data,
            message : "Lưu phòng chiếu thành công"
        })
    }catch(error : any){
        return res.json({
            code: 500,
            type : false,
            data: {},
            message: `${error.message}`
        });
    }
}


export const getListRoom = async (req : Request , res : Response) : Promise<CustomResponse> => {
    try{

        let {
            itemsPerPage,
            currentPage,
            keyword,
            cinema_id,
            room_type
        } = req.query

                
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
                .input('PAGESIZE' , itemsPerPage)
                .input('PAGEINDEX' , currentPage)
                .input('KEYWORD' , keyword)
                .input('cinema_id' , cinema_id)
                .input('room_type_id' , room_type)
                .execute('Room_getListRoom_AdminWeb')
        const data = result && result.recordset && result.recordset.length > 0  ? result.recordset : [];

        if(!data){
            return res.json({
                code : 404 ,
                type : false,
                data : {},
                message : "Không tìm thấy danh sách phòng chiếu",
            })
        }
        return res.json({
            code : 200,
            type : true,
            data :  data,
            message : 'Lấy danh sách phòng chiếu thành công'
        })
    }catch(error){
        return res.json({
            code : 500,
            data : {},
            type: false,
            message : `${error.message}`
        })
    }
}


export const deleteRoomById = async (req : Request , res : Response) : Promise<CustomResponse> => {
    try{

        let {
            id
        } = req.params

                
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
                .input('id' , id)
                .execute('Room_DeletebyId_AdminWeb')
        const data = result && result.recordset && result.recordset.length > 0 && result.recordset[0] && result.recordset[0].RESULT ? result.recordset[0].RESULT : null;

        if(!data){
            return res.json({
                code : 404 ,
                type : false,
                data : {},
                message : "Đã xảy ra lỗi khi xóa phòng chiếu này",
            })
        }
        return res.json({
            code : 200,
            type : true,
            data :  data,
            message : 'Xóa thành công thành công'
        })
    }catch(error){
        return res.json({
            code : 500,
            data : {},
            type: false,
            message : `${error.message}`
        })
    }
}




export const getDetailRoomById = async (req : Request , res : Response) : Promise<CustomResponse> => {
    try{

        let {
            id
        } = req.params

                
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
                .input('id' , id)
                .execute('Room_getDetailByID_AdminWeb')
        const data = result && result.recordset && result.recordset.length > 0 && result.recordset[0] ? result.recordset[0] : {};

        if(!data){
            return res.json({
                code : 404 ,
                type : false,
                data : {},
                message : "Không tìm thấy phòng chiếu này",
            })
        }
        return res.json({
            code : 200,
            type : true,
            data :  data,
            message : 'Lấy chi tiết phòng chiếu thành công'
        })
    }catch(error){
        return res.json({
            code : 500,
            data : {},
            type: false,
            message : `${error.message}`
        })
    }
}
