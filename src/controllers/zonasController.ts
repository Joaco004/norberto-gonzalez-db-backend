import { Request, Response } from 'express'
import Zona from '../models/Zona'

export const getZonas = async (req: Request, res: Response) => {
  try {
    const zonas = await Zona.find().sort({ nombre: 1 })
    res.json(zonas)
  } catch (error) {
    res.status(500).json({ mensaje: 'Error en el servidor' })
  }
}

export const crearZona = async (req: Request, res: Response) => {
  try {
    const { nombre, partido, provincia } = req.body

    const existente = await Zona.findOne({ nombre })

    if (existente) {
      res.status(400).json({ mensaje: 'Ya existe esa zona' })
      return
    }

    const zona = await Zona.create({ nombre, partido, provincia })
    res.status(201).json(zona)
  } catch (error) {
    res.status(500).json({ mensaje: 'Error en el servidor' })
  }
}

export const eliminarZona = async (req: Request, res: Response) => {
  try {
    const zona = await Zona.findByIdAndDelete(req.params.id)

    if (!zona) {
      res.status(404).json({ mensaje: 'Zona no encontrada' })
      return
    }

    res.json({ mensaje: 'Zona eliminada correctamente' })
  } catch (error) {
    res.status(500).json({ mensaje: 'Error en el servidor' })
  }
}