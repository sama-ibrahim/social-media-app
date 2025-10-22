export class AppError extends Error{
    constructor(message: string , 
        public statuscode : number,
        public errorDetails?: object[] | any){// error details >> array of objects >. we displayed the result once 
        super(message)
    }
}

export class ConflictException extends AppError{
    constructor(message : string ,errorDetails?:object[] | any){
        super(message , 409,errorDetails)
    }
}

export class NotFoundException extends AppError{
    constructor(message : string , errorDetails?:object[] | any){
        super(message , 404,errorDetails)
    }
}

export class UnAuthorizedException extends AppError{
    constructor(message : string , errorDetails?:object[] | any){
        super(message , 401,errorDetails)
    }
}

export class BadRequestException extends AppError{
    constructor(message : string , errorDetails?:object[] | any){
        super(message , 400, errorDetails)
    }
}

export class ForbiddenException extends AppError{
    constructor(message : string , errorDetails?:object[] | any){
        super(message , 403, errorDetails)
    }
}