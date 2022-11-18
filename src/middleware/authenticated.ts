import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"
import { CustomRequest } from "../type/types"
import prismaClient from "../../prisma"
import { User } from "../type/types"

export default function(req: CustomRequest, res: Response, next: NextFunction) {
    let token = req.headers["authorization"]?.split(" ")[1]

    if (token == undefined) {
        return res.status(401).json({
            "status":false,
            "message":"Unauthorized"
        })
    }

    jwt.verify(token, process.env.SECRET_TOKEN ?? "",async (err:any, user:any) => {
        if (err) return res.status(401).json({
            "status":false,
            "message":"Invalid jwt token"
        })
        
        let userfound:(User|null) = await prismaClient.user.findFirst({
            select:{
                id:true,
                username:true,
                created_at:true,
            },
            where:{
                username:req.user?.username
            }
        })
        if (userfound == null){
            return res.status(401).json({
                "status":false,
                "message":"User not found"
            })
        }
        req.user = userfound
        next()
    })
    
}