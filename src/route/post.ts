import express, { Request, Response, Router } from "express"
import * as PostController from "../controller/post"
import authenticated from "../middleware/authenticated"
let router:Router = express.Router()

router.get("/", PostController.GetAll)
router.get("/:id", PostController.Get)
router.post(
    "/", 
    authenticated,
    PostController.Create   
)
router.patch("/:id", PostController.Update)
router.delete("/:id", PostController.Delete)

export default router