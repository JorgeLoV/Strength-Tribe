import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import "./Playground.css";


function Registro () {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [usuario, setUsuario] = useState('');
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/registro', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nombre, apellido, usuario, mail, password })
            });

            if (response.ok) {
                navigate('/playground');
            } else {
                console.error('Error al registrarse');
            }
        } catch (error) {
            console.error('Error en el proceso de registro', error);
        }
    }

    return (
        <div className="body-play">

            <div className="big-container">
                <div className="login-container">
                    <form onSubmit={handleSubmit}>
                        <div>
                            <input className='login-input'
                                type="text"
                                id="nombre"
                                placeholder="Nombre"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <input className='login-input'
                                type="text"
                                id="apellido"
                                placeholder="Apellido"
                                value={apellido}
                                onChange={(e) => setApellido(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <input className='login-input'
                                type="text"
                                id="usuario"
                                placeholder="Usuario"
                                value={usuario}
                                onChange={(e) => setUsuario(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <input className='login-input'
                                type="mail"
                                id="mail"
                                placeholder="Mail"
                                value={mail}
                                onChange={(e) => setMail(e.target.value)}
                                required
                            />
                        </div>
                        <div className='password-container'>
                            <input className='login-input'
                                type="password"
                                id="password"
                                placeholder="Contraseña"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="ojo">
                        </div>
                        <button type="submit" className='login-submit'>
                            Unirse
                        </button>
                    </form>
                </div>
            </div>
        </div>

    )
}

export default Registro