import * as ProductoService from "../services/productoService.js";

// Listar productos
export const listarProductos = async (req, res) => {
    try {
        const productos = await ProductoService.listarProductos();
        res.render("productos/lista", { productos, error: null });
    } catch (err) {
        res.render("productos/lista", { productos: [], error: err.message });
    }
};

// Crear producto
export const crearProducto = async (req, res) => {
    try {
        const { nombre, precio, descripcion, stock, imagen  } = req.body;
        await ProductoService.crearProducto(nombre, precio, descripcion, stock, imagen);
        res.redirect("/productos");
    } catch (err) {
        const productos = await ProductoService.listarProductos();
        res.render("productos/lista", { productos, error: err.message });
    }
};

// Editar producto
export const editarProducto = async (req, res) => {
    try {
    const producto = await ProductoService.editarProducto(req.params.id, req.body);
        
    if (!producto) return res.status(404).json({ error: "Producto no encontrado" });
        
    res.status(200).json(producto);
    } catch (err) {
        console.error('Error en editarProducto:', err);
        if (err.message && err.message.includes('existe')) {

        return res.status(400).json({ error: err.message });
            
        }
        res.status(500).json({ error: err.message || "Error al editar producto" });
    }
};

// Eliminar producto
export const eliminarProducto = async (req, res) => {

    try {
    const producto = await ProductoService.eliminarProducto(req.params.id);
    if (!producto) return res.status(404).json({ error: "Producto no encontrado" });
    res.status(200).json({ mensaje: "Producto eliminado" });
        
    } catch (err) {
        console.error('Error en eliminarProducto:', err);
        res.status(500).json({ error: err.message || "Error al eliminar producto" });
    }

};

// Detalle de un producto
export const detalleProducto = async (req, res) => {
    try {
    const producto = await ProductoService.obtenerProductoPorId(req.params.id);
        
    if (!producto) return res.status(404).send("Producto no encontrado");
    res.render("productos/detalle", { producto });
    } catch (err) {

    res.status(500).send("Error: " + err.message);
    }

};
