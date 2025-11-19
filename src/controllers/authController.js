import { loginUser, registerUser } from "../services/authService.js";

export const procesarSignup = async (req, res) => {
  const { nombre, email, password } = req.body;

  try {
    const usuario = await registerUser({ nombre, email, password });

    req.session.user = {
      id: usuario._id,
      nombre: usuario.nombre,
      email: usuario.email,
      rol: usuario.rol ? usuario.rol.nombre : 'user'
    };

    req.session.save(err => {
      if (err) {
        console.error('Error guardando sesión al registrar:', err);
        return res.render("auth/signup", { error: "Error al crear la sesión" });
      }
    });
    
    return res.redirect("/");
  } catch (err) {
    console.log(err);
    return res.render("auth/signup", { error: "Error al crear el usuario" });
  }
};

export const procesarLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const usuario = await loginUser(email, password);

    if (!usuario) {
      return res.render("auth/login", { error: "Usuario o contraseña incorrectos" });
    }

    // Guardar sesión
    req.session.user = {
      id: usuario._id,
      nombre: usuario.nombre,
      email: usuario.email,
      rol: usuario.rol ? usuario.rol.nombre : 'user'
    };

    return req.session.save(err => {
      if (err) {
        console.error('Error guardando sesión al loguear:', err);
        return res.render("auth/login", { error: "Error al guardar la sesión" });
      }

      if (usuario.rol && (usuario.rol.nombre === "admin" || usuario.rol.nombre === "moderador")) {
        return res.render('admin/panelAdmin', {titulo: "Panel de administración"});
      }

      return res.redirect("/");
    });

  } catch (error) {
    console.error(error);
    return res.render("auth/login", { error: "Ocurrió un error inesperado" });
  }
};

export const logout = (req, res) => {
  req.session.destroy(() => {
    return res.redirect("/");
  });
};