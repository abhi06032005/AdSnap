import express from "express";
import cors from "cors";
import  type{ Request, Response } from "express";
const app = express();

const port = process.env.PORT || 5000;
app.use(cors())
app.use(express.json())
app.get('/',  (req : Request, res : Response)=>{
    res.send("hi there");
})

app.listen(port);