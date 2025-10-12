import express from "express";
import { listarUsuarios, crearVista, crear, detalle } from "../controllers/usuarioController.js";
import { verificarPermiso } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", verificarPermiso("ver_usuarios"), listarUsuarios);
router.get("/nuevo", verificarPermiso("crear_usuarios"), crearVista);
router.post("/nuevo", verificarPermiso("crear_usuarios"), crear);
router.get("/:id", verificarPermiso("ver_usuarios"), detalle);

export default router;