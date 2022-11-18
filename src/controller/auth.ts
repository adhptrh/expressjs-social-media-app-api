import { Request, Response } from "express";
import prismaClient, { Prisma } from "../../prisma"
import { validationResult } from "express-validator"
import bcrypt from "bcrypt"
import { hashPassword, hashCheck } from "../util/utils"
import jwt from "jsonwebtoken"
import {CustomRequest, RegisterRequest} from "../type/types"

async function Login(req: CustomRequest, res: Response) {
    let user = await prismaClient.user.findFirst({
        where:{
            username:req.body.username
        }
    })

    if (user == null) {
        return res.status(401).json({
            "status":false,
            "message":"Invalid username"
        })
    }
    let passCheck = await hashCheck(req.body.password,user.created_at.toUTCString(),user.password)
    if (passCheck) {
        let token = jwt.sign({"username":req.body.username}, process.env.SECRET_TOKEN ?? "" , {expiresIn:"7d"})
        res.json({
            status:true,
            message:"Successfully logged",
            data:{
                token:token
            }
        })
    } else {
        return res.status(401).json({
            "status":false,
            "message":"Wrong password"
        })
    }
}

async function Register(req: CustomRequest, res: Response) {
    let request:RegisterRequest = req.body 
    let created = new Date()
    let hashedPassword = await hashPassword(request.password,created.toUTCString())
    try {
       await prismaClient.user.create({
            data:{
                username: request.username,
                password: hashedPassword,
                created_at: created
            }
        })
        return res.json({
            "status":true,
            "message":"User registered"
        })
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            if (e.code == "P2002"){
                return res.status(403).json({
                    "status":false,
                    "message":"User already registered",
                })
            }
        } else {
            return res.status(500).json({
                "status":false,
                "message":"Unknown error"
            })
        }
    }
}

async function Me(req: CustomRequest, res: Response) {
    return res.json({
        "status":true,
        "message":"Authenticated",
        "data": req.user
    })
}

export {
    Login,
    Register,
    Me
}