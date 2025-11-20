import mongoose from "mongoose";

const compraSchema = new mongoose.Schema({
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario", required: true },
  fecha: { type: Date, default: Date.now },
  total: { type: Number, required: true }
});

export default mongoose.model("Compra", compraSchema);