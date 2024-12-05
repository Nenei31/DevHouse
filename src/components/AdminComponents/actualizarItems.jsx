import React, { useState, useEffect } from "react";
import ProductoService from "../../services/productoService";
import CategoriaService from "../../services/categoriaService";
import { useParams, useNavigate } from 'react-router-dom';

const ActualizarItems = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [nombre, setNombre] = useState("");
    const [categoria, setCategoria] = useState("");
    const [precio, setPrecio] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [stock, setStock] = useState("");
    const [imagen, setImagen] = useState(null);
    const [imagePreview, setImagePreview] = useState("");
    const [categorias, setCategorias] = useState([]);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [modalMessage, setModalMessage] = useState("");

    useEffect(() => {
        CategoriaService.getAllCategorias().then(response => {
            setCategorias(response.data);
        });

        ProductoService.getProductoById(id).then(response => {
            const producto = response.data;
            setNombre(producto.nombre);
            setCategoria(producto.categoriaId);
            setPrecio(producto.precio);
            setDescripcion(producto.descripcion);
            setStock(producto.stock);
            // Convertir bytes de la imagen a base64
            if (producto.imagen) {
                const base64Image = `data:image/jpeg;base64,${producto.imagen}`;
                setImagePreview(base64Image);
            }
        });
    }, [id]);

    const handleNombreChange = (e) => setNombre(e.target.value);
    const handleCategoriaChange = (e) => setCategoria(e.target.value);
    const handlePrecioChange = (e) => setPrecio(e.target.value);
    const handleDescripcionChange = (e) => setDescripcion(e.target.value);
    const handleStockChange = (e) => setStock(e.target.value);
    const handleImagenChange = (e) => {
        const file = e.target.files[0];
        setImagen(file);
        const reader = new FileReader();
        reader.onloadend = () => setImagePreview(reader.result);
        reader.readAsDataURL(file);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("nombre", nombre);
        formData.append("categoriaId", categoria);
        formData.append("precio", precio);
        formData.append("descripcion", descripcion);
        formData.append("stock", stock);
        if (imagen) {
            formData.append("imagen", imagen);
        } else if (!imagePreview) {
            setModalMessage("El producto debe tener una imagen para poder actualizar");
            setMostrarModal(true);
            return;
        }

        ProductoService.actualizarProducto(id, formData).then(response => {
            setModalMessage("Producto actualizado correctamente");
            setMostrarModal(true);
        }).catch(error => {
            console.log("Error al actualizar el producto", error);
            setModalMessage("El producto debe tener una imagen para poder actualizar");
            setMostrarModal(true);
        });
    };

    const handleOkClick = () => {
        setMostrarModal(false);
        if (modalMessage === "Producto actualizado correctamente") {
            navigate("/listProductos"); 
        }
    };

    return (
        <main className="body-agregarItems">
            <div className="container-agregar">
                <h1>Actualizar Producto</h1>
                <form id="productForm" onSubmit={handleSubmit}>
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="nombre">Nombre Del Producto</label>
                            <input
                                type="text"
                                name="nombre"
                                id="nombre"
                                placeholder="Nombre del producto"
                                value={nombre}
                                onChange={handleNombreChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="categoria">Categoría</label>
                            <select
                                name="categoria"
                                id="categoria"
                                value={categoria}
                                onChange={handleCategoriaChange}
                                required
                            >
                                <option value="" disabled>Seleccione una categoría</option>
                                {categorias.map((cat) => (
                                    <option key={cat.id} value={cat.id}>{cat.nombre}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="precio">Precio</label>
                            <input
                                type="number"
                                step="0.01"
                                name="precio"
                                id="precio"
                                placeholder="Precio"
                                value={precio}
                                onChange={handlePrecioChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="descripcion">Descripción</label>
                            <input
                                type="text"
                                name="descripcion"
                                id="descripcion"
                                placeholder="Descripción del producto"
                                value={descripcion}
                                onChange={handleDescripcionChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="stock">Stock</label>
                            <input
                                type="number"
                                name="stock"
                                id="stock"
                                placeholder="Stock"
                                value={stock}
                                onChange={handleStockChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="file">Subir imagen</label>
                            <button
                                type="button"
                                className="upload-btn"
                                onClick={() => document.getElementById('file').click()}
                            >
                                Seleccionar Imagen
                            </button>
                            <input
                                id="file"
                                type="file"
                                accept="image/*"
                                style={{ display: "none" }}
                                onChange={handleImagenChange}
                            />
                            {imagePreview && (
                                <img
                                    id="imagePreview"
                                    src={imagePreview}
                                    alt="Vista previa de la imagen"
                                    style={{
                                        marginTop: "10px",
                                        maxWidth: "100%",
                                        border: "1px solid #ccc",
                                        borderRadius: "4px",
                                    }}
                                />
                            )}
                        </div>
                    </div>
                    <div className="form-buttons">
                        <button type="button" onClick={() => navigate("/listProductos")}>Volver Atrás</button>
                        <button type="submit">Actualizar</button>
                    </div>
                </form>

                {mostrarModal && (
                    <div className="modal">
                        <div className="modal-content">
                            <p>{modalMessage}</p>
                            <button className="btn btn-danger" onClick={handleOkClick}>OK</button>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
};

export default ActualizarItems;