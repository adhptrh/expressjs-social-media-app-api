import { Request, Response } from "express"

function Create(res: Response, req: Request) {
    res.send(JSON.stringify({
        "status":true,
        "message":"test"
    }))
}

function Get(res: Response, req: Request) {
    res.send(JSON.stringify({
        "status":true,
        "message":"test"
    }))
}

function Find(res: Response, req: Request) {
    res.send(JSON.stringify({
        "status":true,
        "message":"test"
    }))
}

function Update(res: Response, req: Request) {
    res.send(JSON.stringify({
        "status":true,
        "message":"test"
    }))
}

function Delete(res: Response, req: Request) {
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