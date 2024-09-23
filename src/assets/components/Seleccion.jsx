import React, { useState } from "react"
import { Link, useNavigate } from 'react-router-dom';
import "./Seleccion.css";
import Playground from "./Playground";
import Ranking from "./Ranking";
import NuevoReto from "./NuevoReto";

function Seleccion() {
    const nombreUsuario = localStorage.getItem('nombreUsuario');
    const navigate = useNavigate();
    const [friendUserName, setFriendUserName] = useState('');


    const handleLogout = () => {
        localStorage.removeItem('authToken'); // Borra  token de autenticación
        localStorage.removeItem('nombreUsuario'); // Borra nombre de user
        navigate('/playground');    // Lleva de vuelta a Playground
    };

    
    const handleAddFriend = async () => {

        if (!friendUserName) {
            alert('Debes ingresar el nombre de usuario de tu amnigo');
            return;
        }
        try {
            const response = await fetch('http://localhost:3000/friends/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    currentUser: nombreUsuario,
                    friendUserName: friendUserName,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.log("Error del backend:", errorData); // Muestra el error que viene del backend
                alert("Error: " + errorData.error);
            } else {
                alert("Amigo agregado correctamente");
            }
        } catch (error) {
            console.error("Error al agregar amigo:", error);
            alert("Error en la solicitud");
        }
    };


    return(
        <div>
            <div className="body-log">
                <div className="bloque-logout">
                    <div>
                        <h3 className="texto-logout">{nombreUsuario ? `${nombreUsuario}` : 'Usuario desconocido'}</h3>
                    </div>
                    <div>
                        <button className="logout" onClick={handleLogout}>
                            <Link to="/playground">
                                <img src="src\assets\images\Logo logout.svg" alt="logout"/>
                            </Link>
                        </button>
                    </div>
                </div>
                <div className="button-conatiner">
                    <button className="boton-eleccion">
                        <Link to='/ranking'>
                            <img src='src\assets\images\Corona.png' alt="ranking"></img>
                        </Link>
                        <h3 className="texto-responsive">Ranking</h3>
                    </button>
                    <button className="boton-eleccion">
                        <Link to='/nuevoreto'>
                            <img src='src\assets\images\Reto.png' alt="challenge"></img>
                        </Link>
                        <h3 className="texto-responsive">Lanzar reto</h3>
                    </button>
                </div>
                <div className="texto-botones">
                    <span>
                        <h2>Rankings</h2>
                    </span>
                    <span>
                        <h2>Lanzar un reto</h2>
                    </span>
                </div>
                <div className="agregar">
                    <h2 className="agregar-texto">Sigue a amigos a los que retar</h2>
                    <input className="agregar-input"
                    type="text"
                    placeholder="Usuario de tu amigo"
                    value={friendUserName}
                    onChange={(e) => setFriendUserName(e.target.value)}
                    />
                    <button onClick={handleAddFriend}>Agregar</button>
                </div>
            </div>
        </div>

    )
};

export default Seleccion;