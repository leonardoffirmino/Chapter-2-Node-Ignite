
import { IRentalsRepositorys } from "@modules/rentals/repositories/IRentalRepository";
import { Rental } from "@modules/rentals/typeorm/entities/Rental";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";




interface IRequest {
  user_id: string;
  car_id: string;
  expected_return_date: Date;
}


@injectable()
class CreateRentalUseCase {

  constructor(
    @inject("RentalsRepository")
    private rentalsRepositorys: IRentalsRepositorys,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider
  ) { }


  async execute({
    car_id,
    expected_return_date,
    user_id
  }: IRequest): Promise<Rental> {

    const minimumHour = 24;

    const carUnAvailable = await this.rentalsRepositorys.findOpenRentalByCar(car_id);


    if (carUnAvailable) {
      throw new AppError("Car is unavailable!!");
    }


    const rentalOpenToUser = await this.rentalsRepositorys.findOpenRentalByUser(user_id);


    if (rentalOpenToUser) {
      throw new AppError("There's a rental in progress for user!!");
    };


    const dateNow = this.dateProvider.dateNow();

    const compare = this.dateProvider.compareInHours(
      dateNow,
      expected_return_date
    );

    if (compare < minimumHour) {
      throw new AppError("Invalid return time!");
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