import mongoose from "mongoose";

const carritoSchema = new mongoose.Schema({
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario", required: true },
  items: [
    {
      producto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Producto",
        required: true
      },
      cantidad: {
        type: Number,
        required: true,
        min: 1
      }
    }
  ]
});

export default mongoose.model("Carrito", carritoSchema);