import express from "express";
import { listarPermisos, crearPermiso, editarPermiso, eliminarPermiso } from "../controllers/permisoController.js";
import { verificarPermiso } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", verificarPermiso("ver_permisos"), listarPermisos);
router.post("/", verificarPermiso("crear_permisos"), crearPermiso);
router.put("/:id", verificarPermiso("editar_permisos"), editarPermiso);
router.delete("/:id", verificarPermiso("eliminar_permisos"), eliminarPermiso);

export default router;