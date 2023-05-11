import joi from "joi";

export const gamesSchema = joi.object({
    name: joi.string().min(1).required(),
    image: joi.string().required(),
    stockTotal: joi.number().positive().required(),
    pricePerDay: joi.number().positive().required()
})
