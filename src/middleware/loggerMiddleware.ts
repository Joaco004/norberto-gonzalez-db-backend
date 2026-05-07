import { Request, Response, NextFunction } from 'express'
import logger from '../config/logger'

const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  res.on('finish', () => {
    const log = {
      metodo: req.method,
      ruta: req.originalUrl,
      estado: res.statusCode,
      ip: req.ip,
    }

    if (res.statusCode >= 400) {
      logger.warn('Request con error', log)
    } else {
      logger.info('Request', log)
    }
  })

  next()
}

export const logearIntentoLogin = (ip: string, email: string, exito: boolean) => {
  if (!exito) {
    logger.warn('Intento de login fallido', { ip, email, fecha: new Date() })
  } else {
    logger.info('Login exitoso', { ip, email, fecha: new Date() })
  }
}

export default loggerMiddleware