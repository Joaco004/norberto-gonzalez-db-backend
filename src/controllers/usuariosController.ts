import { Request, Response } from 'express'
import Usuario, { IUsuario } from '../models/Usuarios'
import { RequestConUsuario } from '../middleware/authMiddleware'

export const getUsuarios = async (req: Request, res: Response) => {
  try {
    const usuarios = await Usuario.find({ esAdmin: false }).select('-password')
    res.json(usuarios)
  } catch (error) {
    res.status(500).json({ mensaje: 'Error en el servidor' })
  }
}

export const crearUsuario = async (req: Request, res: Response) => {
  try {
    const { nombre, email, password } = req.body

    const existente = await Usuario.findOne({ email }) as IUsuario | null

    if (existente) {
      res.status(400).json({ mensaje: 'Ya existe un usuario con ese email' })
      return
    }

    const usuario = await Usuario.create({
      nombre,
      email,
      password,
      esAdmin: false,
      activo: true,
    })

    res.status(201).json({
      id: usuario.id,
      nombre: usuario.nombre,
      email: usuario.email,
      esAdmin: usuario.esAdmin,
      activo: usuario.activo,
    })
  } catch (error) {
    res.status(500).json({ mensaje: 'Error en el servidor' })
  }
}

export const toggleUsuario = async (req: Request, res: Response) => {
  try {
    const usuario = await Usuario.findById(req.params.id) as IUsuario | null

    if (!usuario) {
      res.status(404).json({ mensaje: 'Usuario no encontrado' })
      return
    }

    usuario.activo = !usuario.activo
    await usuario.save()

    res.json({
      mensaje: `Usuario ${usuario.activo ? 'activado' : 'desactivado'} correctamente`,
      activo: usuario.activo,
    })
  } catch (error) {
    res.status(500).json({ mensaje: 'Error en el servidor' })
  }
}

export const eliminarUsuario = async (req: Request, res: Response) => {
  try {
    const usuario = await Usuario.findById(req.params.id) as IUsuario | null

    if (!usuario) {
      res.status(404).json({ mensaje: 'Usuario no encontrado' })
      return
    }

    await usuario.deleteOne()
    res.json({ mensaje: 'Usuario eliminado correctamente' })
  } catch (error) {
    res.status(500).json({ mensaje: 'Error en el servidor' })
  }
}