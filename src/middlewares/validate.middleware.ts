import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";

export function validateBody(schema: ObjectSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { convert: false });

    if (error) {
      res.status(400).json({
        message: error.message,
      });
    } else {
      next();
    }
  };
}
