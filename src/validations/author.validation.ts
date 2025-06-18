import Joi from "joi";

const author = Joi.object({
    name: Joi.string().max(100).required()
});

export default { author };