import { useState, useEffect } from 'react';
import { Container, Card, CardHeader, CardBody, Table, Alert, Badge } from 'reactstrap';
import './App.css';

function App() {
  const [healthMessage, setHealthMessage] = useState('Cargando estado...');
  const [infoData, setInfoData] = useState([]);
  const [apiStatus, setApiStatus] = useState('');

  useEffect(() => {
    // Consumo de endpoint: api/health
    fetch('http://localhost:5000/api/health')
      .then((res) => res.json())
      .then((data) => setHealthMessage(data.message))
      .catch((err) => setHealthMessage('Error al conectar con /api/health: ' + err.message));

    // Consumo de endpoint: api/info
    fetch('http://localhost:5000/api/info')
      .then((res) => res.json())
      .then((data) => {
        setApiStatus(data.message);
        setInfoData(data.integrantes || []);
      })
      .catch((err) => console.error('Error al conectar con /api/info:', err));
  }, []);

  return (
    <Container className="my-5">
      {/* Requisito 3: Título Frontend */}
      <h1 className="text-center mb-4 text-primary">Taller IV</h1>

      {/* Requisito 4: Sección con h4, p, div, section y CSS */}
      <section className="health-container">
        <div>
          <h4 className="health-title">Estado del API</h4>
          <p className="health-text">{healthMessage}</p>
        </div>
      </section>

      {/* Requisito 5: Componentes de Reactstrap para api/info */}
      <Card className="shadow-sm mt-4">
        <CardHeader className="d-flex justify-content-between align-items-center bg-dark text-white">
          <span>Información del Equipo</span>
          {apiStatus && <Badge color="success">{apiStatus}</Badge>}
        </CardHeader>
        <CardBody>
          {infoData.length > 0 ? (
            <Table responsive striped hover bordered>
              <thead className="table-light">
                <tr>
                  <th>Nombre</th>
                  <th>Edad</th>
                  <th>Carrera</th>
                  <th>Materias Aprobadas</th>
                </tr>
              </thead>
              <tbody>
                {infoData.map((item, index) => (
                  <tr key={index}>
                    <td>{item.nombre}</td>
                    <td>{item.edad} años</td>
                    <td>{item.carrera}</td>
                    <td>{item.materiasAprobadas}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <Alert color="warning">Cargando datos de los integrantes...</Alert>
          )}
        </CardBody>
      </Card>
    </Container>
  );
}

export default App;