import { IRentalsRepositorys } from "@modules/rentals/repositories/IRentalRepository";
import { Rental } from "@modules/rentals/typeorm/entities/Rental";
import { AppError } from "@shared/errors/AppError";


interface IRequest {
  user_id: string;
  car_id: string;
  expected_return_date: Date;
}



class CreateRentalUseCase {

  constructor(
    private rentalsRepositorys: IRentalsRepositorys
  ) { }


  async execute({
    car_id,
    expected_return_date,
    user_id
  }: IRequest): Promise<Rental> {

    const carUnAvailable = await this.rentalsRepositorys.findOpenRentalByCar(car_id);


    if (carUnAvailable) {
      throw new AppError("Car is unavailable!!");
    }


    const rentalOpenToUser = await this.rentalsRepositorys.findOpenRentalByUser(user_id);


    if (rentalOpenToUser) {
      throw new AppError("There's a rental in progress for user!!");
    }


    const rental = await this.rentalsRepositorys.create({
      user_id,
      car_id,
      expected_return_date
    });

    return rental;

  }
}

export { CreateRentalUseCase };