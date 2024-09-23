import React, { useState } from "react";
import { Link } from 'react-router-dom';
import Home from './Home';
import Ejercicios from "./Ejercicios";
import Playgroung from "./Playground";
import "./Rutinas.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Parques from "./Parques";

function Rutinas () {
    const [isOpenParques, setIsOpenParques] = useState(false);

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 2,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 1
                }
              },
              {
                breakpoint: 600,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1
                }
              }
        ]
    };

    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };


    return(
        <div className="body-rut">
            <div className="header">
                <div className="menu-icon" onClick={toggleMenu}>
                    <div className={`bar ${isOpen ? 'open' : ''}`}></div>
                    <div className={`bar ${isOpen ? 'open' : ''}`}></div>
                    <div className={`bar ${isOpen ? 'open' : ''}`}></div>
                </div>
                <div className={`links ${isOpen ? 'active' : ''}`}>
                    <Link to="/">Home</Link>
                    <Link to="/ejercicios">Ejercicios</Link>
                    <Link to="/playground">Playground</Link>
                </div>
            </div>
            <div className="texto-entrada">
                <span>
                    <h2 className="titular">La constancia es la una de las claves del éxito. Y para ser constante hay que seguir una rutina
                        divertida y desafiante que nos lleve, casi sin darse cuenta, hasta nuestros objetivos.
                    </h2>
               </span> 
                <span className="entradilla">
                    <h2>A continuación te proponemos las rutimas más efectivas y populares.</h2>
                </span>
            </div>
            <Slider {...settings}>
                <div className="card">
                    <div className="card-inner">
                        <div className="card-front">
                            <img src='src\assets\images\push-pull-legs.JPG' alt="ppl" />
                            <h3 className="titulo">Push Pull Legs</h3>
                        </div>
                        <div className="card-back">
                            <h3 className="titulo">Push Pull Legs</h3>
                            <p>Una rutina clásica de efecitividad probada.
                            Esta rutina consiste en dividir los días de ejercicios según los ejercicios, primero los que
                            ejercicios que implican tirón (flexiones y fondos). El segundo día se realizan los ejercicios de tracción
                            (pull-ups o ejercicios específicos para los bíceps). Y el tercero destinado únicamente a las piernas (sentadilla, zancadas).
                            Y puedes situar el día descanso entre los dos bloques de tres días o al final.</p>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="card-inner">
                        <div className="card-front">
                            <img src='src\assets\images\full-body.png' alt="full-body" />
                            <h3 className="titulo">Full Body</h3>
                        </div>
                        <div className="card-back">
                            <h3 className="titulo">Full Body</h3>
                            <p>Esta es la rutina perfecta para los más ocupados. En una sesión se trabaja el cuerpo completo.
                            Es una buena idea realizar aquellos ejercicios que trabajan varios grupos musculares a la vez.
                            Se puede realizar en días alternos, tres veces por semana.</p>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="card-inner">
                        <div className="card-front">
                            <img src='src\assets\images\hemisferica.jpg' alt="hemisferica" />
                            <h3 className="titulo">Hemisférica</h3>
                        </div>
                        <div className="card-back">
                            <h3 className="titulo">Hemisférica</h3>
                            <p>Con este tipo de rutina se hace una división entre el tren superior y el inferior. Es una opción menos exigente 
                            y más simple, más enfocada en la salud que en el rendimiento deportivo. 
                            Una idea de aplicación es un bloques de cuatro días, con uno de descanso entre medias.</p>
                        </div>
                    </div>
                </div>
            </Slider>
            <div>
                <button className="botón-modal" onClick={() => setIsOpenParques(true)}>
                    Encontrar parques
                </button>
                {isOpenParques && (
                <div className="modal">
                    <div className="modal-overlay"></div>
                    <div className="modal-body">
                        <button className="close-modal" onClick={() => setIsOpenParques(false)}>X</button>
                        <h2>Encuentra tu parque</h2>
                        <Parques />
                    </div>
                </div>
            )}
                
            </div>



            <div className="footer">
                <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="80" height="80" viewBox="0 0 50 50">
                        <path d="M 16 3 C 8.83 3 3 8.83 3 16 L 3 34 C 3 41.17 8.83 47 16 47 L 34 47 C 41.17 47 47 41.17 47 34 L 47 16 C 47 8.83 41.17 3 34 3 L 16 3 z M 37 11 C 38.1 11 39 11.9 39 13 C 39 14.1 38.1 15 37 15 C 35.9 15 35 14.1 35 13 C 35 11.9 35.9 11 37 11 z M 25 14 C 31.07 14 36 18.93 36 25 C 36 31.07 31.07 36 25 36 C 18.93 36 14 31.07 14 25 C 14 18.93 18.93 14 25 14 z M 25 16 C 20.04 16 16 20.04 16 25 C 16 29.96 20.04 34 25 34 C 29.96 34 34 29.96 34 25 C 34 20.04 29.96 16 25 16 z"></path>
                    </svg>
                </a>
                <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer">
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="80" height="80" viewBox="0 0 30 30">
                        <path d="M 15 4 C 10.814 4 5.3808594 5.0488281 5.3808594 5.0488281 L 5.3671875 5.0644531 C 3.4606632 5.3693645 2 7.0076245 2 9 L 2 15 L 2 15.001953 L 2 21 L 2 21.001953 A 4 4 0 0 0 5.3769531 24.945312 L 5.3808594 24.951172 C 5.3808594 24.951172 10.814 26.001953 15 26.001953 C 19.186 26.001953 24.619141 24.951172 24.619141 24.951172 L 24.621094 24.949219 A 4 4 0 0 0 28 21.001953 L 28 21 L 28 15.001953 L 28 15 L 28 9 A 4 4 0 0 0 24.623047 5.0546875 L 24.619141 5.0488281 C 24.619141 5.0488281 19.186 4 15 4 z M 12 10.398438 L 20 15 L 12 19.601562 L 12 10.398438 z"></path>
                    </svg>
                </a>
                <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="80" height="80" viewBox="0 0 50 50">
                        <path d="M 11 4 C 7.134 4 4 7.134 4 11 L 4 39 C 4 42.866 7.134 46 11 46 L 39 46 C 42.866 46 46 42.866 46 39 L 46 11 C 46 7.134 42.866 4 39 4 L 11 4 z M 13.085938 13 L 21.023438 13 L 26.660156 21.009766 L 33.5 13 L 36 13 L 27.789062 22.613281 L 37.914062 37 L 29.978516 37 L 23.4375 27.707031 L 15.5 37 L 13 37 L 22.308594 26.103516 L 13.085938 13 z M 16.914062 15 L 31.021484 35 L 34.085938 35 L 19.978516 15 L 16.914062 15 z"></path>
                    </svg>
                </a>
            </div>
        </div>
    )
}

export default Rutinas;