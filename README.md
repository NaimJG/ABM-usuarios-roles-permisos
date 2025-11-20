# 🧑‍💻 Proyecto ABM de Usuarios, Roles, Permisos y Carrito de Compras

Este proyecto es una pequeña aplicación desarrollada con **Node.js**, **Express** y **MongoDB** que permite gestionar un **ABM (Alta, Baja y Modificación)** de **usuarios**, **roles** y **permisos**, y además incorpora un **módulo de carrito de compras**, confirmación de compra y visualización de historial.

La aplicación combina gestión administrativa con una funcionalidad típica de e-commerce para reforzar conceptos de relaciones entre tablas, control de permisos y flujos completos de interacción.

---

## 🚀 Tecnologías utilizadas

- **Node.js**  
- **Express.js**  
- **MongoDB + Mongoose**
- **Nodemon** para desarrollo
- **EJS** para las vistas

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
│ ├── views/
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
Entre los permisos existentes están:

crear_usuarios
crear_permisos
crear_roles
crear_productos
crear_compra
editar_usuarios
editar_permisos
editar_roles
editar_productos
eliminar_usuario
eliminar_permisos
eliminar_roles
eliminar_productos
ver_usuarios
ver_permisos
ver_roles
ver_productos
ver_compras

---

## 🛒 Permisos añadidos para el módulo de compras

Para el módulo de carrito se agregaron permisos nuevos:

**Permiso**     **Función**
crear_compra	Permite agregar productos al carrito y generar compras
ver_compras 	Permite ver el historial de compras realizadas

Estos permisos pueden modificarse o ampliarse desde el ABM de permisos, disponible en la vista /permisos.
Estos permisos se asignan a los roles desde /roles/:id/edit.

---

## 🧩 Asignación de permisos a roles

Desde la vista /roles/:id/edit se pueden asignar o quitar permisos mediante checkboxes.
Cada rol puede tener múltiples permisos asociados, y estos se guardan en la relación rol_permiso dentro de la base de datos.

Ejemplo:

Rol admin → tiene todos los permisos.

Rol moderador → puede editar roles y permisos, pero no crearlos o eliminarlos.

Rol user → Tiene acceso al carrito para crear compras y ver el historial de compras.

---

## 🧱 Middleware de control de acceso

Se incluye un middleware **authMiddleware.js** que verifica: 
- Si el usuario está autenticado.
- Si el usuario posee el permiso requerido para la acción.

---

## 🛒 Módulo de Carrito de Compras

Este módulo permite:

✔ Agregar productos al carrito
✔ Actualizar cantidades
✔ Eliminar ítems
✔ Respetar el stock disponible
✔ Confirmar la compra
✔ Registrar la compra y sus detalles
✔ Consultar historial de compras

## 🗃️ Nuevas tablas agregadas

📌 Compra

Representa una compra realizada por un usuario.

- usuario: ObjectId (Usuario) (Relación con la tabla Usuario que registra la compra)
- fecha: Date (Fecha en que se realizó la compra)
- total: Number (Monto total de la compra realizada)

Relación:
✔ Un usuario → muchas compras

📌 DetalleCompra

Representa un ítem dentro de una compra.

compra: ObjectId (Compra) (Relación con la tabla Compra, identifica a cual compra pertenece el detalle)
producto: ObjectId (Producto) (Relación con la tabla Producto, identifica el producto comprado)
cantidad: Number (Cantidad del producto específico de esta compra)
precio_unitario: Number (Precio del producto específico de esta compra)
subtotal: Number (El precio total de la cantidad de productos por el precio unitario)

Relaciones:
✔ Una compra → muchos detalles
✔ Un detalle → pertenece a un producto

--- 

## 🔄 Flujo de uso del carrito

1️⃣ Agregar un producto al carrito

El usuario presiona el botón + en el catálogo.

-- Se llama a la ruta:
POST /carrito/agregar/:prodId

-- El servicio:
✔ Verifica stock
✔ Suma cantidad (sin pasar el máximo permitido)
✔ Guarda el carrito

-- La vista actualiza:
✔ Contador del carrito
✔ Cantidad mostrada al usuario
✔ Botón deshabilitado si llega al stock máximo

2️⃣ Restar o eliminar productos

El usuario presiona el botón + en el catálogo.

-- Se llama a la ruta:
POST /carrito/eliminarUno/:prodId

-- La vista actualiza:
✔ Contador del carrito
✔ Cantidad mostrada al usuario
✔ Botón deshabilitado si llega a 0.

Si la cantidad llega a 0, se elimina del carrito.

3️⃣ Confirmar la compra

El usuario presiona el botón "Confirmar compra" en el carrito.

-- Se llama a la ruta:
POST /carrito/confirmar

-- El servicio:
✔ Calcula total
✔ Crea un registro en Compra
✔ Genera los registros en DetalleCompra
✔ Descuenta stock en cada producto
✔ Vacía el carrito

4️⃣ Ver historial de compras

-- Se llama a la ruta:
GET /compras/historial

-- La vista muestra:
✔ Fecha
✔ Total
✔ Items comprados
✔ Precios y subtotales

Este módulo requiere el permiso **ver_compras**.

## 🎯 Objetivo del proyecto

El objetivo principal es aprender a crear una API REST desde cero, usando una estructura modular y buenas prácticas básicas con Express.
No busca ser un sistema completo, sino una demostración funcional y entendible de cómo manejar rutas y datos en Node.js.

Además, se busca practicar el manejo de relaciones en MongoDB (1-N, N-1), el uso de middlewares para permisos y la creación de flujos un poco más complejos (carrito → compra → historial) contando con validaciones y manejo de stock.

---

## 💬 Autor

Proyecto realizado por Naim Cambe
Estudiante de Técnico Superior en Desarrollo de Software

