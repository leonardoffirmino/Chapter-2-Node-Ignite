import { CreateRentalController } from "@modules/rentals/useCases/createRental/CreateRentalController";
import { Router } from "express";
import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";


const rentalRoutes = Router();


const createRentalController = new CreateRentalController();


rentalRoutes.post("/", ensureAuthenticate, createRentalController.handle);



export { rentalRoutes };