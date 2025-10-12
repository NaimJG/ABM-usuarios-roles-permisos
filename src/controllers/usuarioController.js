import * as usuarioService from "../services/usuarioService.js";

export const listarUsuarios = async (req, res) => {
  try {
    const usuarios = await usuarioService.listarUsuarios();
    res.json(usuarios);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const crearUsuario = async (req, res) => {
  try {
    const nuevo = await usuarioService.crearUsuario(req.body);
    res.status(201).json(nuevo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const editarUsuario = async (req, res) => {
  try {
    const usuario = await usuarioService.editarUsuario(req.params.id, req.body);
    res.json(usuario);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

export const eliminarUsuario = async (req, res) => {
  try {
    await usuarioService.eliminarUsuario(req.params.id);
    res.json({ mensaje: "Usuario eliminado correctamente" });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

export const obtenerUsuarioConPermisos = async (req, res) => {
  try {
    const usuario = await usuarioService.obtenerUsuarioConPermisos(req.params.id);
    res.json(usuario);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

export const mostrarUsuarios = async (req, res) => {
  try {
    const usuarios = await usuarioService.listarUsuarios();
    res.render("usuarios/lista", { usuarios });
  } catch (err) {
    res.status(500).send("Error al obtener los usuarios: " + err.message);
  }
};