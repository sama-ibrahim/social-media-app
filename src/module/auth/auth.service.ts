import type { Request, NextFunction, Response } from "express";
import { LoginDTO, RegisterDTO, VerifyAccountDTO } from "./auth.dto";
import {
  BadRequestException,
  compareHash,
  ConflictException,
  ForbiddenException,
  NotFoundException,
} from "../../utils";
import { UserRepository } from "../../DB";
import { AuthFactoryService } from "./factory";
import { authProvider } from "./provider/auth.provider";
import { generateToken } from "../../utils/token";
//provider

class Authservice {
  // private dbService = new DBService<IUser>(User)

  private userRepository = new UserRepository();
  private authFactoryService = new AuthFactoryService();
  constructor() {}

  // -------------------register -------------------------------------

  register = async (req: Request, res: Response, next: NextFunction) => {
    // get data from req
    const registerDTO: RegisterDTO = req.body;

    //check user existence
    const userExist = await this.userRepository.exist({
      email: registerDTO.email,
    });
    if (userExist) {
      throw new ConflictException("user already exists ");
    }

    //prepare data >> user document >> hashing - encryption - otp - translation
    const user = await this.authFactoryService.createUser(registerDTO);

    //save into db
    const createdUser = await this.userRepository.create(user);

    //send mail

    //  await sendMail({
    //   to:registerDTO.email,
    //   subject:"confirm email",
    //   html:`<h1> your otp is ${user.otp}</h1>`

    //  })
    // delete user.password; it should work on a doc , <search>

    // delete user.otp;

    //send respponse
    return res.status(201).json({
      message: "user cretaed successfully",
      success: true,
      data: { id: createdUser.id },
    });
  };

  //--------------------verify account-------------------

  verifyAccount = async (req: Request, res: Response) => {
    // get data from request
    const verifyAccountDTO: VerifyAccountDTO = req.body;

    // provider logic
    await authProvider.checkOTP(verifyAccountDTO);

    //update
    await this.userRepository.update(
      { email: verifyAccountDTO.email },
      { isVerified: true, $unset: { otp: "", otpExpiryAt: "" } }
    );

    return res.sendStatus(204); //no content >>done
  };

  //------------------login---------------------

  login = async (req: Request, res: Response) => {

    //get data from req >>FE
    const loginDTO: LoginDTO = req.body;

    //check user existence
    const userExist = await this.userRepository.exist({
      email: loginDTO.email,
    });
    if (!userExist) {
      throw new ForbiddenException("invalid credentials");
    }

    //check password
    if (!(await compareHash(loginDTO.password, userExist.password))) {
      throw new ForbiddenException("invalid credentials!");
    }

    //generate token
    const accessToken = generateToken({
      payload: { _id: userExist._id, role: userExist.role },
      options: { expiresIn: "1d" },
    });

    //send response
    return res
      .status(200)
      .json({
        message: "login successfully",
        success: true,
        data: { accessToken },
      });
  };
}

export default new Authservice();

//single tone design pattern

//forget password logic
//forget password >>send otp
//reset password >> otp , email <<
// 1- check user existence
//2- check otp
//3- check otp expiry at
