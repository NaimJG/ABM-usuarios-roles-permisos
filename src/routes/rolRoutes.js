import express from "express";
import { listarRoles, crearRol, eliminarRol, asignarPermisos, obtenerRolConPermisos, editarVista, actualizarPermisos} from "../controllers/rolController.js";
import { verificarPermiso } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", verificarPermiso("ver_roles"), listarRoles);
router.post("/", verificarPermiso("crear_roles"), crearRol);
router.delete("/:id", verificarPermiso("eliminar_roles"), eliminarRol);

router.get("/:id/edit", verificarPermiso("editar_roles"), editarVista);
router.post("/:id/edit", verificarPermiso("editar_roles"), actualizarPermisos);

// Asignar permisos a un rol
router.put("/:id/permisos", verificarPermiso("editar_roles"), asignarPermisos);

// Obtener un rol con sus permisos
router.get("/:id", verificarPermiso("ver_roles"), obtenerRolConPermisos);

export default router;