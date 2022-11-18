import { Request, Response } from "express"
import prismaClient from "../../prisma"
import { CustomRequest } from "../type/types"

async function Create(req: CustomRequest, res: Response) {
    if (req.user == undefined) {
        return res.status(401).json({
            status:false,
            message:"Unauthorized"
        })
    }
    let created = await prismaClient.post.create({
        data:{
            content:req.body.content,
            authorId:req.user.id ?? "",
        } 
    })
    return res.json({
        "status":true,
        "message":"Successfully posted!",
        "data":created
    })
}

async function GetAll(req: Request, res: Response) {
    let posts = await prismaClient.post.findMany({
        select: {
            id:true,
            content:true,
            author:{
                select: {
                    id:true,
                    username: true,
                    created_at: true,
                }
            },
            _count: {
                select: {
                    likes: true,
                }
            }
        }
    })
    res.json({
        "status":true,
        "message":"Success",
        "data":{
            "posts":posts,
        }
    })
}

async function Get(req: Request, res: Response) {
    let id = req.params.id
    let post = await prismaClient.post.findFirst({
        select: {
            id:true,
            content:true,
            _count: {
                select: {
                    likes: true,
                }
            }
        },
        where: {
            id:id
        }
    })
    if (post == null) {
        return res.status(404).json({
            "status":false,
            "message":"Post not found"
        })
    }
    return res.json({
        "status":true,
        "message":"Success",
        "data":post
    })
}

async function Update(req: CustomRequest, res: Response) {
    let post = await prismaClient.post.updateMany({
        where: {
            id:req.params.id,
            authorId:req.user?.id
        },
        data: {
            content: req.body.content
        }
    })

    if (post.count > 0) {
        return res.json({
            "status":true,
            "message":"Post updated"
        })
    }
    return res.json({
        "status":false,
        "message":"Invalid author"
    })
}

async function Delete(req: CustomRequest, res: Response) {
    let post = await prismaClient.post.deleteMany({
        where: {
            id:req.params.id,
            authorId:req.user?.id
        }
    })

    if (post.count > 0) {
        return res.json({
            "status":true,
            "message":"Post deleted"
        })
    }
    return res.json({
        "status":false,
        "message":"Post deleted or you're not an author."
    })
}

export {
    Get,
    GetAll,
    Update,
    Delete,
    Create

}