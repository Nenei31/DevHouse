import React, { useEffect, useState } from 'react';
import ClienteService from '../../services/clienteService.js';
import { Link } from 'react-router-dom';
import '../../assets/css/tablaClientes.css';

const ListaClientes = () => {

    const [clientes, setClientes] = useState([]);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [clienteIdParaEliminar, setClienteIdParaEliminar] = useState(null);
    const [mostrarModalActualizar, setMostrarModalActualizar] = useState(false); // Nuevo estado para el modal de actualización
    const [terminoBusqueda, setTerminoBusqueda] = useState("");
    const [noClienteEncontrado, setNoClienteEncontrado] = useState(false);

    useEffect(() => {
        listarClientes();
    }, []);
    
    const listarClientes = () => {
        ClienteService.getAllClientes().then(response => {
            setClientes(response.data);
            setNoClienteEncontrado(false);
        }).catch(error => {
            console.log(error);
        });
    };

    const confirmarEliminar = (clienteId) => {
        setMostrarModal(true);
        setClienteIdParaEliminar(clienteId);
    };

    const eliminarCliente = () => {
        ClienteService.deleteCliente(clienteIdParaEliminar).then(response => {
            listarClientes();
            setMostrarModal(false);
        }).catch(error => {
            console.log(error);
            setMostrarModal(false);
        });
    };

    const manejarBusqueda = () => {
        if (terminoBusqueda.trim() !== "") {
            ClienteService.getClienteByDni(terminoBusqueda).then(response => {
                if (response.data.length > 0) {
                    setClientes(response.data);
                    setNoClienteEncontrado(false);
                } else {
                    setClientes([]);
                    setNoClienteEncontrado(true);
                }
            }).catch(error => {
                console.log(error);
                setNoClienteEncontrado(true);
            });
        } else {
            listarClientes();
        }
    };

    const manejarActualizar = () => {
        setMostrarModalActualizar(true); // Mostrar el modal de actualización
    };

    const cerrarModalActualizar = () => {
        setMostrarModalActualizar(false); // Ocultar el modal de actualización
    };

    return (
        <div className="container">
            <h2 className="text-center">Lista De Clientes</h2>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Buscar cliente por Dni..."
                    className="search-input"
                    value={terminoBusqueda}
                    onChange={(e) => setTerminoBusqueda(e.target.value)}
                />
                <button className="search-button" onClick={manejarBusqueda}>
                    <i className="fa-solid fa-magnifying-glass"></i>
                </button>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>DNI</th>
                        <th>Email</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {clientes.length > 0 ? (
                        clientes.map((cliente) => (
                            <tr key={cliente.id}>
                                <td data-cell="Id">{cliente.id}</td>
                                <td data-cell="Nombre">{cliente.nombre}</td>
                                <td data-cell="Apellido">{cliente.apellido}</td>
                                <td data-cell="DNI">{cliente.dni}</td>
                                <td data-cell="Email">{cliente.email}</td>
                                <td data-cell="Acciones" className="actions">
                                    <button className="btn btn-info" onClick={manejarActualizar}>Actualizar</button>
                                    <button className="btn btn-danger" onClick={() => confirmarEliminar(cliente.id)}>Eliminar</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="text-center">{noClienteEncontrado ? "Cliente no encontrado" : "No hay clientes disponibles"}</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {mostrarModal && (
                <div className="modal">
                    <div className="modal-content">
                        <p>¿Estás seguro que deseas eliminar al cliente?</p>
                        <button className="btn btn-danger" onClick={eliminarCliente}>Sí</button>
                        <button className="btn btn-secondary" onClick={() => setMostrarModal(false)}>No</button>
                    </div>
                </div>
            )}

            {mostrarModalActualizar && (
                <div className="modal">
                    <div className="modal-content">
                        <p>No tiene permitido modificar los datos del cliente</p>
                        <button className="btn btn-secondary" onClick={cerrarModalActualizar}>OK</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ListaClientes;