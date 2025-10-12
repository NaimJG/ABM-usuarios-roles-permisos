import Usuario from "../models/Usuario.js";

export const verificarPermiso = (permisoRequerido) => {
  return async (req, res, next) => {
    try {
      const usuarioId = req.header("usuario-id");
      if (!usuarioId) return res.status(401).json({ error: "Falta usuario" });

      const usuario = await Usuario.findById(usuarioId).populate({
        path: "rol",
        populate: { path: "permisos", select: "nombre" },
      });

      if (!usuario) return res.status(404).json({ error: "Usuario no encontrado" });

      const permisosUsuario = usuario.rol?.permisos?.map((p) => p.nombre) || [];

      if (!permisosUsuario.includes(permisoRequerido)) {
        return res.status(403).json({ error: "Acceso denegado" });
      }

      next();
    } catch (err) {
      res.status(500).json({ error: "Error verificando permisos" });
    }
  };
};