import { Router } from "express";
import { ensureAuthenticate } from "@shared/infra/http/middlewares/ensureAuthenticate";
import { CreateSpecificationController } from "@modules/cars/useCases/createSpecification/CreateSpecificationController";
import { ensureAdmin } from "@shared/infra/http/middlewares/ensureAdmin";



const specificationsRoutes = Router();


const createSpecificationController = new CreateSpecificationController();

specificationsRoutes.post("/", ensureAuthenticate, ensureAdmin, createSpecificationController.handle);

export { specificationsRoutes };