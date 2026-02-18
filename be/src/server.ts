import "../configs/instrument.mjs";
import express from "express";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";
import  type{ Request, Response } from "express";
import clerkWebhooks from "./clerk.js";
import * as Sentry from "@sentry/node";
import userRouter from "../routes/userRoutes.js";
import projectRouter from "../routes/projectRoutes.js";


const app = express();

const port = process.env.PORT || 5000;
// end point added here coz the webhook requires raw format not json
app.post('/api/clerk' , express.raw({type : 'application/json'}) , clerkWebhooks ) 

app.use(cors())
app.use(express.json())
app.use(clerkMiddleware())

app.get('/',  (req : Request, res : Response)=>{
    res.send("hi there");
})
app.use("/api/user", userRouter);
app.use("/api/project" , projectRouter)
app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});

Sentry.setupExpressErrorHandler(app);
app.listen(port);