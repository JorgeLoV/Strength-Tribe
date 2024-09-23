import React, {useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import Playground from "./Playground";
import "./Ranking.css"
import Ejercicios from "./Ejercicios";


function Ranking() {
    const [rankings, setRankings] = useState({});
    const [showFriends, setShowFriends] = useState(false); // Estado para controlar la vista de rankings de amigos o general

    const userId = localStorage.getItem('userId'); // Obtener el userId del localStorage
    console.log('userId:', userId); //Comprueba que se pase bien el user logeado
    const nombreUsuario = localStorage.getItem('nombreUsuario');
    const navigate = useNavigate();

    // Verificar si el userId está disponible
    useEffect(() => {
        if (!userId) {
            console.error('No se encontró el userId, por favor inicia sesión nuevamente');
            navigate('/playground'); // Redirigir al login si no hay userId
        }
    }, [userId, navigate]);

    // Función para obtener los rankings
    const fetchRankings = async () => {

        if (!userId) {
            console.error('No se encontró el userId, por favor incia sesión nuevamente');
            navigate('/playground');
            return;
        }

        try {
            const url = showFriends 
                ? `http://localhost:3000/rankings/friends/${userId}` 
                : `http://localhost:3000/rankings/general`;
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            console.log('Datos obtenidos desde el backend: ', data);
            setRankings(data);
        } catch (error) {
            console.error('Error al obtener los rankings', error);
        }
    };

    // Se ejecuta cuando se monta o cambia el estado showFriends
    useEffect(() => {
        console.log('Rankings:', rankings)
        fetchRankings();
    }, [showFriends]); // Se ejecuta otra vez cuando showFriends cambia

    // Función para manejar el logout
    const handleLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('nombreUsuario');
        localStorage.removeItem('userId');
        navigate('/playground');
    };

    // Función para cambiar entre rankings
    const toggleRankings = () => {
        setShowFriends(!showFriends); // Cambia el estado de showFriends
    };

    return (
        <div className="body-rank">
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
                        <img src="src/assets/images/Logo logout.svg" alt="logout" />
                    </button>
                </div>
            </div>
            
            <div className="rank-container">
                <button className="toggle-button" onClick={toggleRankings}>
                    {showFriends ? 'Rankings General' : 'Ranking de Amigos'}
                </button>
                {Object.keys(rankings).length > 0 ? (
                    Object.keys(rankings).map((ejercicio, index) => (
                        <div className="bloque-ranking" key={index}>
                            <div className="nombre-ranking">
                                <h2>{ejercicio}</h2>
                            </div>
                            <div className="listado">
                                <ol>
                                    {Array.isArray(rankings[ejercicio]) && rankings[ejercicio].slice(0, 5).map((usuario, idx) => (
                                        <li key={idx}>{usuario.usuario} - {usuario.repeticiones} Reps</li>
                                    ))}
                                </ol>
                            </div>
                        </div>
                    ))
                ) : (
                    <p style={{ color: 'white'}}>No hay rankings disponibles.</p>
                )}
            </div>
        </div>
    );
}

export default Ranking;