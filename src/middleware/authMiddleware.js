import Usuario from "../models/Usuario.js";

export const verificarPermiso = (permisoRequerido) => {
  return async (req, res, next) => {
    try {
      const usuarioAdminSimulado = {
        id: '68ebe92cb6904af98b5584fb',
        roleId: '68ebd761bf6f487a4d3d1a9e'
      };
      const usuarioModeradorSimulado = {
        id: '68ebefd3f0c24bfd6fc0a7a3',
        roleId: '68ebd88bbf6f487a4d3d1aa4'
      };
      const usuarioComunSimulado = {
        id: '68ebf1077a61a36910999d85',
        roleId: '68ebd76cbf6f487a4d3d1aa1'
      };

      // const usuarioId = req.header("usuario-id");
      // if (!usuarioId) return res.status(401).json({ error: "Falta usuario" });

      const usuario = await Usuario.findById(usuarioAdminSimulado.id).populate({
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