import React from 'react';
import { Link } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '../assets/css/principal.css';
import bebidas from "../assets/images/principal/bebi.jpg";
import cafe from "../assets/images/principal/cafes.jpg";
import festivaloriental from "../assets/images/principal/festivaloriental.jpg";
import festivalsalchi from "../assets/images/principal/festivalsalchi.jpg";
import postre from "../assets/images/principal/postres.jpg";
import sandwiche from "../assets/images/principal/sandwich.jpg";
import seccion3 from "../assets/images/principal/seccionn3.jpg";
import seccion4 from "../assets/images/principal/seccionn4.jpg";

const Index = () => {
    return (
        <main id="main-content" className="contenido-principal">
            <section className="contenido_1">
                <p className="titulo-index">
                    DevHouse, tu restaurante preferido.
                    <span> Coworking & Cafe</span>
                </p>
            </section>
            
            <section className="contenido_2 separador">
                <div className="saludo">
                    <h2 className="saludo">Nuestra carta por categorías</h2>
                </div>
                <div className="img-contenedor">
                    <div id="al">
                        <Link to="/products" style={{ textDecoration: 'none', color: 'black' }}>
                            <img src={sandwiche} alt="sandwiche" />
                            <p className="opcion">SANDWICHES</p>
                        </Link>
                    </div>
                    <div id="beb">
                        <Link to="/products" style={{ textDecoration: 'none', color: 'black' }}>
                            <img src={postre} alt="postre" />
                            <p className="opcion">POSTRES</p>
                        </Link>
                    </div>
                    <div id="beb">
                        <Link to="/products" style={{ textDecoration: 'none', color: 'black' }}>
                            <img src={festivalsalchi} alt="festivalsalchi" />
                            <p className="opcion">FESTIVAL DE SALCHIPAPAS</p>
                        </Link>
                    </div>
                    <div id="beb">
                        <Link to="/products" style={{ textDecoration: 'none', color: 'black' }}>
                            <img src={bebidas} alt="bebidas" />
                            <p className="opcion">BEBIDAS</p>
                        </Link>
                    </div>
                    <div id="lim">
                        <Link to="/products" style={{ textDecoration: 'none', color: 'black' }}>
                            <img src={cafe} alt="cafe" />
                            <p className="opcion">CAFÉ</p>
                        </Link>
                    </div>
                    <div id="cos">
                        <Link to="/products" style={{ textDecoration: 'none', color: 'black' }}>
                            <img src={festivaloriental} alt="festivaloriental" />
                            <p className="opcion">FESTIVAL ORIENTAL</p>
                        </Link>
                    </div>
                </div>

                
            </section>
            
            <section className="contenido_3">
                <div className="imagen-seccion3">
                    <img src={seccion3} alt="Carrito de restaurante" />
                </div>
                <div className="texto-seccion3">
                    <h1>MISIÓN</h1>
                    <p>Nuestra misión es brindar una experiencia acogedora y satisfactoria para los clientes, manteniendo el encanto tradicional del negocio. Con un equipo comprometido, la cafetería "DevHouse" busca ofrecer un ambiente cálido, asegurando una buena calidad de productos para los clientes.</p>
                </div>
            </section>
            
            <section className="contenido_4">
                <div className="texto-seccion4">
                    <h1>VISIÓN</h1>
                    <p>Ser el principal punto de encuentro en la comunidad para quienes buscan un equilibrio entre trabajo y bienestar, destacándose por la excelencia en la calidad del servicio y por promover una cultura de innovación y colaboración.</p>
                </div>
                <div className="imagen-seccion4">
                    <img src={seccion4} alt="Carrito de restaurante" />
                </div>
            </section>
        </main>
    );
};

export default Index;
