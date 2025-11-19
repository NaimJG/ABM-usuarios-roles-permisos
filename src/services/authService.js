import Usuario from "../models/Usuario.js";
import Rol from "../models/Rol.js";
import bcrypt from "bcrypt";

export const registerUser = async ({ nombre, email, password }) => {

  const existe = await Usuario.findOne({ email });
  if (existe) {
    throw new Error("El email ya está registrado");
  }

  const rolUser = await Rol.findOne({ nombre: "user" });
  if (!rolUser) {
    throw new Error("El rol 'user' no existe. Debes crearlo antes.");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const nuevoUsuario = new Usuario({
    nombre,
    email,
    password: hashedPassword,
    rol: rolUser._id,
  });

  await nuevoUsuario.save();
  // Poblar rol antes de devolver para que el controller pueda leer usuario.rol.nombre
  await nuevoUsuario.populate('rol');
  return nuevoUsuario;
};


export const loginUser = async (email, password) => {
  const usuario = await Usuario.findOne({ email }).populate("rol");

  if (!usuario) return null;

  const passwordValido = await bcrypt.compare(password, usuario.password);

  if (!passwordValido) return null;

  return usuario;
};