import Joi from "joi";

export const CreatePurchaseSchema = Joi.object({
  clientId: Joi.number().integer().positive().required().messages({
    "number.base": "ID do cliente deve ser um número",
    "number.positive": "ID do cliente deve ser positivo",
    "any.required": "ID do cliente é obrigatório",
  }),

  items: Joi.array()
    .items(
      Joi.object({
        productId: Joi.number().integer().positive().required().messages({
          "any.required": "ID do produto é obrigatório",
        }),
        quantity: Joi.number().integer().min(1).required().messages({
          "any.required": "Quantidade é obrigatória",
          "number.min": "Quantidade mínima é 1",
        }),
      })
    )
    .min(1)
    .required()
    .messages({
      "array.base": "Itens devem ser uma lista",
      "array.min": "É necessário pelo menos um item",
    }),
});
