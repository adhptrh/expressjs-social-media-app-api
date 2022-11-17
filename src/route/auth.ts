import express, { Request, Response, Router } from "express"
import * as AuthController from "../controller/auth"
import {body} from "express-validator"
import validateRequest from "../middleware/validate-request"
let router:Router = express.Router()

router.post(
    "/login",
    body("username").exists(),
    body("password").exists(),
    validateRequest,
    AuthController.Login
    )
router.post(
    "/register", 
    body("username").isLength({min:3,max:32}),
    body("password").isLength({min:6,max:32}),
    validateRequest,
    AuthController.Register
    )


export default router