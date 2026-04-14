import { Router } from 'express'
import { getZonas, crearZona, eliminarZona } from '../controllers/zonasController'
import authMiddleware from '../middleware/authMiddleware'
import esAdminMiddleware from '../middleware/esAdminMiddleware'

const router = Router()

router.get('/', getZonas)

router.use(authMiddleware)
router.use(esAdminMiddleware)

router.post('/', crearZona)
router.delete('/:id', eliminarZona)

export default router