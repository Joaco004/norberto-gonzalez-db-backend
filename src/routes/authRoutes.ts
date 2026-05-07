import { Router } from "express";
import { login, getMe, cambiarPassword } from '../controllers/authController';
import authMiddleware from "../middleware/authMiddleware";
import { limitadorLogin } from "../middleware/rateLimitMiddleware";
import validar from '../middleware/validarMiddleware'
import { loginSchema } from '../schemas/authSchema'

const router = Router()

router.post('/login', limitadorLogin, validar(loginSchema), login)
router.get('/me', authMiddleware, getMe)
router.put('/cambiar-password', authMiddleware, cambiarPassword)

export default router