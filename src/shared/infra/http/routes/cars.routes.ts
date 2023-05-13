import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { Router } from "express";
import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ListAvailableCarsController } from "@modules/cars/useCases/listAvailableCars/ListAvailableCarsController";


const carsRoutes = Router();


const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();



carsRoutes.post("/", ensureAuthenticate, ensureAdmin, createCarController.handle);

carsRoutes.get("/available", listAvailableCarsController.handle);


export { carsRoutes };