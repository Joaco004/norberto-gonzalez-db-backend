import { Router } from "express";
import { getPropiedades, getPropiedadById, crearPropiedad, editarPropiedad, eliminarPropiedad } from '../controllers/propiedadesController';
import authMiddleware from "../middleware/authMiddleware";
import validar from '../middleware/validarMiddleware'
import { propiedadSchema } from '../schemas/propiedadSchema'

const router = Router()

router.get('/', getPropiedades)
router.get('/:id', getPropiedadById)

router.use(authMiddleware)

router.post('/', crearPropiedad)
router.put('/:id', editarPropiedad)
router.delete('/:id', eliminarPropiedad)

export default router;