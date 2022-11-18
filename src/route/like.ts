import express, { Request, Response, Router } from "express"
import * as LikeController from "../controller/like"
import authenticated from "../middleware/authenticated"
let router:Router = express.Router()

router.post(
    "/:id", 
    authenticated,
    LikeController.Create   
)
router.delete(
    "/:id", 
    authenticated,
    LikeController.Delete
)

export default router