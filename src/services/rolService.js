import Rol from "../models/Rol.js";
import Permiso from "../models/Permiso.js";

export const listarRoles = async () => {
  return await Rol.find().populate("permisos").sort({ nombre: 1 });
};

export const obtenerRolPorId = async (id) => {
  const rol = await Rol.findById(id);
  if (!rol) throw new Error("Rol no encontrado");

  return await Rol.findById(id).populate("permisos");
};

export const crearRol = async (nombre) => {
  if (!nombre) throw new Error("El nombre del rol es obligatorio");
  const existe = await Rol.findOne({ nombre });
  if (existe) throw new Error("Ya existe un rol con ese nombre");

  const nuevoRol = new Rol({ nombre, permisos: [] });
  await nuevoRol.save();
  return nuevoRol;
};

export const actualizarPermisos = async (rolId, permisosSeleccionados) => {
  const rol = await Rol.findById(rolId);
  if (!rol) throw new Error("Rol no encontrado");

  // permisosSeleccionados puede venir como un solo valor o array
  const permisosIds = Array.isArray(permisosSeleccionados) ? permisosSeleccionados : permisosSeleccionados ? [permisosSeleccionados] : [];
  rol.permisos = permisosIds;
  await rol.save();

  return await Rol.findById(rolId).populate("permisos");
};