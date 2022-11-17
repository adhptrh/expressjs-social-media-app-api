import { Request, Response } from "express";
import Prisma from "../../prisma"

function Login(req: Request, res: Response) {
    res.send(JSON.stringify({
        "status":true,
        "message":"test"
    }))
}

function Register(req: Request, res: Response) {
    let lmao:RegisterRequest = req.body
    console.log(lmao.username)
    console.log(lmao.password)
    res.send(JSON.stringify({
        "status":true,
        "message":"test"
    }))
}

export {
    Login,
    Register
}