import { Router } from "express";

import {
  crear,
  listar,
  obtener,
  listarPorProveedor,
  actualizar,
  eliminar,
} from "../controllers/equipamento.controller";

const router = Router();
 
router.post("/", crear);

router.get("/", listar);

router.get("/proveedor/:id_proveedor", listarPorProveedor);

router.get("/:id", obtener);

router.put("/:id", actualizar);

router.delete("/:id", eliminar);

export default router;