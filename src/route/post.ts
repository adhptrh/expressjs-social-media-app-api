import express, { Request, Response, Router } from "express"
import * as PostController from "../controller/post"
let router:Router = express.Router()

router.get("/", PostController.Get)
router.get("/:id", PostController.Find)
router.post("/", PostController.Create)
router.patch("/:id", PostController.Update)
router.delete("/:id", PostController.Delete)

export default router