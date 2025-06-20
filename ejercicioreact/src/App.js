import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Card, Alert } from 'react-bootstrap';


function App() {
 
  const [coefficients, setCoefficients] = useState({ a: '', b: '', c: '' });
  
  
  const [results, setResults] = useState(null);
  
  
  const [alert, setAlert] = useState({ show: false, message: '', variant: 'danger' });

  
  const handleChange = (e) => {
    const { name, value } = e.target;
  
    if (/^-?\d*\.?\d*$/.test(value)) {
      setCoefficients(prevCoefficients => ({
        ...prevCoefficients,
        [name]: value
      }));
    }
  };


  const handleCalculate = (e) => {
    e.preventDefault(); 

    
    setResults(null);
    setAlert({ show: false, message: '', variant: 'danger' });

 
    const { a, b, c } = coefficients;

   
    if (a === '' || b === '' || c === '') {
      setAlert({ show: true, message: 'Por favor, ingrese todos los coeficientes (a, b y c).', variant: 'danger' });
      return;
    }

    const numA = parseFloat(a);
    const numB = parseFloat(b);
    const numC = parseFloat(c);

   
    if (numA === 0) {
      setAlert({ show: true, message: 'El coeficiente "a" no puede ser cero en una ecuación cuadrática.', variant: 'danger' });
      return;
    }

   
    const discriminant = (numB * numB) - (4 * numA * numC);

    let calculatedResults = {};

    if (discriminant > 0) {
   
      const x1 = (-numB + Math.sqrt(discriminant)) / (2 * numA);
      const x2 = (-numB - Math.sqrt(discriminant)) / (2 * numA);
      calculatedResults = { x1: x1.toFixed(4), x2: x2.toFixed(4), message: 'Se encontraron dos raíces reales y distintas.' };
    } else if (discriminant === 0) {
     
      const x1 = -numB / (2 * numA);
      calculatedResults = { x1: x1.toFixed(4), x2: x1.toFixed(4), message: 'Se encontraron dos raíces reales e iguales.' };
    } else {
      
      const realPart = (-numB / (2 * numA)).toFixed(4);
      const imaginaryPart = (Math.sqrt(-discriminant) / (2 * numA)).toFixed(4);
      calculatedResults = {
        x1: `${realPart} + ${imaginaryPart}i`,
        x2: `${realPart} - ${imaginaryPart}i`,
        message: 'Las raíces son complejas (no tienen solución en los números reales).'
      };
    }
    
    
    setResults(calculatedResults);
    setAlert({ show: true, message: 'Cálculo realizado exitosamente.', variant: 'success' });
  };
  

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={8} lg={6}>
          <Card className="shadow-lg">
            <Card.Header as="h4" className="text-center bg-dark text-white">
              Calculadora de Fórmula Cuadrática
            </Card.Header>
            <Card.Body>
              <div className="text-center mb-4">
                <p className="lead">Ingrese los coeficientes de la ecuación:</p>
                <h3 className="font-weight-bold">
                  <span className="text-primary">{coefficients.a || 'a'}</span>x² + 
                  <span className="text-success"> {coefficients.b || 'b'}</span>x + 
                  <span className="text-info"> {coefficients.c || 'c'}</span> = 0
                </h3>
              </div>
              
             
              {alert.show && (
                <Alert variant={alert.variant} onClose={() => setAlert({ show: false })} dismissible>
                  {alert.message}
                </Alert>
              )}

              
              <Form onSubmit={handleCalculate}>
                <Form.Group as={Row} className="mb-3" controlId="formA">
                  <Form.Label column sm={2}>Coeficiente 'a'</Form.Label>
                  <Col sm={10}>
                    <Form.Control 
                      type="text" 
                      name="a"
                      value={coefficients.a}
                      onChange={handleChange}
                      placeholder="Ej: 1"
                      autoComplete="off"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formB">
                  <Form.Label column sm={2}>Coeficiente 'b'</Form.Label>
                  <Col sm={10}>
                    <Form.Control 
                      type="text" 
                      name="b"
                      value={coefficients.b}
                      onChange={handleChange}
                      placeholder="Ej: -5"
                      autoComplete="off"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formC">
                  <Form.Label column sm={2}>Coeficiente 'c'</Form.Label>
                  <Col sm={10}>
                    <Form.Control 
                      type="text" 
                      name="c"
                      value={coefficients.c}
                      onChange={handleChange}
                      placeholder="Ej: 6"
                      autoComplete="off"
                    />
                  </Col>
                </Form.Group>
                
                <div className="d-grid gap-2">
                  <Button variant="primary" type="submit" size="lg">
                    Calcular Raíces
                  </Button>
                </div>
              </Form>

              {/* Sección para mostrar los resultados */}
              {results && (
                <Card className="mt-4 bg-light">
                  <Card.Body>
                    <Card.Title className="text-center">Resultados</Card.Title>
                    <hr/>
                    <p className="text-center">{results.message}</p>
                    <h4 className="text-center text-success">x₁ = {results.x1}</h4>
                    <h4 className="text-center text-info">x₂ = {results.x2}</h4>
                  </Card.Body>
                </Card>
              )}
            </Card.Body>
            <Card.Footer className="text-muted text-center">
              Desarrollado para EjercicioReact
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default App;