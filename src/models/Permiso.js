import mongoose from "mongoose";

const permisoSchema = new mongoose.Schema({
  nombre: { type: String, unique: true, required: true },
});

export default mongoose.model("Permiso", permisoSchema);