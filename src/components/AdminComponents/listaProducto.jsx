import React, { useEffect, useState } from 'react';
import ProductoService from '../../services/productoService.js';
import { Link, useNavigate } from 'react-router-dom';

const ListaProductos = () =>{
    const [productos, setProductos] = useState([]);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [productoIdParaEliminar, setProductoIdParaEliminar] = useState(null);
    const [terminoBusqueda, setTerminoBusqueda] = useState("");
    const [noProductoEncontrado, setNoProductoEncontrado] = useState(false);
    const navigate = useNavigate();


    useEffect(() => {
        listarProductos();
    }, []);
    
    const listarProductos = () => {
        ProductoService.getAllProductos().then(response => {
            setProductos(response.data);
            setNoProductoEncontrado(false);
        }).catch(error => {
            console.log(error);
        });
    };

    const confirmarEliminar = (productoId) => {
        setMostrarModal(true);
        setProductoIdParaEliminar(productoId);
    };

    const eliminarProducto = () => {
        ProductoService.deleteProducto(productoIdParaEliminar).then(response => {
            listarProductos();
            setMostrarModal(false);
        }).catch(error => {
            console.log(error);
            setMostrarModal(false);
        });
    };

    const manejarBusqueda = () => {
        if (terminoBusqueda.trim() === "") {
            listarProductos();
        } else if (!isNaN(terminoBusqueda)) {
            // Buscar por ID de producto
            ProductoService.getProductoById(terminoBusqueda).then(response => {
                if (response.data) {
                    setProductos([response.data]);
                    setNoProductoEncontrado(false);
                } else {
                    setProductos([]);
                    setNoProductoEncontrado(true);
                }
            }).catch(error => {
                console.log(error);
                setNoProductoEncontrado(true);
            });
        } else {
            // Buscar por nombre de producto o categoría
            ProductoService.buscarProductos(terminoBusqueda).then(response => {
                if (response.data.length > 0) {
                    setProductos(response.data);
                    setNoProductoEncontrado(false);
                } else {
                    ProductoService.getProductosByCategoria(terminoBusqueda).then(response => {
                        if (response.data.length > 0) {
                            setProductos(response.data);
                            setNoProductoEncontrado(false);
                        } else {
                            setProductos([]);
                            setNoProductoEncontrado(true);
                        }
                    }).catch(error => {
                        console.log(error);
                        setNoProductoEncontrado(true);
                    });
                }
            }).catch(error => {
                console.log(error);
                setNoProductoEncontrado(true);
            });
        }
    };


    const handleActualizarClick = (id) => {
        navigate(`/actualizarItems/${id}`);
    };

    return(
        <div className="container">
            <h2 className="text-center">Lista De Productos</h2>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Busca por id, nombre o categoría ..."
                    className="search-input"
                    value={terminoBusqueda}
                    onChange={(e) => setTerminoBusqueda(e.target.value)}
                />
                <button className="search-button" onClick={manejarBusqueda}>
                    <i className="fa-solid fa-magnifying-glass"></i>
                </button>
            </div>
            <div className="content-btn-Producto">
                <Link className="btn btn-agregar-producto" to="/agregarItems">Agregar Producto</Link>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nombre</th>
                        <th>Descripcion</th>
                        <th>Precio (S/)</th>
                        <th>Stock</th>
                        <th>Categoria</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {productos.length > 0 ? (
                        productos.map((producto) => (
                            <tr key={producto.id}>
                                <td data-cell="Id">{producto.id}</td>
                                <td data-cell="Nombre">{producto.nombre}</td>
                                <td data-cell="Descripcion">{producto.descripcion}</td>
                                <td data-cell="Precio">{producto.precio}</td>
                                <td data-cell="Stock">{producto.stock}</td>
                                <td data-cell="Categoria">{producto.categoriaNombre}</td>
                                <td data-cell="Acciones" className="actions">
                                    <button className="btn btn-info" onClick={() => handleActualizarClick(producto.id)}>Actualizar</button>
                                    <button className="btn btn-danger" onClick={() => confirmarEliminar(producto.id)}>Eliminar</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7" className="text-center">{noProductoEncontrado ? "Producto no encontrado" : "No hay coincidencias"}</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {mostrarModal && (
                <div className="modal">
                    <div className="modal-content">
                        <p>¿Estás seguro que deseas eliminar este Producto?</p>
                        <button className="btn btn-danger" onClick={eliminarProducto}>Sí</button>
                        <button className="btn btn-secondary" onClick={() => setMostrarModal(false)}>No</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ListaProductos;