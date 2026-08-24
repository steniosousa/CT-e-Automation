import { NextFunction, Request, Response } from "express";

export function IsLogged(req:Request, res:Response, next:NextFunction) {
    const {authorization} = req.headers

    if(!authorization){
        
    }

}