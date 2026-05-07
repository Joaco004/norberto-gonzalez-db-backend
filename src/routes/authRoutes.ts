import { Router } from "express";
import { login, getMe} from '../controllers/authController';
import authMiddleware from "../middleware/authMiddleware";
import { limitadorLogin } from "../middleware/rateLimitMiddleware";

const router = Router()

router.post('/login', login)
router.get('/me', authMiddleware, getMe)
router.post('/login', limitadorLogin, login)

export default router;