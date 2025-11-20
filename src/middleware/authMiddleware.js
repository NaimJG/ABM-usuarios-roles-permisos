import Usuario from "../models/Usuario.js";

export const verificarPermiso = (permisoRequerido) => {
  return async (req, res, next) => {
    try {
      if (!req.session.user) {
        return res.status(401).json({ error: "Debes iniciar sesión" });
      }

      const usuarioId = req.session.user.id;

      const usuario = await Usuario.findById(usuarioId).populate({
        path: "rol",
        populate: { path: "permisos", select: "nombre" },
      });

      if (!usuario) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }
      req.user = usuario;

      const permisosUsuario = usuario.rol?.permisos?.map((p) => p.nombre) || [];

      if (!permisosUsuario.includes(permisoRequerido)) {
        return res.status(403).json({ error: "Acceso denegado" });
      }

      next();
    } catch (err) {
      console.error("Error verificando permisos:", err);
      res.status(500).json({ error: "Error verificando permisos" });
    }
  };
};