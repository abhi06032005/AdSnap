import { Request } from './../node_modules/effect/dist/dts/Request.d';
import type { Request } from "express";

declare global{
    namespace Express{
        interface Request{
            auth: ()=>{userId : string; has:(permission : any)=>
                boolean}
                plan?:string;
                file: any;
        }
    }
}