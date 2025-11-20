import mongoose from "mongoose";

const productoSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    precio: { type: Number, min: 0, required: true },
    descripcion: { type: String },
    stock: { type: Number, min: 0, default: 0 },
    imagen: { type: String },
});

export default mongoose.model("Producto", productoSchema);