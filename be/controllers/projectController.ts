import type { Response ,Request } from "express"
import * as Sentry from "@sentry/node"
import { prisma } from "../configs/prisma.js";
export const createProject = async (req: Request , res: Response)=>{
    let tempProjectId : string ;
    const {userId} = req.auth();
    let isCreditDeducted = false ;

    const {name ="New Project" , aspectRatio , userPrompt ,
        productName , productDescription , targetLength = 5
    } = req.body;

    const images : any = req.file;

    if(images.length < 2 || !productName){
        return res.status(400).json({message: 'Please upload at least 2 iamges '})
    }

    const user = prisma.user.findUnique({
        where:{id : userId}
    })

    if(!user || user.name< 5){
        return
    }
    try {
        
    } catch (error : any) {
        Sentry.captureException(error)
        res.status(500).json({message : error.message})
    }
}

export const createVideo = async (req: Request , res: Response)=>{
    try {
        
    } catch (error : any) {
        Sentry.captureException(error)
        res.status(500).json({message : error.message})
    }
}


export const getAllPublishedProjects = async (req: Request , res: Response)=>{
    try {
        
    } catch (error : any) {
        Sentry.captureException(error)
        res.status(500).json({message : error.message})
    }
}

export const deleteProject =(req: Request , res: Response)=>{
    try {
        
    } catch (error : any) {
        Sentry.captureException(error)
        res.status(500).json({message : error.message})
    }
}