// DTO >> data to object 
// what i am expecting from the body
import { GENDER } from "../../utils/common/enum";

// register DTO
export interface RegisterDTO{
 
     fullName?: string ;  
     email:string;
     password:string;
     phoneNumber?:string;
     gender:GENDER;

}

// update user DTO
// export interface updateUserDTO extends Partial <RegisterDTO>{}  // partial makes them all optional

// verify Account DTO
 export interface VerifyAccountDTO{
     email: string;
     otp:string ;
 }

 // login DTO
  export interface LoginDTO {
   email:string;
   password:string;
  }
  