import React, { useState } from 'react';
import axios, { isAxiosError } from 'axios';
import "../assets/css/contacto.css";
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";


const Contacto = () => {
    const [formData, setFormData] = useState({
        name: '',
        tipo: 'mesa',
        fecha: '',
        cantidad: 1,
        correo: ''
    });
    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Crear una instancia de FormData y agregar los datos
        const form = new FormData();
        form.append('nombreCompleto', formData.name);
        form.append('tipo', formData.tipo);
        form.append('fechaReserva', formData.fecha);
        form.append('cantidadPersonas', formData.cantidad);
        form.append('email', formData.correo);

        try {
            await axios.post('http://localhost:8080/api/reservas', form, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
                setFormData({
                    name: '',
                    tipo: 'mesa',
                    fecha: '',
                    cantidad: 1,
                    correo: ''
                });
                Swal.fire({
                    title: "¡Reserva exitosa!",
                    text: "Tu reserva ha sido registrada correctamente.",
                    icon: "success",
                    confirmButtonText: "Aceptar",
                  }).then(() => {
                    // Redirige a la página principal
                    navigate("/");
                  });
            
        } catch (error) {
            if(isAxiosError(error)) {
                console.log('Error al enviar la reserva:', error.response.data);
            }
            
            Swal.fire({
                title: "Error",
                text: "No se pudo registrar la reserva. Intenta nuevamente.",
                icon: "error",
                confirmButtonText: "Aceptar",
              });
        }
    };

    return (
        <main id="maincont">
            <div id="form">
                <h1 className="contact-saludo">Haz una reserva</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="name">Nombre Completo:</label><br />
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    /><br />
                    <label htmlFor="tipo">Tipo:</label><br />
                    <select
                        name="tipo"
                        id="tipo"
                        value={formData.tipo}
                        onChange={handleChange}
                    >
                        <option value="mesa">Mesa</option>
                        <option value="sala de reuniones">Sala de Reuniones</option>
                    </select><br />
                    <label htmlFor="fecha">Fecha:</label><br />
                    <input
                        type="datetime-local"
                        name="fecha"
                        id="fecha"
                        value={formData.fecha}
                        onChange={handleChange}
                        required
                    /><br />
                    <label htmlFor="cantidad">Cantidad de Personas:</label><br />
                    <input
                        type="number"
                        name="cantidad"
                        id="cantidad"
                        value={formData.cantidad}
                        onChange={handleChange}
                        required
                    /><br />
                    <label htmlFor="correo">Email:</label><br />
                    <input
                        type="email"
                        name="correo"
                        id="correo"
                        value={formData.correo}
                        onChange={handleChange}
                        required
                    /><br />
                    <button className="contact-button" type="submit">Enviar</button>
                </form>
            </div>
        </main>
    );
};

export default Contacto;
