import Compra from "../models/Compra.js";
import DetalleCompra from "../models/DetalleCompra.js";

export const obtenerHistorial = async (usuarioId) => {
    const compras = await Compra.find({ usuario: usuarioId }).sort({ fecha: -1 });

    const historial = [];

    for (const compra of compras) {
        const detalles = await DetalleCompra.find({ compra: compra._id })
        .populate("producto", "nombre precio");

        historial.push({
            compra,
            detalles
        });
    }

    return historial;
}
