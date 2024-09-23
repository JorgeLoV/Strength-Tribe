import React from "react";
import { Link } from 'react-router-dom';
import Ejercicios from "./Ejercicios";
import Rutinas from "./Rutinas";
import Playgroung from "./Playground";
import "./Home.css";


function Home () {


    return (
        <div className="body-home">
            <div className="home-video">
                <video src="\src\assets\images\video-home.mp4" autoPlay loop muted></video>
            </div>
            <div className="overlay"></div>
            <div className="quote">
                <h1>“Who knows what you might learn from taking a chance? <br/>
                    Everyone carries a piece of the puzzle; <br/>trust your instincts, do the unexpected.”
                </h1>
                <h2>Timothy Leary</h2>
            </div>
            <div className="menu">
                <span className="link">
                    <Link to="/ejercicios">Ejercicios</Link>
                </span>
                <span className="link">
                    <Link to="/rutinas">Rutinas</Link>
                </span>
                <span className="link">
                    <Link to="/playground">Playground</Link>
                </span>
            </div>

        </div>
    )
}

export default Home;