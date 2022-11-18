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
    console.log(req.body)
    console.log(req.user.id)
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

function Get(req: Request, res: Response) {
    res.send(JSON.stringify({
        "status":true,
        "message":"test"
    }))
}

function Find(req: Request, res: Response) {
    res.send(JSON.stringify({
        "status":true,
        "message":"test"
    }))
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
    Find,
    Update,
    Delete,
    Create

}