import express from "express";
import { listarPermisos, crearPermiso, editarPermiso, eliminarPermiso } from "../controllers/permisoController.js";

const router = express.Router();

router.get("/", listarPermisos);
router.post("/", crearPermiso);
router.put("/:id", editarPermiso);
router.delete("/:id", eliminarPermiso);

export default router;