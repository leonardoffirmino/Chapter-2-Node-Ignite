import { describe, it } from "@jest/globals"
import { AppError } from "@shared/errors/AppError";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase"
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";



let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;


describe("Authenticate User", () => {

  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory);
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  })



  it("should be able to authenticate an user ", async () => {
    const user: ICreateUserDTO = {
      driver_license: "0002310",
      email: "user@teste.com.br",
      password: "12344",
      name: "User test"
    };


    await createUserUseCase.execute(user);


    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });


    expect(result).toHaveProperty("token");


  });


  it("should not be able to authenticate an nonexistent user", async () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: "false@email.com",
        password: "1234",
      });
    }).rejects.toBeInstanceOf(AppError);
  });


  it("should not be able to authenticate with incorrect password", () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        driver_license: "99929",
        email: "user@error.com",
        password: "1234",
        name: "User test Error"
      };


      await createUserUseCase.execute(user);


      await authenticateUserUseCase.execute({
        email: user.email,
        password: "IncorrectPassword"
      });


    }).rejects.toBeInstanceOf(AppError);

  });


})