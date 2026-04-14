import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export interface RequestConUsuario extends Request {
  usuarioId?: string
  esAdmin?: boolean
}

const authMiddleware = async (
  req: RequestConUsuario,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(' ')[1]

  if (!token) {
    res.status(401).json({ mensaje: 'No autorizado, token requerido' })
    return
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      id: string
      esAdmin: boolean
    }

    req.usuarioId = decoded.id
    req.esAdmin = decoded.esAdmin
    next()
  } catch (error) {
    res.status(401).json({ mensaje: 'Token inválido' })
  }
}

export default authMiddleware