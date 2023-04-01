
// Tai khoan
import  {router as AccountRouter}  from "./Account/Account.route";
// Loại người dùng
import  {router as UserTpyeRouter}  from "./UserType/Usertype.route";

import  {router as SeatTypeRouter}  from "./SeatType/seat-type.route";

import  {router as RoomTypeRouter}  from "./RoomType/room-type.route";

import  {router as CinemaTypeRouter}  from "./CinemaType/cinema-type.route";




export const routers = [
    {
        prefix : '/account',
        router : AccountRouter
    },
    {
        prefix : '/user-type',
        router : UserTpyeRouter
    },
    {
        prefix : '/seat-type',
        router : SeatTypeRouter
    },
    {
        prefix : '/room-type',
        router : RoomTypeRouter
    },
    {
        prefix : '/cinema-type',
        router : CinemaTypeRouter
    },

]
