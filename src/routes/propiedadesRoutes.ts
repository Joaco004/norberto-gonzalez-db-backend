import { Router } from "express";
import { getPropiedades, getPropiedadById, crearPropiedad, editarPropiedad, eliminarPropiedad } from '../controllers/propiedadesController';
import authMiddleware from "../middleware/authMiddleware";

const router = Router()

router.get('/', getPropiedades)
router.get('/:id', getPropiedadById)

router.use(authMiddleware)

router.post('/', crearPropiedad)
router.put('/:id', editarPropiedad)
router.delete('/:id', eliminarPropiedad)

export default router;