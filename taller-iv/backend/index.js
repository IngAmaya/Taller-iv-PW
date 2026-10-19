import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 5000;

// Habilitar CORS y parseo de JSON
app.use(cors());
app.use(express.json());

// Endpoint 1: api/health
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'El API está funcionando correctamente.'
  });
});

// Endpoint 2: api/info
app.get('/api/info', (req, res) => {
  res.json({
    status: 'OK',
    message: 'API activa y respondiendo.',
    integrantes: [
      {
        nombre: 'Pablo Andrés Amaya Tenorio',
        edad: 19,
        carrera: 'Ingeniería Informática',
        materiasAprobadas: 20
      },
      {
        nombre: 'Elias Fernando Rivera Martínez', 
        edad: 20,
        carrera: 'Ingeniería Informática', 
        materiasAprobadas: 20 
      }
    ]
  });
});

app.listen(PORT, () => {
  console.log(`Servidor Express corriendo en http://localhost:${PORT}`);
});