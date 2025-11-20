import Carrito from "../models/Carrito.js";
import Producto from "../models/Producto.js";
import Compra from "../models/Compra.js";
import DetalleCompra from "../models/DetalleCompra.js";

export const obtenerCarrito = async (userId) => {
  let carrito = await Carrito.findOne({ usuario: userId })
    .populate("items.producto");

  if (!carrito) {
    carrito = await Carrito.create({ usuario: userId, items: [] });
  }
  return carrito;
};

export const agregarProducto = async (userId, prodId) => {
  const producto = await Producto.findById(prodId);
  if (!producto) throw new Error("Producto no encontrado");

  if (producto.stock <= 0) throw new Error("No hay stock disponible");

  const carrito = await obtenerCarrito(userId);

  const item = carrito.items.find(i => i.producto.equals(prodId));

  if (item) {
    if (item.cantidad + 1 > producto.stock) {
      throw new Error("Alcanzaste el máximo de stock disponible");
    }
    item.cantidad++;
  } else {
    carrito.items.push({ producto: prodId, cantidad: 1 });
  }

  await carrito.save();
};

export const actualizarCantidad = async (userId, itemId, cantidad) => {
  const carrito = await obtenerCarrito(userId);

  const item = carrito.items.id(itemId);
  if (!item) throw new Error("Ítem no encontrado");

  const producto = await Producto.findById(item.producto);

  if (cantidad > producto.stock) throw new Error("Stock insuficiente");
  if (cantidad < 1) throw new Error("Cantidad inválida");

  item.cantidad = cantidad;

  await carrito.save();
};

export const eliminarItem = async (userId, itemId) => {
  const carrito = await obtenerCarrito(userId);
  carrito.items = carrito.items.filter(i => i._id.toString() !== itemId);
  await carrito.save();
};

export const confirmarCompra = async (userId) => {
  const carrito = await obtenerCarrito(userId);

  if (carrito.items.length === 0) {
    throw new Error("El carrito está vacío");
  }

  let total = 0;

  for (const item of carrito.items) {
    const producto = await Producto.findById(item.producto);

    if (item.cantidad > producto.stock) {
      throw new Error(`Stock insuficiente de ${producto.nombre}`);
    }

    total += producto.precio * item.cantidad;
  }

  const compra = await Compra.create({ usuario: userId, total });

  for (const item of carrito.items) {
    const producto = await Producto.findById(item.producto);

    await DetalleCompra.create({
      compra: compra._id,
      producto: producto._id,
      cantidad: item.cantidad,
      precio_unitario: producto.precio,
      subtotal: producto.precio * item.cantidad
    });

    producto.stock -= item.cantidad;
    await producto.save();
  }

  carrito.items = [];
  await carrito.save();

  return compra._id;
};

export const contarItems = async (usuarioId) => {
  const carrito = await Carrito.findOne({ usuario: usuarioId });
  if (!carrito) return 0;

  return carrito.items.reduce((acc, item) => acc + item.cantidad, 0);
}

export const restarUno = async (userId, prodId) => {
  const carrito = await obtenerCarrito(userId);
  const item = carrito.items.find(i => i.producto.equals(prodId));

  if (!item) return;

  item.cantidad--;

  if (item.cantidad <= 0) {
    carrito.items = carrito.items.filter(i => !i.producto.equals(prodId));
  }

  await carrito.save();
};