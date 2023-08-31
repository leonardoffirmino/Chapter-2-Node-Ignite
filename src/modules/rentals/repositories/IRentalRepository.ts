import { Rental } from "../typeorm/entities/Rental";



interface IRentalsRepositorys {
  findOpenRentalByCar(car_id: string): Promise<Rental>;
  findOpenRentalByUser(user_id: string): Promise<Rental>;
}


export { IRentalsRepositorys }