import { UserRepository } from "../../../DB";
import { BadRequestException, NotFoundException } from "../../../utils";
import { VerifyAccountDTO } from "../auth.dto";

export const authProvider ={
    async checkOTP (verifyAccountDTO:VerifyAccountDTO){
    const userRepository=new UserRepository();

     //check user Existence 
   const userExist = await userRepository.exist({
     email: verifyAccountDTO.email,
   });
   if(!userExist){
    throw new NotFoundException("user not found")
   }
   
    //check otp
  if(userExist.otp!= verifyAccountDTO.otp){ 
    throw new BadRequestException("invalid otp")
  }
    // checking otpExpirtAt is not undefined
  if (!userExist.otpExpiryAt) {
  throw new BadRequestException("OTP expiry date not set");
}

    //check otp expiryAt
  if(userExist.otpExpiryAt < new Date()){
    throw new BadRequestException("expired otp")
  }
  }
    }
