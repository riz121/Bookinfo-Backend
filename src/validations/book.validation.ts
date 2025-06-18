import Joi from "joi";

const isbnRegex = /^(?:(?:ISBN(?:-1[03])?:?●)?(?=[0-9X]{10}$|(?=(?:[0-9]+[-●]){3})[-●0-9X]{13}$|97[89][0-9]{10}$|(?=(?:[0-9]+[-●]){4})[-●0-9]{17}$)(?:97[89][-●]?)?[0-9]{1,5}[-●]?[0-9]+[-●]?[0-9]+[-●]?[0-9X]$)|^\d{9}[\dxX]$/;

const create = Joi.object({
    title: Joi.string().required(),
    isbn: Joi.string().regex(isbnRegex).required(),
    qty: Joi.required(),
    author: Joi.object({
        name: Joi.string().max(100).required()
    }).required()
});

const update = Joi.alternatives().try(
    Joi.object({ title: Joi.string() }),
    Joi.object({ isbn: Joi.string().regex(isbnRegex) }),
    Joi.object({
        title: Joi.string(),
        isbn: Joi.string().regex(isbnRegex)
    })
);

export default { create, update };