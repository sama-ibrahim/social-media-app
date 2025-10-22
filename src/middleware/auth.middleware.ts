import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/token";
import { UserRepository } from "../DB";
import { isGeneratorFunction } from "util/types";
import { NotFoundException } from "../utils";

export const isAuthenticated = () => {
 return async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization as string;
    const payload = verifyToken(token);
    //check user existence through id
    const userRepository = new UserRepository();
    const user = await userRepository.exist({ _id: payload._id });
    if (!user) {
      throw new NotFoundException("user not found");
    }
    //implementations >> check token >> log out from all devices
    req.user = user;
    next();
  };
};
