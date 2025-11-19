import * as usuarioService from "../services/usuarioService.js";
import * as rolService from "../services/rolService.js";

export const listarUsuarios = async (req, res) => {
  const usuarios = await usuarioService.listarUsuarios();
  res.render("usuarios/lista", { usuarios });
};

export const crearVista = async (req, res) => {
  const roles = await rolService.listarRoles();
  res.render("usuarios/nuevo", { roles, error: null });
};

export const crear = async (req, res) => {
  const { nombre, email, rolId } = req.body;
  try {
    await usuarioService.crearUsuario(nombre, email, rolId);
    res.redirect("/usuarios");
  } catch (err) {
    const roles = await rolService.listarRoles();
    res.render("usuarios/nuevo", { roles, error: err.message });
  }
};

export const detalle = async (req, res) => {
  try {
    const usuario = await usuarioService.obtenerUsuarioPorId(req.params.id);
    if (!usuario) return res.status(404).send("Usuario no encontrado");

    res.render("usuarios/detalle", { usuario });
  } catch (err) {
    res.status(500).send("Error: " + err.message);
  }
};

export const eliminarUsuario = async (req, res) => {
  try {
    const userId = req.params.id;
    await usuarioService.eliminarUsuario(userId);
    const usuarios = await usuarioService.listarUsuarios();
    res.render("usuarios/lista", { usuarios });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error eliminando usuario");
  }
};