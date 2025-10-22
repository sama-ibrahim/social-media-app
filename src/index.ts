import express from "express";
import {log} from "console"
import { config } from "dotenv";
config()
import { bootsrtap } from "./app.controller.js";
const app=express();
const port= 3000;
bootsrtap(app,express)
app.listen(port,()=>{
    log("server is running on port ",port)
})

