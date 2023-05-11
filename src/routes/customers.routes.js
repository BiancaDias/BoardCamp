import { Router } from "express";
import { postCustomers } from "../controllers/customers.controllers.js";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { customersSchema } from "../schemas/customers.schemas.js";

const customersRouter = Router();

customersRouter.post("/customers", validateSchema(customersSchema), postCustomers);

export default customersRouter;