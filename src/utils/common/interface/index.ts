import { JwtPayload } from "jsonwebtoken";
import { GENDER, REACTION, SYS_ROLE, USER_AGENT } from "../enum";
import { Request } from "express";
import { ObjectId } from "mongoose";


export interface IAttachment{
     url : string;
     id:string;
}
export interface IUser{
    firstName:string;
    lastName:string;
    fullName?: string ; //virtual
    email:string;
    password:string;
    credentialUpdatedAt:Date;
    phoneNumber?:string;
    role:SYS_ROLE;
    gender:GENDER;
    userAgent:USER_AGENT;
    otp?:string;
    otpExpiryAt?:Date;
    isVerified:boolean

}
export interface IUser {
    _id:ObjectId ;
}
export interface IReaction{
 reaction :REACTION ;
  userId :ObjectId
}
export interface IPost{
    userId : ObjectId;
    content: string;
    reactions:IReaction[];
    attachments?: IAttachment[] 
}

export interface IPayload extends JwtPayload{
    _id:string ;
    role: string;

}

// export interface IAuthReq extends Request {
//  user:IUser;

// }

declare module "express" {
    interface Request {
        user:IUser
    }
}