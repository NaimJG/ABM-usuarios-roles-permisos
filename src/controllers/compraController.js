import * as compraService from "../services/compraService.js";

export const verHistorial = async (req, res) => {
  try {
    const historial = await compraService.obtenerHistorial(req.user._id);
    res.render("compras/historial", { historial });
  } catch (err) {
    res.status(500).send(err.message);
  }
};