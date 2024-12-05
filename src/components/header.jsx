import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/header.css';
import logo from '../assets/images/Logos/logooo.png';

const Header = ({ isLoggedIn, isAdmin, toggleAdminMode, handleLogout }) => {
    const [menuVisible, setMenuVisible] = useState(false);

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    const handleLinkClick = () => {
        setMenuVisible(false);
    };

    return (
        <header className="header-devhouse">
            <nav className="nav-devhouse">
                <Link to="/">
                    <img id="logodevhouse" src={logo} alt="Logodevhouse" />
                </Link>
                <Link to="/" className="logo-devhouse nav-link-devhouse">
                        Restaurante DevHouse
                </Link>
                <ul className={`nav-menu-devhouse ${menuVisible ? "nav-menu_visible" : ""}`}>
                    <li className="nav-menu-item-devhouse">
                        <Link to="/" className="nav-menu-link-devhouse nav-link-devhouse" onClick={handleLinkClick}>Inicio</Link>
                    </li>
                    {!isLoggedIn && (
                        <li className="nav-menu-item-devhouse despegable-header">
                            <Link to="/inicioSesion" className="nav-menu-link-devhouse nav-link-devhouse" onClick={handleLinkClick}>Iniciar Sesión</Link>
                            <ul className="contenido-despegable">
                                <li>
                                    <Link to="/registro" className="nav-menu-link-devhouse nav-link-devhouse" onClick={handleLinkClick}>Registrar</Link>
                                </li>
                            </ul>
                        </li>
                    )}
                    <li className="nav-menu-item-devhouse">
                        <Link to="/products" className="nav-menu-link-devhouse nav-link-devhouse" onClick={handleLinkClick}>Nuestra Carta</Link>
                    </li>
                    <li className="nav-menu-item-devhouse">
                        <Link to="/contacto" className="nav-menu-link-devhouse nav-link-devhouse" onClick={handleLinkClick}>Reservas</Link>
                    </li>
                    <li className="nav-menu-item-devhouse carrito">
                        <Link to="/carrito" className="nav-menu-link-devhouse nav-link-devhouse" onClick={handleLinkClick}>Carrito de Compras</Link>
                    </li>
                </ul>
                <div className="nav-icons-devhouse">
                    {isAdmin && (
                        <Link to="/headerAdmin" className="iconoTools" onClick={toggleAdminMode}>
                            <i className="fa-solid fa-screwdriver-wrench"></i>
                        </Link>
                    )}
                    <Link to="/carrito" className="iconoCarrito">
                        <i className="fa-solid fa-cart-shopping"></i>
                    </Link>
                    {isLoggedIn && (
                        <div className="dropdown-container">
                            <button className="iconoUser">
                                <i className="fa-solid fa-user"></i>
                            </button>
                            <div className="dropdown-menu">
                                <button className="logout-btn" onClick={handleLogout}>Cerrar sesión</button>
                            </div>
                        </div>
                    
                    )}
                </div>
                <button className="nav-toggle-menu toggle-custom" aria-label={menuVisible ? "Cerrar menú" : "Abrir menú"} onClick={toggleMenu}>
                    <i className="fa-solid fa-bars"></i>
                </button>
            </nav>
        </header>
    );
};

export default Header;

