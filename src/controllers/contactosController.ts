import { Request, Response } from 'express';
import Contacto from '../models/Contacto';

export const getContactos = async (req: Request, res: Response) => {
  try {
    const contactos = await Contacto.find()
      .sort({ createdAt: -1 })
      .populate('propiedad', 'titulo calle')

    res.json(contactos)
  } catch (error) {
    res.status(500).json({ mensaje: 'Error en el servidor' })
  }
}

export const crearContacto = async (req: Request, res: Response) => {
  try {
    const { propiedad, nombre, email, telefono, mensaje } = req.body

    const contacto = await Contacto.create({
      propiedad,
      nombre,
      email,
      telefono,
      mensaje,
    })

    res.status(201).json(contacto)
  } catch (error) {
    res.status(500).json({ mensaje: 'Error en el servidor' })
  }
}

export const marcarLeido = async (req: Request, res: Response) => {
  try {
    const contacto = await Contacto.findByIdAndUpdate(
      req.params.id,
      { leido: true },
      { new: true }
    )

    if (!contacto) {
      res.status(404).json({ mensaje: 'Contacto no encontrado' })
      return
    }

    res.json(contacto)
  } catch (error) {
    res.status(500).json({ mensaje: 'Error en el servidor' })
  }
}

export const cambiarEstado = async (req: Request, res: Response) => {
  try {
    const { estado } = req.body

    const contacto = await Contacto.findByIdAndUpdate(
      req.params.id,
      { estado },
      { new: true }
    )

    if (!contacto) {
      res.status(404).json({ mensaje: 'Contacto no encontrado' })
      return
    }

    res.json(contacto)
  } catch (error) {
    res.status(500).json({ mensaje: 'Error en el servidor' })
  }
}

export const eliminarContacto = async (req: Request, res: Response) => {
  try {
    const contacto = await Contacto.findByIdAndDelete(req.params.id)

    if (!contacto) {
      res.status(404).json({ mensaje: 'Contacto no encontrado' })
      return
    }

    res.json({ mensaje: 'Contacto eliminado correctamente' })
  } catch (error) {
    res.status(500).json({ mensaje: 'Error en el servidor' })
  }
}