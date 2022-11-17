import { Request } from "express";

type RegisterRequest = {
    username: string;
    password: string;
}

type JWTUser = {
    username: string;
}

type CustomRequest = Request & {
    user?: JWTUser
}

export {
    RegisterRequest,
    CustomRequest,
}