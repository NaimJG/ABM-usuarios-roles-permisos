import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import mongoose from "mongoose";
import usuarioRoutes from "./routes/usuarioRoutes.js";
import rolRoutes from "./routes/rolRoutes.js";
import permisoRoutes from "./routes/permisoRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Configurar EJS como motor de vistas
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Servir archivos estáticos desde /public
app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Registrar routers
app.use("/usuarios", usuarioRoutes);
app.use("/roles", rolRoutes);
app.use("/permisos", permisoRoutes);

// Ejemplo básico de ruta
app.get("/", (req, res) => {
  res.render("index", { titulo: "Bienvenido al ABM de Usuarios, Roles y Permisos" });
});

// Cargar variables de entorno (opcional .env en la raíz)
dotenv.config();

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