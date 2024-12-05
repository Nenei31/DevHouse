import React, { useState, useEffect } from "react";
import ProductoService from "../../services/productoService";
import CategoriaService from "../../services/categoriaService";
import { Link } from 'react-router-dom';

import "../../assets/css/agregarItems.css";

const AgregarItems = () => {
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
    }, []);

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
        if (!imagen) {
            setModalMessage("El producto debe tener una imagen para poder guardar");
            setMostrarModal(true);
            return;
        }
        const formData = new FormData();
        formData.append("nombre", nombre);
        formData.append("categoriaId", categoria);
        formData.append("precio", precio);
        formData.append("descripcion", descripcion);
        formData.append("stock", stock);
        formData.append("imagen", imagen);

        ProductoService.guardarProducto(formData).then(response => {
            console.log("Producto guardado con éxito");
            setModalMessage("Producto guardado correctamente");
            setMostrarModal(true);
        }).catch(error => {
            console.log("Error al guardar el producto", error);
            setModalMessage("Error al guardar el producto");
            setMostrarModal(true);        
        });
    };


    const handleOkClick = () => {
        setMostrarModal(false); // Ocultar el modal
        if (modalMessage === "Producto guardado correctamente") {
            // Limpiar los campos del formulario
            setNombre("");
            setCategoria("");
            setPrecio("");
            setDescripcion("");
            setStock("");
            setImagen(null);
            setImagePreview("");
        }
    };

    
    return (
        <main className="body-agregarItems">
            <div className="container-agregar">
                <h1>Agregar Productos</h1>
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
                        <button type="button" onClick={() => window.history.back()}>Volver Atrás</button>
                        <button type="submit">Guardar</button>
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


export default AgregarItems;
