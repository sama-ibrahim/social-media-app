// DO NOT FORGET TO REMOVE THIS LINE
 process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

import { NextFunction, Request, Response, type Express } from "express";
 import { authRouter , postRouter, userRouter } from "./module";
import { connectDB } from "./DB";
import { AppError } from "./utils";
import { error } from "console";
export function bootsrtap(app: Express, express: any) {
  //parsing data
  app.use(express.json());

  connectDB(); //operation buffering

  //auth
  app.use("/auth", authRouter);

 
//user
  app.use("/user" , userRouter);

//post
app.use("/post" ,postRouter)


 app.use("/{*dummy}", (req, res, next) => {
    return res.status(404).json({ message: "invalid router", success: false });
  });




  //global error handler
  app.use(
    (error: AppError, req: Request, res: Response, next: NextFunction) => {
      return res
      .status(error.statuscode||500)
      .json({
        message: error.message ,
        success: false,
        errorDetails:error.errorDetails
      });
      
    }
  );
   

}
