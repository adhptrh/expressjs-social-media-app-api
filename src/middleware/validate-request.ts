import { NextFunction, Request, Response } from "express";
import {validationResult} from "express-validator"
export default function(req: Request, res: Response, next: NextFunction) {
    const errs = validationResult(req)
    if (!errs.isEmpty()) {
        return res.status(400).json({
            "status":false,
            "message":"Invalid request",
            "data":{
                "errors": errs.array()
            }
        })
    }
    next()
}