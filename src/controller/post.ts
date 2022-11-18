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

function Update(req: Request, res: Response) {
    res.send(JSON.stringify({
        "status":true,
        "message":"test"
    }))
}

function Delete(req: Request, res: Response) {
    res.send(JSON.stringify({
        "status":true,
        "message":"test"
    }))
}

export {
    Get,
    GetAll,
    Update,
    Delete,
    Create

}