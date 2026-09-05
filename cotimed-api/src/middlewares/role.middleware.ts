import { Response, NextFunction } from "express";
import { AuthRequest } from "./auth.middleware";


export const allowRoles = (
    roles: ("admin" | "institucion" | "proveedor")[]
) => {


    return (
        req: AuthRequest,
        res: Response,
        next: NextFunction
    ) => {


        if (!req.user) {

            return res.status(401).json({
                message: "Usuario no autenticado"
            });

        }



        if (!roles.includes(req.user.rol)) {


            return res.status(403).json({
                message: "No tienes permisos para realizar esta acción"
            });

        }



        next();

    };

};