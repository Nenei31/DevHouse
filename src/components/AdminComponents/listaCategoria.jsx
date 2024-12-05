import React, { useEffect, useState } from 'react';
import CategoriaService from '../../services/categoriaService.js';
import { Link, useNavigate } from 'react-router-dom';
import '../../assets/css/tablaClientes.css';

const ListaCategorias = () =>{

    const [categorias, setCategorias] = useState([]);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [categoriaIdParaEliminar, setCategoriaIdParaEliminar] = useState(null);
    const [mostrarModalError, setMostrarModalError] = useState(false);
    const [errorMensaje, setErrorMensaje] = useState("");
    const navigate = useNavigate();


    useEffect(() => {
        listarCategorias();
    }, []);
    
    const listarCategorias = () => {
        CategoriaService.getAllCategorias().then(response => {
            setCategorias(response.data);
            setNoCategoriaEncontrado(false);
        }).catch(error => {
            console.log(error);
        });
    };

    const confirmarEliminar = (categoriaId) => {
        setMostrarModal(true);
        setCategoriaIdParaEliminar(categoriaId);
    };

    const eliminarCategoria = () => {
        CategoriaService.deleteCategoria(categoriaIdParaEliminar).then(response => {
            listarCategorias();
            setMostrarModal(false);
        }).catch(error => {
            console.log("Error al eliminar la categoria",error);
            setMostrarModal(false);
            setMostrarModalError(true);
            setErrorMensaje("No es posible eliminar esta categoria porque contiene productos");
        });
    };

    const handleErrorOkClick = () => {
        setMostrarModalError(false);
    };

    const handleActualizarClick = (id) => {
        navigate(`/actualizarCategorias/${id}`);
    };

    return(
        <div className="container">
            <h2 className="text-center">Lista De Categorias De Productos</h2>
            <Link className="btn btn-agregar" to="/agregarCategorias">Agregar Categoria</Link>
            <table className="table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nombre</th>
                        <th>Descripcion</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {categorias.length > 0 ? (
                        categorias.map((categoria) => (
                            <tr key={categoria.id}>
                                <td data-cell="Id">{categoria.id}</td>
                                <td data-cell="Nombre">{categoria.nombre}</td>
                                <td data-cell="Descripcion">{categoria.descripcion}</td>
                                <td data-cell="Acciones" className="actions">
                                    <button className="btn btn-info" onClick={() => handleActualizarClick(categoria.id)}>Actualizar</button>
                                    <button className="btn btn-danger" onClick={() => confirmarEliminar(categoria.id)}>Eliminar</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="text-center">No se encuentra categorias....error 404</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {mostrarModal && (
                <div className="modal">
                    <div className="modal-content">
                        <p>¿Estas seguro que deseas eliminar esta categoria?</p>
                        <button className="btn btn-danger" onClick={eliminarCategoria}>Sí</button>
                        <button className="btn btn-secondary" onClick={() => setMostrarModal(false)}>No</button>
                    </div>
                </div>
            )}

            {mostrarModalError && (
                <div className="modal">
                    <div className="modal-content">
                        <p>{errorMensaje}</p>
                        <button className="btn btn-secondary" onClick={handleErrorOkClick}>OK</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ListaCategorias;