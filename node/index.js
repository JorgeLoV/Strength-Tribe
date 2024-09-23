const express = require('express');
const cors = require('cors');
const db = require('./db');
const bcryptjs = require('bcryptjs');
const connection = require('./db');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: '587',
  secure: false,
  auth: {
    user: 'abner9@ethereal.email',
    pass: 'tY4nwZbmXjvmb7RzHZ'
  },
});

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//Endpoint para login
app.post('/playground', (req, res) => {
  const { usuario, password } = req.body;
  const query = 'SELECT * FROM usuarios WHERE usuario = ?';

  connection.query(query, [usuario], (err, results) => {
    if (err){
      console.error('Error ejecutando query:', err);
      res.status(500).json({ error: 'Error del servidor' });
      return;
    }

    if (results.length > 0) {
      const user = results[0];
      bcryptjs.compare(password, user.password, (compareErr, isMatch) => {
        if (compareErr) {
          console.error('Error comparando passwords:', compareErr);
          res.status(500).json({ error: 'Error del servidor' });
          return;
    }
    if (isMatch) {
      res.status(200).json({
        success: true,
        message: 'Login correcto',
        nombreUsuario: user.usuario,
        userId: user.id
      });
    } else {
      res.status(401).json({ error: 'Usuario o password incorrectos' });
    }
  });
} else {
  res.status(401).json({ error: 'Usuario o password incorrectos' });
}
  });
});


// Endpoint para la muestra de datos en Rankings

// Endpoint ranking general
app.get('/rankings/general', (req, res) => {
  const query = `
    SELECT usuario, ejercicio, repeticiones
    FROM cuenta
    ORDER BY repeticiones DESC
  `;

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error al obtener la información', err);
      res.status(500).json({ error: 'Error del servidor' });
      return;
    }

    // Agrupar resultados por ejercicio
    const rankings = results.reduce((acc, row) => {
      if (!acc[row.ejercicio]) {
        acc[row.ejercicio] = [];
      }
      acc[row.ejercicio].push({
        usuario: row.usuario,
        repeticiones: row.repeticiones
      });
      return acc;
    }, {});

    res.json(rankings);
  });
});


// Endpoint ranking de amigos
app.get('/rankings/friends/:userId', (req, res) => {
  const userId = req.params.userId;

  const query = `
    SELECT c.usuario, c.ejercicio, c.repeticiones
    FROM cuenta c
    JOIN friends f ON f.friend_usuario = c.usuario
    WHERE f.user_usuario = ? AND f.status = 'accepted'
    ORDER BY c.repeticiones DESC;
  `;

  connection.query(query, [userId], (err, results) => {
    if (err) {
      console.error('Error al obtener el ranking de amigos', err);
      res.status(500).json({ error: 'Error del servidor al obtener el ranking de amigos' });
      return;
    }

    console.log('Resultados de la consulta:', results);

    // Agrupar resultados por ejercicio
    const rankings = results.reduce((acc, row) => {
      if (!acc[row.ejercicio]) {
        acc[row.ejercicio] = [];
      }
      acc[row.ejercicio].push({
        usuario: row.usuario,
        repeticiones: row.repeticiones
      });
      return acc;
    }, {});

    console.log('Rankings agrupados:', rankings);
    res.json(rankings);
  });
});



// Endpoint para lanzar nuevos retos
app.post('/nuevoreto', (req, res) => {
  const { usuario, ejercicio, repeticiones, tiempo, detalles } = req.body;

  if (!usuario || !ejercicio || !repeticiones) {
    return res.status(400).json({ error: 'Faltan datos requeridos' });
  }

  // Inserción de datos en la tabla de cuenta
  const query = 'INSERT INTO cuenta (usuario, ejercicio, repeticiones, tiempo, detalles) VALUES (?, ?, ?, ?, ?)';
  connection.query(query, [usuario, ejercicio, repeticiones, tiempo, detalles], async (err, result) => {
    if (err) {
      console.error('Error al insertar los datos en la base de datos', err);
      return res.status(500).json({ error: 'Error del servidor' });
    }

    try {
      // Obtener los amigos del usuario desde la tabla friends
      const friendQuery = `
        SELECT u.mail, u.nombre
        FROM friends f
        JOIN usuarios u ON u.usuario = f.friend_usuario
        WHERE f.user_usuario = ? 
        AND f.status = 'accepted'
      `;
      const friends = await new Promise((resolve, reject) => {
        connection.query(friendQuery, [usuario], (err, results) => {
          if (err) {
            return reject(err);
          }
          resolve(results);
        });
      });

      // Si el usuario tiene amigos, enviarles un correo electrónico
      if (friends.length > 0) {
        const mailPromises = friends.map((friend) => {
          const mailOptions = {
            from: 'abner9@ethereal.email',
            to: friend.mail,
            subject: '¡Has sido retado!',
            text: `Hola ${friend.nombre}, ${usuario} te ha lanzado un reto: ${ejercicio} - ${repeticiones} repeticiones.`,
            html: `<p>Hola <strong>${friend.nombre}</strong>,</p>
                   <p><strong>${usuario}</strong> te ha lanzado un reto:</p>
                   <p><strong>Ejercicio:</strong> ${ejercicio}</p>
                   <p><strong>Repeticiones:</strong> ${repeticiones}</p>`,
          };

          return transporter.sendMail(mailOptions);
        });

        // Esperar a que se envíen todos los correos electrónicos
        await Promise.all(mailPromises);
      }

      res.status(200).json({ message: 'Reto lanzado y correos enviados a los amigos' });
    } catch (error) {
      console.error('Error al enviar los correos a los amigos:', error);
      res.status(500).json({ error: 'Error al notificar a los amigos' });
    }
  });
});


// Endpoint para registro de nuevos usuarios
app.post('/registro', async (req, res) => {
  const { nombre, apellido, usuario, mail, password,  } = req.body;

  if (!nombre || !apellido || !usuario || !mail || !password) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios'});
  }

  try {
    const hashedPassword = await bcryptjs.hash(password, 9);

    //query base de datos
    const query= 'INSERT INTO usuarios (nombre, apellido, usuario, mail, password) VALUES (?, ?, ?, ?, ?)';

    //Ejecutar consulta con valores dados
    connection.query(query, [nombre, apellido, usuario, mail, hashedPassword], (err, result) => {
      if (err) {
        console.error('Error al registrar el usuario:', err);
        return res.status(500).json({ error: 'Error del servidor.' });
      }

    // Usuario registrado exitosamente
        res.status(201).json({ message: 'Usuario registrado exitosamente.' });
    });
  
  } catch (error) {
    console.error('Error en el proceso de registro', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }

});


// Endpoint para agregar amigos
app.post('/friends/add', async (req, res) => {
  console.log('Datos recibidos en el body:', req.body); // Verificar lo que llega al backend
  const { currentUser, friendUserName } = req.body;

  // Validación de entrada
  if (!currentUser || !friendUserName) {
    console.log("Datos incompletos: ", { currentUser, friendUserName });
    return res.status(400).json({ error: 'Datos incompletos' });
  }

  try {
    // Utiliza .promise() para que las consultas devuelvan promesas
    const [currentUserData] = await connection.promise().query('SELECT usuario FROM cuenta WHERE usuario = ?', [currentUser]);
    const [friendUserData] = await connection.promise().query('SELECT usuario FROM cuenta WHERE usuario = ?', [friendUserName]);

    if (!currentUserData.length || !friendUserData.length) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Inserta la amistad en la tabla friends
    await connection.promise().query('INSERT INTO friends (user_usuario, friend_usuario, status) VALUES (?, ?, ?)', 
      [currentUser, friendUserName, 'pending']
    );

    res.status(200).json({ message: 'Amigo agregado correctamente' });
  } catch (error) {
    console.error('Error al agregar amigo:', error);
    res.status(500).json({ error: 'Error al agregar amigo' });
  }
});


// Endpoint para el mapa de los parques
app.get('/parques', async (req, res) => {
  try {
    const query = 'SELECT * FROM parques';
    const [results] = await connection.promise().query(query);
    res.status(200).json(results);
  } catch (error) {
    console.error('Error al obtener los parques', error);
    res.status(500).json({ error: 'Error al obtener los parques' });
  }
});



// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
  });