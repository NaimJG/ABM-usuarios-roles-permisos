import express from "express";
import {
  listarUsuarios,
  crearUsuario,
  editarUsuario,
  eliminarUsuario,
  obtenerUsuarioConPermisos,
  mostrarUsuarios,
} from "../controllers/usuarioController.js";

import { verificarPermiso } from "../middleware/verificarPermiso.js";

const router = express.Router();

router.get("/", mostrarUsuarios);
router.post("/", verificarPermiso("crear_usuario"), crearUsuario);
router.put("/:id", verificarPermiso("editar_usuario"), editarUsuario);
router.delete("/:id", verificarPermiso("eliminar_usuario"), eliminarUsuario);
router.get("/:id", verificarPermiso("ver_usuario"), obtenerUsuarioConPermisos);

export default router;