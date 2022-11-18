import { Response } from "express";
import { CustomRequest } from "../type/types";
import prismaClient from "../prisma"
import { Like } from "@prisma/client";

async function Create(req: CustomRequest, res: Response) {
    let checkPost = await prismaClient.post.findFirst({
        where:{
            id:req.params.id
        }
    })

    if (checkPost == null) {
        return res.status(404).json({
            "status":false,
            "message":"Post not found"
        })
    }

    let checkLike = await prismaClient.like.findFirst({
        where:{
            userId:req.user?.id,
            postId: req.params.id
        }
    })

    if (checkLike == null) {
        await prismaClient.like.create({
            data:{
                postId:req.params.id,
                userId:req.user?.id ?? ""
            }
        })
    
        return res.json({
            "status":true,
            "message":"Post liked"
        })
    }
    return res.status(403).json({
        "status":false,
        "message":"Already liked"
    })
}

async function Delete(req: CustomRequest, res: Response) {
    let deletes = await prismaClient.like.deleteMany({
        where:{
            userId:req.user?.id,
            postId:req.params.id
        }
    })

    if (deletes.count == 0) {
        return res.status(403).json({
            "status":false,
            "message":"Post already unliked"
        })
    }
    
    return res.json({
        "status":true,
        "message":"Post unliked"
    })
}

export {
    Create,
    Delete
}