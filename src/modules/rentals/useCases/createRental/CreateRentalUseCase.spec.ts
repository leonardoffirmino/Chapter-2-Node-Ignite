import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { CreateRentalUseCase } from "./CreateRentalUseCase";
import { AppError } from "@shared/errors/AppError";
import dayjs from "dayjs";
import { DayJsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";



let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let dayJsDateProvider: DayJsDateProvider;

describe("Create Rental", () => {
  const dayAdd24Hours = dayjs().add(1, "day").toDate();


  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    dayJsDateProvider = new DayJsDateProvider();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayJsDateProvider
    );
  });

  it("should be able to create a new rental", async () => {
    const rental = await createRentalUseCase.execute({
      user_id: "12345",
      car_id: "122232",
      expected_return_date: dayAdd24Hours
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
        expected_return_date: dayAdd24Hours
      });



      await createRentalUseCase.execute({
        user_id: "12345",
        car_id: "122232",
        expected_return_date: dayAdd24Hours
      });
    }).rejects.toBeInstanceOf(AppError);
  });


  it("should not be able to create a new rental if there is another open to the same car", async () => {

    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "123",
        car_id: "test",
        expected_return_date: dayAdd24Hours
      });



      await createRentalUseCase.execute({
        user_id: "321",
        car_id: "test",
        expected_return_date: new Date()
      });
    }).rejects.toBeInstanceOf(AppError);
  });



  it("should not be able to create a new rental with invalid return time", async () => {

    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "123",
        car_id: "test",
        expected_return_date: dayjs().toDate()
      });
    });
  });

});