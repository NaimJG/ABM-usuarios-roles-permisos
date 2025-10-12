# 🧑‍💻 Proyecto ABM de Usuarios, Roles y Permisos

Este proyecto es una pequeña aplicación desarrollada con **Node.js** y **Express** que permite realizar un **ABM (Alta, Baja y Modificación)** de **usuarios**, **roles** y **permisos**.

La idea es practicar la estructura básica de una API REST y el manejo de rutas, controladores y modelos de una forma sencilla.

---

## 🚀 Tecnologías utilizadas

- **Node.js**  
- **Express.js**  
- **Nodemon** (para desarrollo)

---

## 📂 Estructura del proyecto

ProyectoBackendExpress/
│
├── src/
│ ├── controllers/
│ ├── middleware/
| ├── models/
| ├── public/
│ ├── routes/
│ ├── services/
│ └── server.js
│
├── package-lock.json
├── package.json
└── README.md

---

## ⚙️ Cómo ejecutar el proyecto

1. Clonar el repositorio o descargar la carpeta:
   ```bash
   git clone <url-del-repo>
   cd abm-usuarios

2. Instalar dependencias:
    ```bash
    npm install

3. Iniciar el servidor:
    ```bash
    npm run dev

4. Abrir el navegador en:
    ```
    http://localhost:3000

---

### 📋 Endpoints principales

Método	Ruta	Descripción
GET	/usuarios	Listar todos los usuarios
POST	/usuarios	Crear un nuevo usuario
PUT	/usuarios/:id	Modificar un usuario existente
DELETE	/usuarios/:id	Eliminar un usuario

---

#### 🎯 Objetivo del proyecto

El objetivo principal es aprender a crear una API REST desde cero, usando una estructura modular y buenas prácticas básicas con Express.
No busca ser un sistema completo, sino una demostración funcional y entendible de cómo manejar rutas y datos en Node.js.

---

##### 💬 Autor

Proyecto realizado por Naim Cambe
Estudiante de Técnico Superior en Desarrollo de Software# ABM-usuarios-roles-permisos
