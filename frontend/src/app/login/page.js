"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Form, Button, Stack } from "react-bootstrap";

export default function Login() {
    //const [codigo, setCodigo] = useState('');
    //const [contrasenia, setContrasenia] = useState('');
    return (
        <Container
            fluid
            className="vh-100 d-flex justify-content-center align-items-center bg-primary"
        >
            <Row className="p-5 rounded bg-white">
                <Row>
                    <Col>
                        <h1 className="text-center">Iniciar sesion</h1>
                    </Col>
                </Row>
                <Row>
                    <Col>
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
                        <Stack className="col-md-9 mx-auto">
                            <Button variant="primary" type="submit">
                                Iniciar sesion
                            </Button>
                        </Stack>
                    </Form>
                </Col>
                </Row>
                
            </Row>
        </Container>
    );
}
