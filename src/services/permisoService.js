import Permiso from "../models/Permiso.js";

// Listar permisos
export const listarPermisos = async () => {
  return await Permiso.find().sort({ nombre: 1 });
};

// Crear permiso
export const crearPermiso = async (nombre) => {
  if (!nombre) throw new Error("El nombre del permiso es obligatorio");

  console.log("Nombre del permiso a crear:", nombre);

  const existente = await Permiso.findOne({ nombre });
  if (existente) throw new Error("Ya existe un permiso con ese nombre");

  const nuevoPermiso = new Permiso({ nombre });
  await nuevoPermiso.save();
  return nuevoPermiso;
};

// Editar permiso
export const editarPermiso = async (id, data) => {
  if (!id) throw new Error('ID de permiso obligatorio');

  if (data && data.nombre) {
    const existente = await Permiso.findOne({ nombre: data.nombre });
    if (existente && existente._id.toString() !== id.toString()) {
      throw new Error('El nombre del permiso ya existe');
    }
  }

  const permiso = await Permiso.findByIdAndUpdate(id, data, { new: true });
  return permiso;
};

// Eliminar permiso
export const eliminarPermiso = async (id) => {
  if (!id) throw new Error('ID de permiso obligatorio');
  console.log("Permiso a eliminar ID:", id);
  const permiso = await Permiso.findByIdAndDelete(id);
  return permiso;
};