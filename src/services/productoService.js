import Producto from "../models/Producto.js";

// Listar productos
export const listarProductos = async () => {
    return await Producto.find().sort({ nombre: 1 });
};

// Crear producto
export const crearProducto = async (nombre, precio, descripcion, stock, imagen) => {
    if (!nombre) throw new Error("El nombre del producto es obligatorio");
    if (precio == null || isNaN(precio)) throw new Error("El precio del producto es obligatorio y debe ser un número");
    if (precio < 0) throw new Error("El precio del producto no puede ser negativo");
    if (stock != null && (isNaN(stock) || stock < 0)) throw new Error("El stock debe ser un número no negativo");
    const existente = await Producto.findOne({ nombre });
    if (existente) throw new Error("Ya existe un producto con ese nombre");
    const nuevoProducto = new Producto({ nombre, precio, descripcion, stock, imagen });
    await nuevoProducto.save();
    return nuevoProducto;
}

// Editar producto
export const editarProducto = async (id, data) => {
    if (!id) throw new Error('ID de producto obligatorio');
    if (data && data.nombre) {
        const existente = await Producto.findOne({ nombre: data.nombre });
        if (existente && existente._id.toString() !== id.toString()) {
            throw new Error('El nombre del producto ya existe');
        }
    }
    const producto = await Producto.findByIdAndUpdate(id, data, { new: true });
    return producto;
}

// Eliminar producto
export const eliminarProducto = async (id) => {
    if (!id) throw new Error('ID de producto obligatorio');
    console.log("Producto a eliminar ID:", id);
    const producto = await Producto.findByIdAndDelete(id);
    return producto;
}

// Detalle de un producto
export const detalleProducto = async (id) => {
    if (!id) throw new Error('ID de producto obligatorio');
    const producto = await Producto.findById(id);
    return producto;
};

export default {
    listarProductos,
    crearProducto,
    editarProducto,
    eliminarProducto,
    detalleProducto
};