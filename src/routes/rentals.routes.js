import { Router } from "express";
import { postRentals } from "../controllers/rentals.controllers.js";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { rentalsSchema } from "../schemas/rentals.schemas.js";

const rentalsRouter = Router();

rentalsRouter.post("/rentals",validateSchema(rentalsSchema), postRentals);

export default rentalsRouter;