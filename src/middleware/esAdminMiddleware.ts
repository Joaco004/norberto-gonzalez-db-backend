import { Response, NextFunction } from "express";
import { RequestConUsuario } from "./authMiddleware";

const esAdminMiddleware = (
    req: RequestConUsuario,
    res: Response,
    next: NextFunction
) => {
    if (!req.esAdmin) {
        res.status(403).json({ mensaje: 'Acceso denegado, se requiere ser admin'})
        return
    }

    next()
}

export default esAdminMiddleware;