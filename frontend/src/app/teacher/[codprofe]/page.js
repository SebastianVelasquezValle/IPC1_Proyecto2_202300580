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
    Image,
    Card,
} from "react-bootstrap";
import { CompactTable } from "@table-library/react-table-library/compact";
import { useRouter } from "next/navigation";

export default function Profesor({ params }) {
    const router = useRouter();

    const COLUMNS3 = [
        { label: "Código ", renderCell: (item) => item.codigo },
        { label: "Curso", renderCell: (item) => item.nombre },
        { label: "Alumnos", renderCell: (item) => item.alumnos },
        {
            label: "Acciones",
            renderCell: (item) => {
                return (
                    <>
                        <Button
                            variant="outline-warning"
                            size="sm"
                            className="me-2"
                            //onClick={() => mostrarCurso(item)} // item es la tarea
                        >
                            <Image
                                aria-hidden
                                src="/pencil.svg"
                                alt="pen"
                                width={18}
                                height={18}
                            />
                        </Button>
                    </>
                );
            },
        },
    ];

    const [cursos, setCursos] = useState({ nodes: [] });

    const codprofe = React.use(params).codprofe; // Nos sirve para desempaquetar el objeto params - esta es una forma de hacerlo

    const loadCursos = async () => {
        try {
            //const response = await axiosInstance.get("/teacher/home/ECYSP-001");
            const response = await axiosInstance.get(
                `/teacher/home/${codprofe}`
            );
            console.log(response.data);
            setCursos({ nodes: response.data });
        } catch (error) {
            handleAxiosError(error);
        }
    };

    useEffect(() => {
        loadCursos();
    }, [codprofe]); // Se vuelve ejecuta cada vez que cambia el valor de codprofe

    return (
        <Container>
            <Row>
                <Col>
                    <br />
                    {/* style={{ color: "white" }} ese estilo tenia */}
                    <h1>Mis cursos Impartidos</h1>
                </Col>
            </Row>
            <br />
            {cursos.nodes.map((curso) => (
                <Row key={curso.codigo}>
                    <Col className="mb-2">
                        <Card
                            bg={"Secondary".toLowerCase()}
                            key={curso.codigo}
                            className="text-center"
                            data-bs-theme="dark"
                        >
                            <Card.Header>Codigo: {curso.codigo}</Card.Header>
                            <Card.Body>
                                <Card.Title>{curso.nombre}</Card.Title>
                                <Card.Text>
                                    {curso.alumnos} alumnos inscritos
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
            ))}
        </Container>
    );
}
