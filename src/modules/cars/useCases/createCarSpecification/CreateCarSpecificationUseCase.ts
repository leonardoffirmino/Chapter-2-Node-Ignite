import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { AppError } from "@shared/errors/AppError";
import { inject } from "tsyringe";


interface IRequest {
  car_id: string;
  specifications_id: string[];
}



class CreateCarSpecificationUseCase {

  constructor(
    //@inject("CarsRepository")
    private carsRepository: ICarsRepository
  ) { }

  async execute({ car_id, specifications_id }: IRequest): Promise<void> {
    const carsExists = await this.carsRepository.findById(car_id);


    if (!carsExists) {
      throw new AppError("Car does not exists !!");
    }
  }
}


export { CreateCarSpecificationUseCase }