import { Router } from "express";
import { getCustomers, getCustomersId, postCustomers } from "../controllers/customers.controllers.js";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { customersSchema } from "../schemas/customers.schemas.js";

const customersRouter = Router();

customersRouter.post("/customers", validateSchema(customersSchema), postCustomers);
customersRouter.get("/customers", getCustomers);
customersRouter.get("/customers/:id", getCustomersId);

export default customersRouter;