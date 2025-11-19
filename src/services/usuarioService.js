import Usuario from "../models/Usuario.js";
import bcrypt from "bcrypt";
import Rol from "../models/Rol.js";

export const listarUsuarios = async () => {
  return await Usuario.find().populate({
    path: "rol",
    populate: { path: "permisos", select: "nombre" },
  });
};


export const crearUsuario = async (nombre, email, rolId, password) => {
  if (!nombre || !email || !password)
    throw new Error("Faltan campos obligatorios");

  const existe = await Usuario.findOne({ email });
  if (existe) throw new Error("El usuario ya existe");

  const hashedPassword = await bcrypt.hash(password, 10);

  const nuevoUsuario = new Usuario({
    nombre,
    email,
    password: hashedPassword,
    rol: rolId || null
  });

  await nuevoUsuario.save();
  return nuevoUsuario;
};

export const eliminarUsuario = async (id) => {
  const usuario = await Usuario.findByIdAndDelete(id);
  if (!usuario) throw new Error("Usuario no encontrado");
  return usuario;
};

export const obtenerUsuarioPorId = async (id) => {
  return await Usuario.findById(id).populate({
    path: "rol",
    populate: { path: "permisos" },
  });
};