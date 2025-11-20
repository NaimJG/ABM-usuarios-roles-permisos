import * as carritoService from "../services/carritoService.js";

export const verCarrito = async (req, res) => {
  const userId = req.user._id;

  const carrito = await carritoService.obtenerCarrito(userId);

  res.render("carrito/carrito", { carrito, usuario: req.user });
};

export const agregarAlCarrito = async (req, res) => {
  try {
    await carritoService.agregarProducto(req.user._id, req.params.prodId);

    const cantidad = await carritoService.contarItems(req.user._id);

    res.json({ ok: true, cantidad });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const actualizarCantidad = async (req, res) => {
  try {
    const { cantidad } = req.body;
    await carritoService.actualizarCantidad(req.user._id, req.params.itemId, cantidad);
    res.redirect("/carrito");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const eliminarDelCarrito = async (req, res) => {
  try {
    await carritoService.eliminarItem(req.user._id, req.params.itemId);
    res.redirect("/carrito");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const confirmarCompra = async (req, res) => {
  try {
    const compraId = await carritoService.confirmarCompra(req.user.id);
    res.render("carrito/confirmar", { compraId, usuario: req.user });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const cantidadItems = async (req, res) => {
  try {
    const cantidad = await carritoService.contarItems(req.user._id);
    res.json({ cantidad });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const cantidadesPorProducto = async (req, res) => {
  try {
    const carrito = await carritoService.obtenerCarrito(req.user._id);

    const cantidades = {};
    carrito.items.forEach(i => {
      const prodId = i.producto._id.toString();
      cantidades[prodId] = i.cantidad;
    });

    res.json(cantidades);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const restarUnoController = async (req, res) => {
  try {
    await carritoService.restarUno(req.user._id, req.params.prodId);
    res.json({ ok: true });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};