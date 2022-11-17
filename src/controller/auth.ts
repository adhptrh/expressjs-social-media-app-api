import { Request, Response } from "express";

function Login(res: Response, req: Request) {
    res.send(JSON.stringify({
        "status":true,
        "message":"test"
    }))
}

function Register(res: Response, req: Request) {
    res.send(JSON.stringify({
        "status":true,
        "message":"test"
    }))
}

export {
    Login,
    Register
}