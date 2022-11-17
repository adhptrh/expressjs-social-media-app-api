import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"
import { CustomRequest } from "../type/types"
export default function(req: CustomRequest, res: Response, next: NextFunction) {
    let token = req.headers["authorization"]?.split(" ")[1]

    if (token == undefined) {
        return res.status(401).json({
            "status":false,
            "message":"Unauthorized"
        })
    }

    jwt.verify(token, process.env.SECRET_TOKEN ?? "",(err:any, user:any) => {
        if (err) return res.status(401).json({
            "status":false,
            "message":"Invalid jwt token"
        })
        req.user = user
        next()
    })
    
}