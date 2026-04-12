import { prisma } from "@repo/db/client"
import express from "express"

const app = express()

app.post("/hooks/catch/:userId/:zapId", async (req, res)=>{
    const { userId, zapId } = req.params
    const body = req.body
    const resposne = await prisma.$transaction(async (tx) =>{
        const run = await prisma.zapRun.create({
            data : {
                zapId : zapId,
                metadata : body 
            }
        })
        await prisma.zapRunOutbox.create({
            data : {
                zapRunId : run.id
            }
        })
        
    })
})
