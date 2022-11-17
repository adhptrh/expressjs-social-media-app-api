import { Request, Response } from "express";
import prismaClient, { Prisma } from "../../prisma"
import { validationResult } from "express-validator"

function Login(req: Request, res: Response) {
    res.send(JSON.stringify({
        "status":true,
        "message":"test"
    }))
}

async function Register(req: Request, res: Response) {
    let request:RegisterRequest = req.body
    try {
       await prismaClient.user.create({
            data:{
                username:request.username,
                password:request.password
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