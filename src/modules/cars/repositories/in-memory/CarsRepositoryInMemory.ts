import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { ICarsRepository } from "../ICarsRepository";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";



class CarsRepositoryInMemory implements ICarsRepository {

  cars: Car[] = [];

  async create({ brand, category_id, daily_rate, fine_amount, name, description, license_plate }: ICreateCarDTO): Promise<Car> {
    const car = new Car();

    Object.assign(car, {
      brand,
      category_id,
      daily_rate,
      fine_amount,
      name,
      description,
      license_plate
    });

    this.cars.push(car);

    return car;
  }


  async findByLicensePlate(license_plate: string): Promise<Car> {
    return this.cars.find(car => car.license_plate === license_plate);
  }


  async findAvailable(brand?: string, name?: string, category_id?: string): Promise<Car[]> {
    const all = this.cars
      .filter((car) => {
        if (
          car.available === true ||
          (brand && car.brand === brand) ||
          (category_id && car.category_id === category_id) ||
          (name && car.name === name)
        ) {
          return car;
        }
        return null;
      });

    return all;
  }

  async findById(id: string): Promise<Car> {
    return this.cars.find((car) => car.id === id);
  }
}


export { CarsRepositoryInMemory }