import React, { useState, useEffect } from "react";
import CategoriaService from "../../services/categoriaService";
import { useParams, useNavigate } from 'react-router-dom';

const ActualizarCategorias = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [mostrarModal, setMostrarModal] = useState(false);
    const [mostrarModalError, setMostrarModalError] = useState(false);
    const [errorMensaje, setErrorMensaje] = useState("");

    useEffect(() => {
        CategoriaService.getCategoriaById(id).then(response => {
            const categoria = response.data;
            setNombre(categoria.nombre);
            setDescripcion(categoria.descripcion);
        }).catch(error => {
            console.log("Error al obtener la categoría", error);
        });
    }, [id]);

    const handleNombreChange = (e) => setNombre(e.target.value);
    const handleDescripcionChange = (e) => setDescripcion(e.target.value);

    const handleSubmit = (e) => {
        e.preventDefault();
        const categoria = { nombre, descripcion };

        CategoriaService.actualizarCategoria(id, categoria).then(response => {
            console.log("Categoria actualizada con éxito");
            setMostrarModal(true);
        }).catch(error => {
            console.log("Error al actualizar la categoria", error);
            setMostrarModalError(true);
            setErrorMensaje("Error al actualizar la categoría");
        });
    };

    const handleOkClick = () => {
        setMostrarModal(false);
        navigate("/listCategorias");
    };

    const handleErrorOkClick = () => {
        setMostrarModalError(false);
    };

    return (
        <main className="body-agregarItems">
            <div className="container-agregar">
                <h1>Actualizar Categoria</h1>
                <form id="categoriaForm" onSubmit={handleSubmit}>
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="nombre">Nombre De La Categoria</label>
                            <input
                                type="text"
                                name="nombre"
                                id="nombre"
                                placeholder="Nombre de la categoria"
                                value={nombre}
                                onChange={handleNombreChange}
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
                                placeholder="Descripción de la categoria"
                                value={descripcion}
                                onChange={handleDescripcionChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="form-buttons">
                        <button type="button" onClick={() => navigate("/listCategorias")}>Volver Atrás</button>
                        <button type="submit">Actualizar</button>
                    </div>
                </form>

                {mostrarModal && (
                    <div className="modal">
                        <div className="modal-content">
                            <p>Categoria Actualizada Correctamente</p>
                            <button className="btn btn-danger" onClick={handleOkClick}>OK</button>
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
        </main>
    );
};

export default ActualizarCategorias;
