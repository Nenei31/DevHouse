import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';
import Logologin from '../assets/images/Logos/logologin.jpg';
import '../assets/css/inicioSesion.css';
import AuthService from '../services/authService';

const InicioSesion = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [clienteNombre, setClienteNombre] = useState('');//
    const [mostrarVentana, setMostrarVentana] = useState(false);//
    const [captchaToken, setCaptchaToken] = useState(null);
    const navigate = useNavigate();

    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);
    const handleCaptchaChange = (token) => setCaptchaToken(token);


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!captchaToken) {
            setMensaje('Por favor, completa el captcha.');
            return;
        }
        try {
            const response = await AuthService.login({ email, password, captchaToken });
            const { token, role, nombre } = response.data;
            onLogin(token, role);
            setClienteNombre(nombre); // Establecer el nombre del cliente
            setShowWelcome(true); // Mostrar la ventana flotante
            setMensaje('Inicio de sesión exitoso');
            setTimeout(() => {
                navigate('/'); // Redirigir a la página principal después de 3 segundos
            }, 3000);
        
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setMensaje('Correo o contraseña incorrectas. Verifique sus credenciales.');
            } else {
                setMensaje('Error inesperado. Inténtelo de nuevo más tarde.');
            }
        }
    };

    const handleLinkClick = () => {
        setMensaje('');
    };

    const manejarVentana = () => {
        setMostrarVentana(true); // Mostrar ventana de actualización
    };

    const cerrarVentana = () => {
        setMostrarVentana(false); // Ocultar el modal de actualización
    };

    return (
        <main className="main-Logins">
            <div className="contenedor">
                <div className="imagen-devhouse">
                    <img src={Logologin} alt="Restaurante DevHouse" />
                </div>
                <div className="formulario-login">
                    <h1>INICIO SESIÓN</h1>
                    <form id="formularioInicioSesion" onSubmit={handleSubmit}>
                        <label htmlFor="email">Correo</label>
                        <input type="text" id="email" name="email" value={email} onChange={handleEmailChange} required />
                        <label htmlFor="password">Contraseña:</label>
                        <input type="password" id="password" name="password" value={password} onChange={handlePasswordChange} required />
                        <ReCAPTCHA sitekey="6LeDLAYqAAAAAKkNrnzVc56Bw3p6TW7MRdgJM2Vb" onChange={handleCaptchaChange} />
                        <button className="button-login" onClick={manejarVentana}>Iniciar Sesion </button>
                        {mensaje && <p>{mensaje}</p>}
                        <h2>No tienes una cuenta? <Link to="/registro" onClick={handleLinkClick}>Crea una ahora</Link></h2>
                        <br />
                        <h2><Link to="/recuperacionPassword" onClick={handleLinkClick}>¿Olvidaste tu contraseña?</Link></h2>
                    </form>
                </div>
            </div>
            {mostrarVentana && (
                <div className="modal">
                    <div className="modal-content">
                        <p>Bienvenido a el restaurante DevHouse,{clienteNombre}</p>
                    </div>
                </div>
            )}
        </main>
    );
};
    
export default InicioSesion;
