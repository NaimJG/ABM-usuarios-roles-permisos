import mongoose from "mongoose";

const rolSchema = new mongoose.Schema({
  nombre: { type: String, unique: true, required: true },
  permisos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Permiso" }],
});

export default mongoose.model("Rol", rolSchema);