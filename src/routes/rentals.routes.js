import { Router } from "express";
import { deleteRentals, postRentals, postRentalsReturn } from "../controllers/rentals.controllers.js";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { rentalsSchema } from "../schemas/rentals.schemas.js";

const rentalsRouter = Router();

rentalsRouter.post("/rentals",validateSchema(rentalsSchema), postRentals);
rentalsRouter.post("/rentals/:id/return", postRentalsReturn);
rentalsRouter.delete("/rentals/:id", deleteRentals);

export default rentalsRouter;