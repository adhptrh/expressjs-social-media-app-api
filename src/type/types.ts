import { Request } from "express";
import User from "../model/user"

type RegisterRequest = {
    username: string;
    password: string;
}

type CustomRequest = Request & {
    user?: User
}

export {
    RegisterRequest,
    CustomRequest,
    User,
}