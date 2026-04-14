import { Router } from 'express';
import { getHistorial, getHistorialByPropiedad } from '../controllers/historialController';
import authMiddleware from '../middleware/authMiddleware';
import esAdminMiddleware from '../middleware/esAdminMiddleware';

const router = Router()

router.use(authMiddleware)
router.use(esAdminMiddleware)

router.get('/', getHistorial)
router.get('/propiedad/:id', getHistorialByPropiedad)

export default router;