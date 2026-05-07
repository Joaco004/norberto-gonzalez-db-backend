import { Request, Response, NextFunction } from 'express'
import { ZodSchema } from 'zod'

const validar = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const resultado = schema.safeParse(req.body)

    if (!resultado.success) {
      res.status(400).json({
        mensaje: 'Datos inválidos',
        errores: resultado.error.flatten().fieldErrors,
      })
      return
    }

    req.body = resultado.data
    next()
  }
}

export default validar