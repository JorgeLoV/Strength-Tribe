import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import "./Parques.css";



function Parques () {
    
    const [parques, setParques] = useState([]);

    useEffect(() => {
      // Fetch data from the backend
      fetch('http://localhost:3000/parques')
        .then((response) => response.json())
        .then((data) => setParques(data))
        .catch((error) => console.error('Error al obtener parques', error));
    }, []);
      
    
      return (
        <div className="modal-content">
            <MapContainer center={[40.416775, -3.703790]} zoom={12} style={{ height: '450px', width: '100%' }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
                />
                {parques.map((parque) => (
                    <Marker key={parque.id} position={[parque.latitud, parque.longitud]}>
                    <Popup>
                        <strong>{parque.nombre}</strong><br />
                        {parque.descripcion}
                    </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
      );
    }
    
    export default Parques;