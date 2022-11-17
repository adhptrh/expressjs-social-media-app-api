import bcrypt from "bcrypt"

function hashPassword(pwd:string, salt: string) {
    return new Promise<string>(async (res)=>{
        let hashed = await bcrypt.hash(pwd+salt+"noiceone",13)
        res(hashed)
    })
}

function hashCheck(pwd:string, salt:string, hash: string) {
    return new Promise<boolean>(async (res)=>{
        res(await bcrypt.compare(pwd+salt+"noiceone", hash))
    })
}

export {
    hashPassword,
    hashCheck
}