import { inject, injectable } from "tsyringe";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { hash } from "bcryptjs";

import { IUsersRepository } from "../../repositories/IUsersRepository";



@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) { }




  async execute({ name, email, driver_license, password }: ICreateUserDTO): Promise<void> {

    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new Error("User already exists");
    }

    const passwordHash = await hash(password, 8);


    await this.usersRepository.create({
      name,
      email,
      driver_license,
      password: passwordHash
    })
  }
}


export { CreateUserUseCase }