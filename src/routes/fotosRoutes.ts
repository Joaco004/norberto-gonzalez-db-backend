import { Router } from 'express';
import { subirFotos, eliminarFoto } from '../controllers/fotosController';
import authMiddleware from '../middleware/authMiddleware';
import upload from '../middleware/uploadMiddleware';

const router = Router()

router.use(authMiddleware)

router.post('/:id/fotos', upload.array('fotos', 25), subirFotos)
router.delete('/:id/fotos/:fotoId', eliminarFoto)

export default router;