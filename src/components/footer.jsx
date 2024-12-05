import React from 'react';
import '../assets/css/footer.css';

const Footer = () =>{
    return(
        <footer className="footer">
        <div className="fila fila-primaria">
            <div className="columna acerca">
                <h3>Restaurante.DevHouse</h3>
                <p>
                    Nuestro restaurante en la ciudad de Ica se enorgullece de ofrecer productos frescos y de alta
                    calidad.
                    En DevHouse, vives una experiencia de compra única.
                </p>
            </div>
            <div className="columna enlaces">
                <h3>Enlaces Rápidos</h3>
                <ul class="lista-enlaces">
                    <li className="item-enlace"><a href="#faq">F.A.Q</a></li>
                    <li className="item-enlace"><a href="#cookies-politicas">Políticas de Cookies</a></li>
                    <li className="item-enlace"><a href="#cookies-politicas">Políticas de privacidad</a></li>
                    <li className="item-enlace"><a href="#terminos-servicios">Términos y Condiciones</a></li>
                    <li className="item-enlace"><a href="#soporte">Libro de reclamaciones</a></li>
                </ul>
            </div>
            <div className="columna suscribirse">
                <h3>Suscríbete para conocer novedades</h3>
                <div>
                    <input type="email" placeholder="Escribe tu email aquí :)" />
                    <button>Suscribirse</button>
                </div>
                <div className="redes-sociales">
                    <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer"><i
                            className="fa-brands fa-facebook"></i></a>
                    <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer"><i
                            className="fa-brands fa-instagram"></i></a>
                    <a href="https://www.tiktok.com" target="_blank" rel="noopener noreferrer"><i
                            className="fa-brands fa-tiktok"></i></a>
                </div>
            </div>
        </div>
        <div className="fila fila-secundaria">
            <div>
                <p><i className="fas fa-phone-alt"></i></p>
                <p>+51 967477214</p>
            </div>
            <div>
                <p><i className="fas fa-envelope"></i></p>
                <p>hola@DevHouse</p>
            </div>
            <div>
                <p><i className="fas fa-map-marker-alt"></i></p>
                <p>Av.Nicolas de Rivera
                    El viejo 660, Ica, Peru 110101
                </p>
            </div>
        </div>
        <div className="fila fila-derechos">
            <p>Copyright &copy; 2024 Integrador | UTP</p>
        </div>
    </footer>
    );
};

export default Footer