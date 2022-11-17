import { Request, Response } from "express";
import prismaClient, { Prisma } from "../../prisma"
import { validationResult } from "express-validator"
import bcrypt from "bcrypt"
import { hashPassword, hashCheck } from "../util/utils"

async function Login(req: Request, res: Response) {
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

    let passCheck = await hashCheck(req.body.password,user.createdAt.toUTCString(),user.password)
    if (passCheck) {
        res.json(user)
    } else {
        return res.status(401).json({
            "status":false,
            "message":"Wrong password"
        })
    }
}

async function Register(req: Request, res: Response) {
    let request:RegisterRequest = req.body
    let created = new Date()
    let hashedPassword = await hashPassword(request.password,created.toUTCString())
    try {
       await prismaClient.user.create({
            data:{
                username: request.username,
                password: hashedPassword,
                createdAt: created
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

export {
    Login,
    Register
}