import express from "express";
import  {routers} from  "./Router/index";


export const router = express.Router({
    strict: true
});

(() => {
    try{
        routers.forEach(route =>{
            // console.log(route);
            router.use(route.prefix , route.router);
        })
    }catch(error){
        console.log(error);
    }
})()



