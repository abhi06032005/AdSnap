import type{ Request, Response  , NextFunction} from "express";
import * as Sentry from "@sentry/node";
export const protect = async(req:Request , res:Response , next: NextFunction) =>{
    try{
        const {userId} =req.auth()
        if(!userId){
            return res.status(401).json({
                message : 'Unauthorized'
            })
        }
    }catch(err : any){
        Sentry.captureException(err);
        res.status(401).json({message : err.message})
    }
}