import { Router } from "express";
import { deleteRentals, getRentals, postRentals, postRentalsReturn } from "../controllers/rentals.controllers.js";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { rentalsSchema } from "../schemas/rentals.schemas.js";

const rentalsRouter = Router();

rentalsRouter.post("/rentals",validateSchema(rentalsSchema), postRentals);
rentalsRouter.post("/rentals/:id/return", postRentalsReturn);
rentalsRouter.delete("/rentals/:id", deleteRentals);
rentalsRouter.get("/rentals", getRentals);

export default rentalsRouter;