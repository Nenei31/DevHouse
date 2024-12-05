import React from 'react';
import { Link } from 'react-router-dom'; 
import Logologin from "../assets/images/Logos/logologin.jpg";
import "../assets/css/inicioSesion.css";

const RecuperacionPassword= ()=>{

    const handleLinkClick = () => {
        //  aqui ponemso la la logica para operaciones futuras si es necesario
        
    };

    return(
        <main className="main-Logins">
        <div className="contenedor">
        <div className="imagen-supermercado">
            <img src={Logologin} alt="Restaurante DevHouse" />
        </div>
        <div className="formulario-login">
            <h1>RECUPERACION DE CONTRASEÑA</h1>
            <form id="formularioOlvidarContrasena">
                <label for="correo">Correo</label>
                <input type="email" id="correo" name="correo" required />
                
                <button className="button-login" type="submit">ENVIAR CÓDIGO</button>
                <br/><br/>
                <h2><Link to="/inicioSesion" onClick={handleLinkClick}>Volver atras</Link></h2>
            </form>
            <form id="formularioCodigo" className="formulario ">
                <label for="codigo">Código</label>
                <input type="text" id="codigo" name="codigo" required />
                <button className="button-login" type="submit">VALIDAR</button>
                
            </form>
        </div>
    </div>
    </main>
    );
};
export default RecuperacionPassword;
