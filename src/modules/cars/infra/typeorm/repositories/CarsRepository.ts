import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { Car } from "../entities/Car";
import { Repository, getRepository } from "typeorm";




class CarsRepository implements ICarsRepository {

  private repository: Repository<Car>;

  constructor() {
    this.repository = getRepository(Car);
  }


  async create({
    brand,
    name,
    daily_rate,
    category_id,
    fine_amount,
    license_plate,
    description
  }: ICreateCarDTO): Promise<Car> {

    const car = this.repository.create({
      brand,
      name,
      daily_rate,
      category_id,
      fine_amount,
      license_plate,
      description
    });

    await this.repository.save(car);

    return car;
  }



  async findByLicensePlate(license_plate: string): Promise<Car> {
    const car = await this.repository.findOne({
      license_plate
    });

    return car;
  }

}


export { CarsRepository };