import mongoose from "mongoose";

const detalleCompraSchema = new mongoose.Schema({
  compra: { type: mongoose.Schema.Types.ObjectId, ref: "Compra", required: true },
  producto: { type: mongoose.Schema.Types.ObjectId, ref: "Producto", required: true },
  cantidad: { type: Number, required: true },
  precio_unitario: { type: Number, required: true },
  subtotal: { type: Number, required: true }
});

export default mongoose.model("DetalleCompra", detalleCompraSchema);