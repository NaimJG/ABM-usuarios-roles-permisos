import express from "express";
import { listarProductos, crearProducto, eliminarProducto, editarProducto, detalleProducto } from "../controllers/productoController.js";
import { verificarPermiso } from "../middleware/authMiddleware.js";

const router = express.Router();


router.get("/", verificarPermiso("ver_productos"), listarProductos);
router.post("/new", verificarPermiso("crear_productos"), crearProducto);
router.delete("/:id/delete", verificarPermiso("eliminar_productos"), eliminarProducto);
router.put("/:id/edit", verificarPermiso("editar_productos"), editarProducto);

// Detalle de un producto
router.get("/:id", verificarPermiso("ver_productos"), detalleProducto);

export default router;