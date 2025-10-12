import Rol from "../models/Rol.js";
import Permiso from "../models/Permiso.js";

// Listar roles
export const listarRoles = async (req, res) => {
  try {
    const roles = await Rol.find().populate("permisos", "nombre");
    res.json(roles);
  } catch (err) {
    res.status(500).json({ error: "Error al listar roles" });
  }
};

// Crear nuevo rol
export const crearRol = async (req, res) => {
  try {
    const { nombre } = req.body;
    if (!nombre) return res.status(400).json({ error: "El nombre es obligatorio" });

    const existe = await Rol.findOne({ nombre });
    if (existe) return res.status(400).json({ error: "El rol ya existe" });

    const nuevoRol = await Rol.create({ nombre });
    res.status(201).json(nuevoRol);
  } catch (err) {
    res.status(500).json({ error: "Error al crear rol" });
  }
};

// Editar nombre del rol
export const editarRol = async (req, res) => {
  try {
    const rol = await Rol.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!rol) return res.status(404).json({ error: "Rol no encontrado" });
    res.json(rol);
  } catch (err) {
    res.status(500).json({ error: "Error al editar rol" });
  }
};

// Eliminar rol
export const eliminarRol = async (req, res) => {
  try {
    const rol = await Rol.findByIdAndDelete(req.params.id);
    if (!rol) return res.status(404).json({ error: "Rol no encontrado" });
    res.json({ mensaje: "Rol eliminado" });
  } catch (err) {
    res.status(500).json({ error: "Error al eliminar rol" });
  }
};

// Asignar permisos a un rol
export const asignarPermisos = async (req, res) => {
  try {
    const { permisos } = req.body; // array de IDs de permisos
    const rol = await Rol.findById(req.params.id);

    if (!rol) return res.status(404).json({ error: "Rol no encontrado" });

    // Verificar que todos los permisos existan
    const permisosValidos = await Permiso.find({ _id: { $in: permisos } });
    if (permisosValidos.length !== permisos.length) {
      return res.status(400).json({ error: "Uno o más permisos no existen" });
    }

    // Guardar relación
    rol.permisos = permisos;
    await rol.save();

    res.json({ mensaje: "Permisos asignados correctamente", rol });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al asignar permisos" });
  }
};

// Obtener los permisos de un rol
export const obtenerRolConPermisos = async (req, res) => {
  try {
    const rol = await Rol.findById(req.params.id).populate("permisos", "nombre");
    if (!rol) return res.status(404).json({ error: "Rol no encontrado" });
    res.json(rol);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener rol" });
  }
};
