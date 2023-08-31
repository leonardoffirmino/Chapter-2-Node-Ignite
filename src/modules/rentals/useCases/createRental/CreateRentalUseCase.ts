import { IRentalsRepositorys } from "@modules/rentals/repositories/IRentalRepository";
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
  }: IRequest): Promise<void> {

    const carUnAvailable = await this.rentalsRepositorys.findOpenRentalByCar(car_id);


    if (carUnAvailable) {
      throw new AppError("Car is unavailable!!");
    }


    const rentalOpenToUser = await this.rentalsRepositorys.findOpenRentalByUser(user_id);


    if (rentalOpenToUser) {
      throw new AppError("There's a rental in progress for user!!");
    }




  }
}

export { CreateRentalUseCase };