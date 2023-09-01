import { ICreateRentalDTO } from "../dtos/ICreateRentalDTO";
import { Rental } from "../typeorm/entities/Rental";



interface IRentalsRepositorys {
  findOpenRentalByCar(car_id: string): Promise<Rental>;
  findOpenRentalByUser(user_id: string): Promise<Rental>;
  create(data: ICreateRentalDTO): Promise<Rental>;
}


export { IRentalsRepositorys }