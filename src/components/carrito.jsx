import React, { useEffect, useState } from 'react';
import ProductoService from '../services/productoService';
import '../assets/css/carrito.css';
import { Link, useNavigate } from 'react-router-dom';
import PaypalButton from './PaypalButton/paypal';

const Carrito = ({ carrito, setCarrito, isLoggedIn }) => {
    const [productosActuales, setProductosActuales] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const obtenerPreciosActuales = async () => {
            try {
                const response = await ProductoService.getAllProductos();
                setProductosActuales(response.data);
            } catch (error) {
                console.error('Error al obtener los productos:', error);
            }
        };

        obtenerPreciosActuales();
    }, []);

    useEffect(() => {
        const actualizarPreciosCarrito = () => {
            setCarrito(prevCarrito => {
                return prevCarrito.map(item => {
                    const productoActual = productosActuales.find(p => p.id === item.id);
                    return productoActual ? { ...item, precio: productoActual.precio } : item;
                });
            });
        };

        if (productosActuales.length > 0) {
            actualizarPreciosCarrito();
        }
    }, [productosActuales, setCarrito]);

    useEffect(() => {
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }, [carrito]);

    const actualizarCantidad = (id, cantidad) => {
        if (cantidad < 1) return; // Evitar que la cantidad sea menor a 1
        setCarrito(carrito.map(item => item.id === id ? { ...item, stock: cantidad } : item));
    };

    const eliminarProducto = (id) => {
        setCarrito(carrito.filter(item => item.id !== id));
    };

    const total = carrito.reduce((acc, producto) => acc + producto.precio * producto.stock, 0).toFixed(2);

    const handleProceedToCheckout = () => {
        if (isLoggedIn) {
            navigate(`/pagar-monto?total=${total}`);
        } else {
            alert("Debe de iniciar sesión para comprar");
            navigate('/inicioSesion');
        }
    };

    return (
        <div className="carrito-container">
            <div className="carrito-header">
                <a href="#" className="carrito-titulo">DETALLE DE LA COMPRA</a>
            </div>
            <h2 className="carrito-subtitulo">Listado de Productos Adquiridos</h2>
            <table className="carrito-tabla">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Precio (S/.)</th>
                        <th>Cantidad</th>
                        <th>Monto</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {carrito.length > 0 ? (
                        carrito.map(producto => (
                            <tr key={producto.id}>
                                <td>{producto.nombre}</td>
                                <td>{producto.descripcion}</td>
                                <td>{producto.precio}</td>
                                <td>
                                    <input
                                        type="number"
                                        value={producto.stock}
                                        min="1"
                                        onChange={(e) => actualizarCantidad(producto.id, parseInt(e.target.value, 10))}
                                    />
                                </td>
                                <td>{(producto.precio * producto.stock).toFixed(1)}</td>
                                <td>
                                    <button className="btn btn-danger" onClick={() => eliminarProducto(producto.id)}>Eliminar</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6">No hay productos en el carrito.</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <div className="carrito-total">
                <h2>Monto total: S/. {total}</h2>
            </div>
            <div className="carrito-pagar">
                <button className="btn" onClick={handleProceedToCheckout}>Procesar Compra</button>
            </div>
        </div>
    );
};

export default Carrito;







