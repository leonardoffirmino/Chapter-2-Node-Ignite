import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { ListCarsUseCase } from "./ListCarsUseCase";


let listCarsUseCase: ListCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {

  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listCarsUseCase = new ListCarsUseCase(carsRepositoryInMemory);
  });

  it("should be able to list all available cars", async () => {

    const car = await carsRepositoryInMemory.create({
      name: "Car1",
      description: "CarDescription",
      daily_rate: 130.00,
      license_plate: "ABD-3333",
      fine_amount: 30,
      brand: "Car_Brand",
      category_id: "category_id"
    });


    const cars = await listCarsUseCase.execute({});

    console.log(cars)

    expect(cars).toEqual([car]);
  });


  it("should  be able to list all available cars by name", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car3",
      description: "CarDescription",
      daily_rate: 130.00,
      license_plate: "ABD-3333",
      fine_amount: 30,
      brand: "Car_Brand_test",
      category_id: "category_id"
    });


    const cars = await listCarsUseCase.execute({
      brand: "Car_Brand_test"
    });

    expect(cars).toEqual([car]);
  });


});