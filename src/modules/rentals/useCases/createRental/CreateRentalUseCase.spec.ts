import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { CreateRentalUseCase } from "./CreateRentalUseCase";
import { AppError } from "@shared/errors/AppError";



let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;

describe("Create Rental", () => {
  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory);

  });

  it("should be able to create a new rental", async () => {
    const rental = await createRentalUseCase.execute({
      user_id: "12345",
      car_id: "122232",
      expected_return_date: new Date()
    });

    console.log(rental)

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });


  it("should not be able to create a new rental if there is another open to the same user", async () => {

    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "12345",
        car_id: "122232",
        expected_return_date: new Date()
      });



      await createRentalUseCase.execute({
        user_id: "12345",
        car_id: "122232",
        expected_return_date: new Date()
      });
    }).rejects.toBeInstanceOf(AppError);
  });


  it("should not be able to create a new rental if there is another open to the same car", async () => {

    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "123",
        car_id: "test",
        expected_return_date: new Date()
      });



      await createRentalUseCase.execute({
        user_id: "321",
        car_id: "test",
        expected_return_date: new Date()
      });
    }).rejects.toBeInstanceOf(AppError);
  });

});