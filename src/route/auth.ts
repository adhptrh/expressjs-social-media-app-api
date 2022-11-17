import express, { Request, Response, Router } from "express"
import * as AuthController from "../controller/auth"
let router:Router = express.Router()

router.get("/login", AuthController.Login)
router.post("/register", AuthController.Register)


export default router