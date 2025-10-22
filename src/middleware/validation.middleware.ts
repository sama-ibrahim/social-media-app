import { NextFunction, Request, Response } from "express"
import { ZodSchema } from "zod/v3";
import { BadRequestException } from "../utils";
import { ZodType } from "zod";

export const isValid = (schema:ZodType) => {
    return (req:Request,res:Response,next :NextFunction) =>{
        
            // validation 
            //schema validates the body
            let data={...req.body , ...req.params,...req.query}
             const result = schema.safeParse(data);
             if(result.success==false){
              let errMessages = result.error.issues.map((issue) =>({
             path:issue.path[0],
             message:issue.message
              }));
              console.log(errMessages)
              let errMessagesString= JSON.stringify(errMessages)
              throw new BadRequestException("validation error" , errMessages)
             }else{
                next()
             }
    }
}