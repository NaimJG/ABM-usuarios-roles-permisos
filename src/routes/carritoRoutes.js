import { Router } from "express";
import { verCarrito, agregarAlCarrito, actualizarCantidad, eliminarDelCarrito, confirmarCompra, cantidadItems, cantidadesPorProducto, restarUnoController } from "../controllers/carritoController.js"
import { verificarPermiso } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/", verificarPermiso("crear_compra"), verCarrito);
router.post("/agregar/:prodId", verificarPermiso("crear_compra"), agregarAlCarrito);
router.post("/actualizar/:itemId", verificarPermiso("crear_compra"), actualizarCantidad);
router.post("/eliminar/:itemId", verificarPermiso("crear_compra"), eliminarDelCarrito);
router.post("/confirmar", verificarPermiso("crear_compra"), confirmarCompra);
router.get("/cantidad", verificarPermiso("crear_compra"), cantidadItems);
router.get("/cantidades", verificarPermiso("crear_compra"), cantidadesPorProducto);
router.post("/eliminarUno/:prodId", verificarPermiso("crear_compra"), restarUnoController);

export default router;