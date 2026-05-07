import { Response } from 'express';
import { PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid'
import s3 from '../config/s3';
import Propiedad from '../models/Propiedades';
import { RequestConUsuario } from '../middleware/authMiddleware';

export const subirFotos = async (req: RequestConUsuario, res: Response) => {
    try {
        const { id } = req.params
        const archivos = req.files as Express.Multer.File[]

        if (!archivos || archivos.length === 0) {
            res.status(400).json({ mensaje: 'No se enviaron fotos' })
            return
        }
        const propiedad = await Propiedad.findById(id)

        if (!propiedad) {
            res.status(404).json({ mensaje: 'Propiedad no encontrada' })
            return
        }

        const fotosSubidas = await Promise.all(
            archivos.map(async (archivos, index) => {
                const key = `propiedades/${id}/${uuidv4()}-${archivos.originalname}`

                await s3.send(new PutObjectCommand({
                    Bucket: process.env.AWS_BUCKET_NAME as string,
                    Key: key,
                    Body: archivos.buffer,
                    ContentType: archivos.mimetype,
                }))

                const url = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`

                return {
                    url,
                    urlThumbnail: url,
                    orden: propiedad.fotos.length + index,
                    principal: propiedad.fotos.length === 0 && index === 0,
                }
            })
        )
        propiedad.fotos.push(...fotosSubidas)
        await propiedad.save()

        res.json(propiedad.fotos)
    } catch (error) {
        console.error(error)
        res.status(500).json({ mensaje: 'Error al subir las fotos' })
    }
}

export const eliminarFoto = async (req: RequestConUsuario, res: Response) => {
    try {
        const { id, fotoId } = req.params

        const propiedad = await Propiedad.findById(id)

        if (!propiedad) {
            res.status(404).json({ mensaje: 'Propiedad no encontrada' })
            return
        }

        const foto = propiedad.fotos.find(f => f._id?.toString() === fotoId)

        if (!foto) {
            res.status(404).json({ mensaje: 'Foto no encontrada' })
            return
        }

        const key = foto.url.split('.amazonaws.com/')[1]

        await s3.send(new DeleteObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME as string,
            Key: key,
        }))

        propiedad.fotos = propiedad.fotos.filter(f => f._id?.toString() !== fotoId)
        await propiedad.save()

        res.json({ mensaje: 'Foto eliminada correctamente' })
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar la foto' })
    }
} 