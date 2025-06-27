import Joi from "joi";

export const CreateProductSchema = Joi.object({
  name: Joi.string().trim().required().min(3).max(100).messages({
    "string.empty": "Nome do produto é obrigatório",
    "string.min": "Nome deve ter no mínimo 3 caracteres",
    "string.max": "Nome deve ter no máximo 100 caracteres",
  }),

  description: Joi.string().trim().max(500).allow("").messages({
    "string.max": "Descrição deve ter no máximo 500 caracteres",
  }),

  price: Joi.number().positive().precision(2).required().messages({
    "number.base": "Preço deve ser um número",
    "number.positive": "Preço deve ser um valor positivo",
    "any.required": "Preço é obrigatório",
  }),

  artisanId: Joi.string()
    .required()
    .pattern(/^[a-fA-F0-9]{24}$/) // Para MongoDB ObjectId. Altere se necessário.
    .messages({
      "string.empty": "ID do artesão é obrigatório",
      "string.pattern.base": "ID do artesão inválido",
    }),

  category: Joi.string()
    .valid("artesanato", "moda", "decoração", "outros")
    .optional()
    .messages({
      "any.only": "Categoria inválida",
    }),
});
