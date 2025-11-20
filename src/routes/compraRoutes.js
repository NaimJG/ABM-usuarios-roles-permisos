import express from "express";
import { verHistorial } from "../controllers/compraController.js";
import { verificarPermiso } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/historial", verificarPermiso("crear_compra"), verHistorial);

export default router;