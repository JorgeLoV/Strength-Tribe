import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import Home from "./Home";
import Ejercicios from "./Ejercicios";
import Rutinas from "./Rutinas";
import Seleccion from "./Seleccion";
import Registro from "./Registro";
import "./Playground.css";


function Playground () {
    const [usuario, setUsuario] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();


    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
          navigate('/seleccion');
        }
      }, [navigate]);
      
      const handleUsuarioChange = (e) => {
        setUsuario(e.target.value);
      };
    
      const handlePasswordChange = (e) => {
        setPassword(e.target.value);
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!usuario || !password) {
          setError('Por favor introduce unos datos correctos');
          return;
        }
    
        try {
          const response = await fetch('http://localhost:3000/playground', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ usuario, password })
          });
          const data = await response.json();
          
          if (response.ok) {
            localStorage.setItem('authToken', data.token);
            localStorage.setItem('nombreUsuario', data.nombreUsuario);
            localStorage.setItem('userId', data.userId);
            navigate('/seleccion');
          } else {
            setError(data.error || 'Introduce un usuario y contraseña validos');
          }
        } catch (error) {
          setError('Error en la conexión con el servidor');
        }
    };

    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="body-play">
            <div className="header">
            <div className="menu-icon" onClick={toggleMenu}>
                    <div className={`bar ${isOpen ? 'open' : ''}`}></div>
                    <div className={`bar ${isOpen ? 'open' : ''}`}></div>
                    <div className={`bar ${isOpen ? 'open' : ''}`}></div>
                </div>
                <div className={`links ${isOpen ? 'active' : ''}`}>
                <Link to="/">Home</Link>
                <Link to="/ejercicios">Ejercicios</Link>
                <Link to="/rutinas">Rutinas</Link>
                </div>
            </div>
            <div className="big-container">
                <div className="login-container">
                    <h1 className="reto">¿Preparado para jugar?</h1>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <input className='login-input'
                                type="text"
                                id="email"
                                placeholder="Usuario"
                                value={usuario}
                                onChange={handleUsuarioChange}
                                required
                            />
                        </div>
                        <div className='password-container'>
                            <input className='login-input'
                                type="password"
                                id="contrasena"
                                placeholder="Contraseña"
                                value={password}
                                onChange={handlePasswordChange}
                                required
                            />
                        </div>
                        <div className="ojo">
                        </div>
                        <button type="submit" className='login-submit'>
                            Entrar
                        </button>
                    </form>
                    <div className="registro">
                      <Link to='/registro'>¿Acabas de llegar? Únete</Link>
                    </div>
                    {error && <h3 style={{ color: 'red'}}>{error}</h3>}
                </div>
            </div>


        </div>

    )
}

export default Playground