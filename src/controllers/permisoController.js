import * as permisoService from "../services/permisoService.js";

// Listar
export const listarPermisos = async (req, res) => {
  try {
    const permisos = await permisoService.listarPermisos();
    res.render("permisos/lista", { permisos, error: null });
  } catch (err) {
    res.render("permisos/lista", { permisos: [], error: err.message });
  }
};

// Crear
export const crearPermiso = async (req, res) => {
  try {
    const { nombre } = req.body;
    await permisoService.crearPermiso(nombre);
    res.redirect("/permisos");
  } catch (err) {
    const permisos = await permisoService.listarPermisos();
    res.render("permisos/lista", { permisos, error: err.message });
  }
};

// Editar
export const editarPermiso = async (req, res) => {
  try {
    const permiso = await permisoService.editarPermiso(req.params.id, req.body);
    if (!permiso) return res.status(404).json({ error: "Permiso no encontrado" });
    res.status(200).json(permiso);
  } catch (err) {
      console.error('Error en editarPermiso:', err);
      if (err.message && err.message.includes('existe')) {
        return res.status(400).json({ error: err.message });
      }
      res.status(500).json({ error: err.message || "Error al editar permiso" });
  }
};

// Eliminar
export const eliminarPermiso = async (req, res) => {
  try {
    const permiso = await permisoService.eliminarPermiso(req.params.id);
    if (!permiso) return res.status(404).json({ error: "Permiso no encontrado" });
    res.status(200).json({ mensaje: "Permiso eliminado" });
  } catch (err) {
      console.error('Error en eliminarPermiso:', err);
      res.status(500).json({ error: err.message || "Error al eliminar permiso" });
  }
};