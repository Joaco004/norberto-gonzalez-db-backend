import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import Usuario, { IUsuario } from '../models/Usuarios '


const generarToken = (id: string, esAdmin: boolean) => {
  return jwt.sign(
    { id, esAdmin },
    process.env.JWT_SECRET as string,
    { expiresIn: '30d' }
  )
}

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    const usuario = await Usuario.findOne({ email, activo: true }) as IUsuario | null

    if (!usuario) {
      res.status(401).json({ mensaje: 'Credenciales inválidas' })
      return
    }

    const passwordOk = await usuario.compararPassword(password)

    if (!passwordOk) {
      res.status(401).json({ mensaje: 'Credenciales inválidas' })
      return
    }

    res.json({
      token: generarToken(usuario.id, usuario.esAdmin),
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
        esAdmin: usuario.esAdmin,
      },
    })
  } catch (error) {
    res.status(500).json({ mensaje: 'Error en el servidor' })
  }
}

export const getMe = async (req: Request, res: Response) => {
  try {
    const usuario = await Usuario.findById(req.body.usuarioId).select('-password')

    if (!usuario) {
      res.status(404).json({ mensaje: 'Usuario no encontrado' })
      return
    }

    res.json(usuario)
  } catch (error) {
    res.status(500).json({ mensaje: 'Error en el servidor' })
  }
}