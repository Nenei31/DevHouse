import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logologin from '../assets/images/Logos/logologin.jpg';
import '../assets/css/inicioSesion.css';
import AuthService from '../services/authService';

const Registro = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        apellidos: '',
        dni: '',
        telefono: '',
        email: '',
        password: '',
        confirmarPassword: '',
    });

    const [mostrarModal, setMostrarModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const navigate = useNavigate();

    const handleKeyPress = (e) => {
        const charCode = e.charCode ? e.charCode : e.keyCode;
        if (charCode < 48 || charCode > 57) {
            e.preventDefault();
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'dni' || name === 'telefono') {
            if (!/^\d*$/.test(value)) {
                return;
            }
        }
        setFormData({
            ...formData,
            [name]: value
        });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmarPassword) {
            setModalMessage('Las contraseñas no coinciden');
            setMostrarModal(true);
            return;
        }

        try {
            await AuthService.registro({
                nombre: formData.nombre,
                apellido: formData.apellidos,
                dni: formData.dni,
                telefono: formData.telefono,
                email: formData.email,
                password: formData.password,
            });
            setModalMessage('Te has registrado correctamente');
            setMostrarModal(true);
        } catch (error) {
            console.error('Error al registrar:', error);
            setModalMessage('Error al registrar. Por favor, intenta de nuevo con otro correo.');
            setMostrarModal(true);
        }
    };

    const handleOkClick = () => {
        setMostrarModal(false);
        if (modalMessage === 'Te has registrado correctamente') {
            navigate('/inicioSesion');
        }
    };

    return (
        <main className="main-Logins">
            <div className="contenedor">
                <div className="imagen-devhouse">
                    <img src={Logologin} alt="Restaurante DevHouse" />
                </div>
                <div className="formulario-login">
                    <h1>REGISTRO</h1>
                    <form id="formularioRegistro" onSubmit={handleSubmit}>
                        <label htmlFor="nombre">Nombre</label>
                        <input type="text" id="nombre" name="nombre" required value={formData.nombre} onChange={handleChange} />
                        <label htmlFor="apellidos">Apellidos</label>
                        <input type="text" id="apellidos" name="apellidos" required value={formData.apellidos} onChange={handleChange} />
                        <label htmlFor="dni">DNI</label>
                        <input type="text" id="dni" name="dni" maxLength={8} required value={formData.dni} onChange={handleChange} onKeyPress={handleKeyPress} />
                        <label htmlFor="telefono">Teléfono</label>
                        <input type="text" id="telefono" name="telefono" maxLength={9} required value={formData.telefono} onChange={handleChange} onKeyPress={handleKeyPress} />
                        <label htmlFor="email">Correo</label>
                        <input type="email" id="email" name="email" required value={formData.email} onChange={handleChange} />
                        <label htmlFor="password">Contraseña</label>
                        <input type="password" id="password" name="password" required value={formData.password} onChange={handleChange} />
                        <label htmlFor="confirmarPassword">Confirmar Contraseña</label>
                        <input type="password" id="confirmarPassword" name="confirmarPassword" required value={formData.confirmarPassword} onChange={handleChange} />
                        {/* <ReCAPTCHA sitekey="TU_SITE_KEY" onChange={handleCaptchaChange} /> */}
                        <button className="button-login" type="submit">REGISTRARSE</button>
                        <h2>¿Ya tienes una cuenta? <Link to="/inicioSesion">Inicia sesión aquí</Link></h2>
                    </form>
                    {mostrarModal && (
                        <div className="modal">
                            <div className="modal-content">
                                <p>{modalMessage}</p>
                                <button className="btn btn-danger" onClick={handleOkClick}>OK</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
};

export default Registro;


