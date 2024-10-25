"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

export default function Login() {
    //const [codigo, setCodigo] = useState('');
    //const [contrasenia, setContrasenia] = useState('');
    return (
        <Container className="justify-content-center align-items-center" >
            <Row className="d-flex justify-content-md-center" >
                <Col xs={6} md={4}>
                    <Form>
                        <Form.Group
                            className="mb-3"
                            controlId="formBasicUsername"
                        >
                            <Form.Label>Número de Carnet/Codigo</Form.Label>
                            <Form.Control
                                type="text"
                                name="codigo"
                                placeholder="Ingrese su codigo"
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="formBasicPassword"
                        >
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control
                                type="password"
                                name="contrasenia"
                                placeholder="Ingrese su contraseña"
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Iniciar sesion
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}
