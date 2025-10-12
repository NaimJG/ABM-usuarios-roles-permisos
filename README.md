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
   git clone https://github.com/NaimJG/ABM-usuarios-roles-permisos.git

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

## 🔐 Gestión de permisos y roles

📜 Permisos creados

En el sistema se manejan permisos básicos para controlar qué acciones puede realizar cada rol.
Algunos ejemplos creados son:

crear_usuarios
crear_permisos
crear_roles
editar_usuarios
editar_permisos
editar_roles
eliminar_usuario
eliminar_permisos
eliminar_roles
ver_usuarios
ver_permisos
ver_roles

Estos permisos pueden modificarse o ampliarse desde el ABM de permisos, disponible en la vista /permisos.

## 🧩 Asignación de permisos a roles

Desde la vista /roles/:id/edit se pueden asignar o quitar permisos mediante checkboxes.
Cada rol puede tener múltiples permisos asociados, y estos se guardan en la relación rol_permiso dentro de la base de datos.

Ejemplo:

Rol admin → tiene todos los permisos.

Rol moderador → puede editar roles y permisos, pero no crearlos o eliminarlos.

Rol user → solo puede ver información.

👀 Visualización de permisos desde usuario

En la vista /usuarios/:id se muestran los datos del usuario junto con los permisos que posee su rol.
Esto permite entender qué acciones puede o no puede realizar dentro del sistema.

## 🧱 Middleware de control de acceso

Se incluye un middleware de ejemplo (authMiddleware.js) que verifica si el usuario tiene un permiso antes de permitir el acceso a una ruta protegida.
Por ahora se usa un usuario simulado.

## 🎯 Objetivo del proyecto

El objetivo principal es aprender a crear una API REST desde cero, usando una estructura modular y buenas prácticas básicas con Express.
No busca ser un sistema completo, sino una demostración funcional y entendible de cómo manejar rutas y datos en Node.js.

---

## 💬 Autor

Proyecto realizado por Naim Cambe
Estudiante de Técnico Superior en Desarrollo de Software# ABM-usuarios-roles-permisos
