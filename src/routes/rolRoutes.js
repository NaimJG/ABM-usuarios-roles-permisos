import express from "express";
import {
  listarRoles,
  crearRol,
  editarRol,
  eliminarRol,
  asignarPermisos,
  obtenerRolConPermisos,
} from "../controllers/rolController.js";

const router = express.Router();

router.get("/", listarRoles);
router.post("/", crearRol);
router.put("/:id", editarRol);
router.delete("/:id", eliminarRol);

// Asignar permisos a un rol
router.put("/:id/permisos", asignarPermisos);

// Obtener un rol con sus permisos
router.get("/:id", obtenerRolConPermisos);

export default router;