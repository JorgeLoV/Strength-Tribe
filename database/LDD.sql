CREATE SCHEMA strength_tribe;

CREATE TABLE usuarios (
    usuario VARCHAR(30) PRIMARY KEY NOT NULL,
    nombre VARCHAR(10) NOT NULL,
    apellido VARCHAR(15) NOT NULL,
    mail VARCHAR(40) NOT NULL,
    password VARCHAR(100)
);

CREATE TABLE cuenta (
    usuario VARCHAR(30) NOT NULL,
    ejercicio VARCHAR(10) ENUM('flexiones', 'pullups', 'muscleups', 'fondos', 'sentadillas', 'zancadas') NOT NULL,
    repeticiones INT NOT NULL,
    tiempo TIME,
    detalles VARCHAR(80),
    PRIMARY KEY (usuario, ejercicio),
    FOREIGN KEY (usuario) REFERENCES usuarios(usuario)
    );

CREATE TABLE friends (
    user_usuario VARCHAR(255) NOT NULL,
    friend_usuario VARCHAR(255) NOT NULL,
    status ENUM('accepted') NOT NULL DEFAULT 'accepted',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_usuario, friend_usuario),
    FOREIGN KEY (user_usuario) REFERENCES cuenta(usuario),
    FOREIGN KEY (friend_usuario) REFERENCES cuenta(usuario)
);


CREATE TABLE parques (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(255),
  ubicacion VARCHAR(255),
  latitud DECIMAL(9,6),
  longitud DECIMAL(9,6)
);