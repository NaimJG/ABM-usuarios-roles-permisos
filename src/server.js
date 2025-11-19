import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import mongoose from "mongoose";
import usuarioRoutes from "./routes/usuarioRoutes.js";
import rolRoutes from "./routes/rolRoutes.js";
import permisoRoutes from "./routes/permisoRoutes.js";
import productoRoutes from "./routes/productoRoutes.js";
import authRoutes from "./routes/authRoutes.js"
import session from "express-session";
import { listarProductos } from "./services/productoService.js";

// Cargar variables de entorno
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 } // 1 hora
  })
);

// Configurar EJS como motor de vistas
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Registrar routers
app.use("/usuarios", usuarioRoutes);
app.use("/roles", rolRoutes);
app.use("/permisos", permisoRoutes);
app.use("/productos", productoRoutes);
app.use("/auth", authRoutes);

app.get("/", async (req, res) => {
  const user = req.session.user;
  if (!user) return res.render("auth/login", { error: null });

  if (user.rol && (user.rol === 'admin' || user.rol === 'moderador')) {
    return res.render('admin/panelAdmin', { titulo: "Panel de administración" });
  }

  const productos = await listarProductos();
  return res.render('home/catalogue', {usuario: user, productos: productos });
});

const MONGO_URI = process.env.MONGO_URI;

const startServer = async () => {
  try {
    // Conectar a MongoDB
    await mongoose.connect(MONGO_URI);
    console.log("Conectado a MongoDB");

    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`Servidor escuchando en http://localhost:${port}`));
  } catch (err) {
    console.error("Error conectando a la base de datos:", err);
    process.exit(1);
  }
};

startServer();