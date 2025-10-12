import Usuario from "../models/Usuario.js";
import Rol from "../models/Rol.js";

export const listarUsuarios = async () => {
  return await Usuario.find().populate({
    path: "rol",
    populate: { path: "permisos", select: "nombre" },
  });
};

export const crearUsuario = async (nombre, email, rolId) => {
  console.log("Datos recibidos en servicio:", nombre, email, rolId);
  if (!nombre || !email) throw new Error("Faltan campos obligatorios");

  const existe = await Usuario.findOne({ email });
  if (existe) throw new Error("El usuario ya existe");

  const nuevoUsuario = new Usuario({ nombre, email, rol: rolId || null });
  await nuevoUsuario.save();
  return nuevoUsuario;
};

export const editarUsuario = async (id, data) => {
  const usuario = await Usuario.findByIdAndUpdate(id, data, { new: true });
  if (!usuario) throw new Error("Usuario no encontrado");
  return usuario;
};

export const eliminarUsuario = async (id) => {
  const usuario = await Usuario.findByIdAndDelete(id);
  if (!usuario) throw new Error("Usuario no encontrado");
  return usuario;
};

export const obtenerUsuarioConPermisos = async (id) => {
  const usuario = await Usuario.findById(id).populate({
    path: "rol",
    populate: { path: "permisos", select: "nombre" },
  });

  if (!usuario) throw new Error("Usuario no encontrado");

  return {
    nombre: usuario.nombre,
    email: usuario.email,
    rol: usuario.rol?.nombre,
    permisos: usuario.rol?.permisos?.map((p) => p.nombre) || [],
  };
};

export const obtenerUsuarioPorId = async (id) => {
  return await Usuario.findById(id).populate({
    path: "rol",
    populate: { path: "permisos" },
  });
};