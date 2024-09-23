import React, { useState } from "react"
import { Link, useNavigate } from 'react-router-dom';
import Playground from "./Playground";  
import "./NuevoReto.css";

function NuevoReto() {

    const [ejercicio, setEjercicio] = useState('');
    const [repeticiones, setRepeticiones] = useState('');
    const [tiempo, setTiempo] = useState('');
    const [detalles, setDetalles] = useState('');


    const nombreUsuario = localStorage.getItem('nombreUsuario');
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('authToken'); // Borra  token de autenticación
        localStorage.removeItem('nombreUsuario'); // Borra nombre de user
        navigate('/playground');    // Lleva de vuelta a Playground
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const retoData = {
            usuario: nombreUsuario,
            ejercicio,
            repeticiones,
            tiempo,
            detalles
        };

        try {
            const response = await fetch('http://localhost:3000/nuevoreto', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(retoData)
            });

            if (response.ok) { // Hace el reseteo de los campos del form
                alert('¡Reto lanzado!');
                setEjercicio('');
                setRepeticiones('');
                setTiempo('');
                setDetalles('');
            } else {
                console.error('Error al lanzar el reto');
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
        }
    };

    return(
        <div className="body-nuevo">
            <div className="bloque-logout">
            <div className="boton-atras">
                    <Link to='/seleccion'>
                        <img src="src\assets\images\back-icon.png"/>
                    </Link>
                </div>
                <div>
                    <h3 className="texto-logout">{nombreUsuario ? `${nombreUsuario}` : 'Usuario desconocido'}</h3>
                </div>
                <div>
                    <button className="logout" onClick={handleLogout}>
                            <img src="src\assets\images\Logo logout.svg" alt="logout"/>
                    </button>
                </div>
            </div>
            <h2>“La persistencia puede cambiar el fracaso en un logro extraordinario”</h2>
            <form onSubmit={handleSubmit}>
                <div className="input-container">
                    <div className="selector">
                        <span>Ejercicio</span>
                        <select value={ejercicio} onChange={(e) => setEjercicio(e.target.value)}>
                            <option value="">Seleccionar ejercicio</option>
                            <option value="flexiones">Flexión</option>
                            <option value="pullups">Pull-up</option>
                            <option value="muscleups">Muscle-up</option>
                            <option value="fondos">Fondo</option>
                            <option value="sentadillas">Sentadilla</option>
                            <option value="zancadas">Zancada</option>
                        </select>
                    </div>
                    <div className="repeticiones-container">
                        <span>Repeticiones</span>
                        <input type="text" value={repeticiones} onChange={(e) => setRepeticiones(e.target.value)} required/>
                    </div>
                    <div className="tiempo-container">
                        <span>Tiempo</span>
                        <input type="text" value={tiempo} onChange={(e) => setTiempo(e.target.value)}/>
                    </div>
                    <div className="detalles-container">
                        <span>Detalles</span>
                        <textarea value={detalles} onChange={(e) => setDetalles(e.target.value)}></textarea>
                    </div>
                </div>
                <div>
                    <button className="boton-reto" type="submit">
                        Lanzar
                    </button>
                </div>
        </form>
        </div>
    )
}

export default NuevoReto;