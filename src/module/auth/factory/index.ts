import { SYS_ROLE, USER_AGENT } from "../../../utils/common/enum";
import { generateExpiryDate, generateOTP } from "../../../utils/OTP";
import { RegisterDTO } from "../auth.dto";
import { User } from "../entity";
import { generateHash } from "../../../utils/hash";

export class AuthFactoryService {
  async createUser(registerDTO: RegisterDTO) {
    const user = new User();
    user.fullName = registerDTO.fullName as string;
    user.email = registerDTO.email;
    user.password = await generateHash(registerDTO.password);
    user.phoneNumber = registerDTO.phoneNumber as string; // encrypt phone number
    user.otp = generateOTP();
    user.otpExpiryAt = generateExpiryDate(
      5 * 60 * 60 * 1000
    ) as unknown as Date;
    user.credentialsUpdatedAt = Date.now() as unknown as Date;
    user.gender = registerDTO.gender;
    user.role = SYS_ROLE.user;
    user.userAgent = USER_AGENT.local;
    user.isVerified = false;
    return user;
  }
}
