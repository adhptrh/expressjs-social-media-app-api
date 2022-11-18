import express, { Request, Response, Router } from "express"
import * as PostController from "../controller/post"
import * as LikeController from "../controller/like"
import authenticated from "../middleware/authenticated"
let router:Router = express.Router()

router.get("/", PostController.GetAll)
router.get("/:id", PostController.Get)
router.post(
    "/", 
    authenticated,
    PostController.Create   
)
router.patch(
    "/:id",
    authenticated,
    PostController.Update
)
router.delete(
    "/:id", 
    authenticated,
    PostController.Delete
)
router.post(
    "/:id/like", 
    authenticated,
    LikeController.Create
)
router.delete(
    "/:id/like",
    authenticated,
    LikeController.Delete
)

export default router