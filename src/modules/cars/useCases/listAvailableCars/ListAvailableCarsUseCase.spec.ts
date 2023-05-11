import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";


let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {

  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory);
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


    const cars = await listAvailableCarsUseCase.execute({});



    expect(cars).toEqual([car]);
  });


  it("should  be able to list all available cars by brand", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car3",
      description: "CarDescription",
      daily_rate: 130.00,
      license_plate: "ABD-3333",
      fine_amount: 30,
      brand: "Car_Brand_test",
      category_id: "category_id"
    });


    const cars = await listAvailableCarsUseCase.execute({
      brand: "Car_Brand_test"
    });



    expect(cars).toEqual([car]);
  });


  it("should  be able to list all available cars by name", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car2",
      description: "CarDescription",
      daily_rate: 130.00,
      license_plate: "AED-1111",
      fine_amount: 30,
      brand: "Car_Brand_test",
      category_id: "category_id"
    });


    const cars = await listAvailableCarsUseCase.execute({
      brand: "Car2"
    });



    expect(cars).toEqual([car]);
  });


  it("should  be able to list all available cars by category", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car2",
      description: "CarDescription",
      daily_rate: 130.00,
      license_plate: "AED-1111",
      fine_amount: 30,
      brand: "Car_Brand_test",
      category_id: "12345"
    });


    const cars = await listAvailableCarsUseCase.execute({
      brand: "12345"
    });



    expect(cars).toEqual([car]);
  });


});