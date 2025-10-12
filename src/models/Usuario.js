import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  rol: { type: mongoose.Schema.Types.ObjectId, ref: "Rol" },
});

export default mongoose.model("Usuario", usuarioSchema);