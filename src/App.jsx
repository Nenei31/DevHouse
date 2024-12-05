import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ScrollToTop from './components/Utils/scrollToTop.jsx';
import Header from './components/header.jsx';
import HeaderAdmin from './components/headerAdmin';
import Index from './components/index.jsx';
import Footer from './components/footer.jsx';
import InicioSesion from './components/inicioSesion.jsx';
import Registro from './components/registro.jsx';
import RecuperacionPassword from './components/recuperarContraseña.jsx';
import Contacto from './components/contacto.jsx';
import ListCliente from './components/AdminComponents/listaCliente.jsx';
import ListCategoria from './components/AdminComponents/listaCategoria.jsx';
import ListProducto from './components/AdminComponents/listaProducto.jsx';
import AgregarItems from './components/AdminComponents/agregarItems.jsx';
import AgregarCategorias from './components/AdminComponents/agregarCategoria.jsx';
import ActualizarItems from './components/AdminComponents/actualizarItems.jsx';
import ActualizarCategorias from './components/AdminComponents/actualizarCategoria.jsx';
import Products from './components/products.jsx';
import MiCuenta from './components/miCuenta.jsx';
import PrivateRoute from './components/Utils/privateRoute.jsx';
import Carrito from './components/carrito.jsx';
import PaypalButton from './components/PaypalButton/paypal.jsx';
import PaymentPage from './components/pago.jsx';
import TargetForm from './components/tarjeta.jsx';
import Ventas from './components/AdminComponents/ventas.jsx';

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [adminMode, setAdminMode] = useState(false);
  const [carrito, setCarrito] = useState(() => {
    const savedCarrito = localStorage.getItem('carrito');
    return savedCarrito ? JSON.parse(savedCarrito) : [];
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    if (token && role === 'ADMIN') {
      setIsAdmin(true);
      setIsLoggedIn(true);
    } else if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  // Actualiza precios del carrito
  useEffect(() => {
    const actualizarPreciosCarrito = async () => {
      try {
        const response = await ProductoService.getAllProductos();
        const productosActuales = response.data;
        setCarrito(prevCarrito => {
          return prevCarrito.map(item => {
            const productoActual = productosActuales.find(p => p.id === item.id);
            return productoActual ? { ...item, precio: productoActual.precio } : item;
          });
        });
      } catch (error) {
        console.error('Error al obtener los productos:', error);
      }
    };

    actualizarPreciosCarrito();
  }, []);

  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }, [carrito]);

  const handleLogin = (token, role) => {
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
    if (role === 'ADMIN') {
      setIsAdmin(true);
    }
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('carrito');
    setIsAdmin(false);
    setIsLoggedIn(false);
    setAdminMode(false);
    setCarrito([]);
  };

  const toggleAdminMode = () => {
    setAdminMode(!adminMode);
  };

  const agregarAlCarrito = (producto) => {
    setCarrito(prevCarrito => {
      const productoExistente = prevCarrito.find(item => item.id === producto.id);
      if (productoExistente) {
        return prevCarrito.map(item =>
          item.id === producto.id ? { ...item, stock: item.stock + 1 } : item
        );
      }
      return [...prevCarrito, { ...producto, stock: 1 }];
    });
  };

  return (
    <Router>
      <ScrollToTop />
      <div className="App">
        {adminMode ? (
          <HeaderAdmin exitAdminMode={toggleAdminMode} />
        ) : (
          <Header isLoggedIn={isLoggedIn} isAdmin={isAdmin} toggleAdminMode={toggleAdminMode}  handleLogout={handleLogout}/>
        )}
        <div className="main-content"></div>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/inicioSesion" element={<InicioSesion onLogin={handleLogin} />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/recuperacionPassword" element={<RecuperacionPassword />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/products" element={<Products carrito={carrito} agregarAlCarrito={agregarAlCarrito} />} />
          <Route path="/carrito" element={<Carrito carrito={carrito} setCarrito={setCarrito} isLoggedIn={isLoggedIn} />} />
          <Route path="/pagar-monto" element={<PaypalButton />} />
          <Route path="/pago" element={<PaymentPage />} />
          {/* Rutas admin */}
          <Route path="/listClientes" element={
            <PrivateRoute isLoggedIn={isLoggedIn} isAdmin={isAdmin}>
              <ListCliente />
            </PrivateRoute>
          } />
          <Route path="/listCategorias" element={
            <PrivateRoute isLoggedIn={isLoggedIn} isAdmin={isAdmin}>
              <ListCategoria />
            </PrivateRoute>
          } />
          <Route path="/listProductos" element={
            <PrivateRoute isLoggedIn={isLoggedIn} isAdmin={isAdmin}>
              <ListProducto />
            </PrivateRoute>
          } />
          <Route path="/ventas" element={
            <PrivateRoute isLoggedIn={isLoggedIn} isAdmin={isAdmin}>
              <Ventas />
            </PrivateRoute>
          } />
          <Route path="/agregarItems" element={
            <PrivateRoute isLoggedIn={isLoggedIn} isAdmin={isAdmin}>
              <AgregarItems />
            </PrivateRoute>
          } />
          <Route path="/agregarCategorias" element={
            <PrivateRoute isLoggedIn={isLoggedIn} isAdmin={isAdmin}>
              <AgregarCategorias />
            </PrivateRoute>
          } />
          <Route path="/actualizarItems/:id" element={
            <PrivateRoute isLoggedIn={isLoggedIn} isAdmin={isAdmin}>
              <ActualizarItems />
            </PrivateRoute>
          } />
          <Route path="/actualizarCategorias/:id" element={
            <PrivateRoute isLoggedIn={isLoggedIn} isAdmin={isAdmin}>
              <ActualizarCategorias />
            </PrivateRoute>
          } />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;