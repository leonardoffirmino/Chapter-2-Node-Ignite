import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "../errors/AppError";
import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepository";


interface IPayload {
  sub: string;
}


export async function ensureAuthenticate(request: Request, response: Response, next: NextFunction) {

  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("Token missing", 401);
  }

  const [, token] = authHeader.split(" ");

  try {

    const { sub: user_id } = verify(token, "e4c82d0a8ed99ac9c9c1e1cf691a1854") as IPayload;

    const usersRepository = new UsersRepository();

    const user = usersRepository.findyById(user_id);

    if (!user) {
      throw new AppError("User does not exists!", 401);
    }

    next();
  } catch {

    throw new AppError("Invalid token!", 401);
  }



}