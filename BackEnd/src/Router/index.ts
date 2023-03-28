
// Tai khoan
import  {router as AccountRouter}  from "./Account/Account.route";

import  {router as UserTpyeRouter}  from "./UserType/Usertype.route";




export const routers = [
    {
        prefix : '/account',
        router : AccountRouter
    },
    {
        prefix : '/user-type',
        router : UserTpyeRouter
    },
]
