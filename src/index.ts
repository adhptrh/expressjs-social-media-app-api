import express, { Express, Request, Response, Router } from "express"
import dotenv from "dotenv"
import Auth from "./route/auth"
import Post from "./route/post"

dotenv.config()

const app: Express = express()
const port = process.env.PORT

app.use(express.json())
app.use("/auth", Auth)
app.use("/post", Post)

app.listen(port, ()=>{
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`)
})