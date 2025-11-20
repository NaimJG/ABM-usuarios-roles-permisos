import express from "express";
import { listarProductos, crearProducto, eliminarProducto, mostrarFormularioEditar, detalleProducto, actualizarProducto } from "../controllers/productoController.js";
import { verificarPermiso } from "../middleware/authMiddleware.js";

const router = express.Router();


router.get("/", verificarPermiso("ver_productos"), listarProductos);
router.post("/new", verificarPermiso("crear_productos"), crearProducto);
router.delete("/:id/delete", verificarPermiso("eliminar_productos"), eliminarProducto);
router.get("/:id/edit", verificarPermiso("editar_productos"), mostrarFormularioEditar);
router.post("/:id/edit", verificarPermiso("editar_productos"), actualizarProducto);

// Detalle de un producto
router.get("/:id", verificarPermiso("ver_productos"), detalleProducto);

export default router;