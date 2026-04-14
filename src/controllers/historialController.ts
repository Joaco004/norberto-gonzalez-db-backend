import { Request, Response } from 'express';
import Historial from '../models/Historial';

export const getHistorial = async (req: Request, res: Response) => {
  try {
    const historial = await Historial.find()
      .sort({ createdAt: -1 })
      .populate('vendedor', 'nombre email')
      .populate('propiedad', 'titulo')

    res.json(historial)
  } catch (error) {
    res.status(500).json({ mensaje: 'Error en el servidor' })
  }
}

export const getHistorialByPropiedad = async (req: Request, res: Response) => {
  try {
    const historial = await Historial.find({ propiedad: req.params.id })
      .sort({ createdAt: -1 })
      .populate('vendedor', 'nombre email')

    res.json(historial)
  } catch (error) {
    res.status(500).json({ mensaje: 'Error en el servidor' })
  }
}