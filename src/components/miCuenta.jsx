import React from 'react';
import { useNavigate } from 'react-router-dom';

const MiCuenta = ({ handleLogout }) => {
    const navigate = useNavigate();

    const handleLogoutClick = () => {
        handleLogout();
        navigate('/');
    };

    return (
        <div>
            <h1>Mi Cuenta</h1>
            <button onClick={handleLogoutClick}>Cerrar Sesión</button>
        </div>
    );
};

export default MiCuenta;
