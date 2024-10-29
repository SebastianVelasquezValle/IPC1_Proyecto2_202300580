"use client";
import React, { useEffect, useState } from "react";
import axiosInstance, {
    handleAxiosError,
    handleAxiosMsg,
} from "@/helpers/axiosConfig";
import "bootstrap/dist/css/bootstrap.min.css";
import {
    Container,
    Row,
    Col,
    Form,
    Button,
    Stack,
    Modal,
    InputGroup,
    Dropdown,
    DropdownButton,
} from "react-bootstrap";

export default function Reporte({ params }) {
    const codprofe = React.use(params).codprofe;
    const [cursos, setCursos] = useState({ nodes: [] });
    const loadCursos = async () => {
        try {
            //const response = await axiosInstance.get("/teacher/home/ECYSP-001");
            const response = await axiosInstance.get(
                `/teacher/home/${codprofe}`
            );
            //console.log(response.data);
            setCursos({ nodes: response.data });
        } catch (error) {
            handleAxiosError(error);
        }
    };

    useEffect(() => {
        loadCursos();
    }, [codprofe]);

    return (
        <Container>
            <Row>
                <Col>
                    <h1>Reportes</h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <DropdownButton
                        id="dropdown-basic-button"
                        title="Seleccionar Curso"
                    >
                        {cursos.nodes.map((curso) => (
                            <Dropdown.Item key={curso.codigo} onClick={() => {
                                console.log(curso.codigo);
                                // router.push(`/teacher/${codprofe}/${curso.codigo}`);
                            }}>
                                {curso.nombre}
                            </Dropdown.Item>
                        ))}
                        {/* {cursos.nodes.map((curso) => (
                            <Row key={curso.codigo}>
                                <Col className="mb-2">
                                    <Card
                                        bg={"Secondary".toLowerCase()}
                                        key={curso.codigo}
                                        className="text-center"
                                        data-bs-theme="dark"
                                    >
                                        <Card.Header>
                                            Codigo: {curso.codigo}
                                        </Card.Header>
                                        <Card.Body>
                                            <Card.Title>
                                                {curso.nombre}
                                            </Card.Title>
                                            <Card.Text>
                                                {curso.alumnos} alumnos
                                                inscritos
                                            </Card.Text>
                                            <Button
                                                variant="primary"
                                                onClick={() => {
                                                    console.log(curso.codigo);
                                                    router.push(
                                                        `/teacher/${codprofe}/${curso.codigo}`
                                                    );
                                                }}
                                            >
                                                Ver
                                            </Button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        ))} */}
                    </DropdownButton>
                </Col>
            </Row>
            <br />
            <Row>
                <Col>
                    <Row>
                        <Col>
                            <h1>Top 5 de mejor rendimiento</h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <h2>Grafica#</h2>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <br />
            <Row>
                <Col>
                    <Row>
                        <Col>
                            <h1>Top 5 de peor rendimiento</h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <h2>Grafica#</h2>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}
