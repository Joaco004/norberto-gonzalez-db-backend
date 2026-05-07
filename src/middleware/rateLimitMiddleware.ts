import rateLimit from 'express-rate-limit'

export const limitadorGeneral = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { mensaje: 'Demasiadas solicitudes, intentá de nuevo en 15 minutos' },
  standardHeaders: true,
  legacyHeaders: false,
})

export const limitadorLogin = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { mensaje: 'Demasiados intentos de login, intentá de nuevo en 15 minutos' },
  standardHeaders: true,
  legacyHeaders: false,
})