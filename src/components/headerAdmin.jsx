import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/headerAdmin.css';
import logoAdmin from '../assets/images/Logos/logoo.jpeg';

const HeaderAdmin = ({ exitAdminMode }) => {
    const [menuVisible, setMenuVisible] = useState(false);

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    const handleLinkClick = () => {
        setMenuVisible(false);
    };

    return (
        <header className="header-devhouse-Admin">
            <nav className="nav-devhouse-Admin">
                <Link to="/">
                    <img id="logodevhouse-Admin" src={logoAdmin} alt="Logodevhouse" />
                </Link>
                <ul className={`nav-menu-devhouse-Admin ${menuVisible ? 'nav-menu_visible' : ''}`}>
                    <li className="nav-menu-item-devhouse-Admin"><Link to="/listProductos" className="nav-menu-link-devhouse-Admin nav-link-devhouse-Admin" onClick={handleLinkClick}>INVENTARIO</Link></li>
                    <li className="nav-menu-item-devhouse-Admin">
                        <Link to="/listCategorias" className="nav-menu-link-devhouse-Admin nav-link-devhouse-Admin" onClick={handleLinkClick}>CATEGORIA</Link>
                    </li>
                    <li className="nav-menu-item-devhouse-Admin">
                        <Link to="/listClientes" className="nav-menu-link-devhouse-Admin nav-link-devhouse-Admin" onClick={handleLinkClick}>CLIENTES</Link>
                    </li>
                    <li className="nav-menu-item-devhouse-Admin">
                        <Link to="/ventas" className="nav-menu-link-devhouse-Admin nav-link-devhouse-Admin" onClick={handleLinkClick}>VENTAS</Link>
                    </li>
                    <li className="nav-menu-item-devhouse-Admin">
                        <Link to="#" onClick={exitAdminMode} className="nav-menu-link-devhouse-Admin nav-link-devhouse-Admin">SALIR DEL MODO ADMIN</Link>
                    </li>
                </ul>
                <div className="nav-icons-devhouse-Admin">
                    <Link to="/cuenta" target="_blank" className="iconoUser">
                        <i className="fa-solid fa-user"></i>
                    </Link>
                </div>
                <button className="nav-toggle-menu toggle-custom" aria-label={menuVisible ? "Cerrar menú" : "Abrir menú"} onClick={toggleMenu}>
                    <i className="fa-solid fa-bars"></i>
                </button>
            </nav>
        </header>
    );
};

export default HeaderAdmin;
