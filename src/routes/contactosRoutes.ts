import { Router } from "express";
import { getContactos, crearContacto, marcarLeido, cambiarEstado, eliminarContacto } from "../controllers/contactosController";
import authMiddleware from "../middleware/authMiddleware";

const router = Router()

router.post('/', crearContacto)

router.use(authMiddleware)

router.get('/', getContactos)
router.patch('/:id/leido', marcarLeido)
router.patch('/:id/estado', cambiarEstado)
router.delete('/:id', eliminarContacto)

export default router;