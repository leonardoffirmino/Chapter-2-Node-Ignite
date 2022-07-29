import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepository";


interface IPayload {
  sub: string;
}


export async function ensureAuthenticate(request: Request, response: Response, next: NextFunction) {

  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new Error("Token missing");
  }

  const [, token] = authHeader.split(" ");

  try {

    const { sub: user_id } = verify(token, "e4c82d0a8ed99ac9c9c1e1cf691a1854") as IPayload;

    const usersRepository = new UsersRepository();

    const user = usersRepository.findyById(user_id);

    if (!user) {
      throw new Error("User does not exists!");
    }

    next();
  } catch {

    throw new Error("Invalid token!");
  }



}