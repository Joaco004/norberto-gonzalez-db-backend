import { Router } from "express";
import { getUsuarios, crearUsuario, toggleUsuario, eliminarUsuario } from "../controllers/usuariosController";
import authMiddleware from "../middleware/authMiddleware";
import esAdminMiddleware from "../middleware/esAdminMiddleware";

const router = Router()

router.use(authMiddleware)
router.use(esAdminMiddleware)

router.get('/', getUsuarios)
router.post('/', crearUsuario)
router.patch('/:id/toggle', toggleUsuario)
router.delete('/:id', eliminarUsuario)

export default router;