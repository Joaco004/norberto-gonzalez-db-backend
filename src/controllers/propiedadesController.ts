import { Request, Response } from 'express';
import Propiedad, { IPropiedad } from '../models/Propiedades';
import Historial from '../models/Historial';
import { RequestConUsuario } from '../middleware/authMiddleware';

export const getPropiedades = async (req: Request, res: Response) => {
  try {
    const {
      tipo,
      operacion,
      zona,
      precioMin,
      precioMax,
      ambientes,
      cochera,
      estado,
      destacada,
      publicada,
      orderBy,
    } = req.query

    const filtros: any = {}

    if (tipo) filtros.tipo = tipo
    if (operacion) filtros.operacion = operacion
    if (zona) filtros.zona = zona
    if (ambientes) filtros.ambientes = Number(ambientes)
    if (cochera) filtros.cochera = cochera === 'true'
    if (estado) filtros.estado = estado
    if (destacada) filtros.destacada = destacada === 'true'
    if (publicada !== undefined) filtros.publicada = publicada === 'true'
    if (precioMin || precioMax) {
      filtros.precio = {}
      if (precioMin) filtros.precio.$gte = Number(precioMin)
      if (precioMax) filtros.precio.$lte = Number(precioMax)
    }

    const orden: Record<string, 1 | -1> = orderBy === 'precio_asc'
      ? { precio: 1 }
      : orderBy === 'precio_desc'
        ? { precio: -1 }
        : { createdAt: -1 }

    const propiedades = await Propiedad.find(filtros)
      .sort(orden)
      .populate('zona', 'nombre partido')
      .populate('vendedor', 'nombre email')

    res.json(propiedades)
  } catch (error) {
    res.status(500).json({ mensaje: 'Error en el servidor' })
  }
}

export const getPropiedadById = async (req: Request, res: Response) => {
  try {
    const propiedad = await Propiedad.findById(req.params.id)
      .populate('zona', 'nombre partido')
      .populate('vendedor', 'nombre email') as IPropiedad | null

    if (!propiedad) {
      res.status(404).json({ mensaje: 'Propiedad no encontrada' })
      return
    }

    res.json(propiedad)
  } catch (error) {
    res.status(500).json({ mensaje: 'Error en el servidor' })
  }
}

export const crearPropiedad = async (req: RequestConUsuario, res: Response) => {
  try {
    const propiedad = await Propiedad.create({
      ...req.body,
      vendedor: req.usuarioId,
    })

    await Historial.create({
      vendedor: req.usuarioId,
      accion: 'nueva_propiedad',
      propiedad: propiedad._id,
      detalle: `Agregó nueva propiedad: ${propiedad.titulo}`,
    })

    res.status(201).json(propiedad)
  } catch (error) {
    res.status(500).json({ mensaje: 'Error en el servidor' })
  }
}

export const editarPropiedad = async (req: RequestConUsuario, res: Response) => {
  try {
    const propiedad = await Propiedad.findById(req.params.id) as IPropiedad | null

    if (!propiedad) {
      res.status(404).json({ mensaje: 'Propiedad no encontrada' })
      return
    }

    const cambios = Object.keys(req.body)
      .map(key => `${key}: ${(propiedad as any)[key]} → ${req.body[key]}`)
      .join(', ')

    const propiedadActualizada = await Propiedad.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )

    await Historial.create({
      vendedor: req.usuarioId,
      accion: 'edicion',
      propiedad: propiedad._id,
      detalle: `Editó propiedad ${propiedad.titulo}: ${cambios}`,
    })

    res.json(propiedadActualizada)
  } catch (error) {
    res.status(500).json({ mensaje: 'Error en el servidor' })
  }
}

export const eliminarPropiedad = async (req: RequestConUsuario, res: Response) => {
  try {
    const propiedad = await Propiedad.findById(req.params.id) as IPropiedad | null

    if (!propiedad) {
      res.status(404).json({ mensaje: 'Propiedad no encontrada' })
      return
    }

    await propiedad.deleteOne()

    await Historial.create({
      vendedor: req.usuarioId,
      accion: 'eliminacion',
      propiedad: propiedad._id,
      detalle: `Eliminó propiedad: ${propiedad.titulo}`,
    })

    res.json({ mensaje: 'Propiedad eliminada correctamente' })
  } catch (error) {
    res.status(500).json({ mensaje: 'Error en el servidor' })
  }
}