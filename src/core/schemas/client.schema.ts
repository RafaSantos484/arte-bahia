import Joi from "joi";

export const CreateClientSchema = Joi.object({
  name: Joi.string()
    .trim()
    .required()
    .min(3)
    .max(50)
    .pattern(/^[a-zA-ZÀ-ÿ0-9 ]*$/)
    .messages({
      "string.empty": "Nome é obrigatório",
      "string.min": "Nome deve ter no mínimo 3 caracteres",
      "string.max": "Nome deve ter no máximo 50 caracteres",
      "string.pattern.base": "Nome deve conter apenas letras e números",
      "*": "Nome inválido",
    }),
  email: Joi.string().trim().email().required().messages({
    "string.empty": "Email é obrigatório",
    "string.email": "Email inválido",
  }),
  password: Joi.string()
    .required()
    .min(6)
    .max(30)
    .pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]+$/)
    .messages({
      "string.empty": "Senha é obrigatória",
      "string.min": "Senha deve ter no mínimo 6 caracteres",
      "string.max": "Senha deve ter no máximo 30 caracteres",
      "string.pattern.base":
        "Senha deve conter letras e números (caracteres especiais são permitidos)",
    }),
});
