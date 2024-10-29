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
//import { CompactTable } from "@table-library/react-table-library/compact";
import { useRouter } from "next/navigation";

export default function Student({ params }) {
    const router = useRouter();
    const [cursos, setCursos] = useState({ nodes: [] });
    const codstudent = React.use(params).codstudent;

    const loadCursos = async () => {
        try {
            const response = await axiosInstance.get(
                `/student/home/${codstudent}`
            );
            console.log(response.data);
            setCursos({ nodes: response.data });
        } catch (error) {
            handleAxiosError(error);
        }
    };

    useEffect(() => {
        loadCursos();
    }, [codstudent]);

    return (
        <Container>
            {/* <h2>Usuario: {codstudent}</h2> */}
            <Row>
                <Col>
                    <h1>Mis cursos</h1>
                </Col>
            </Row>
            <br />
            {cursos.nodes.map((curso) => (
                <Row key={curso.curso}>
                    <Col className="mb-2">
                        <Card
                            bg={"Secondary".toLowerCase()}
                            key={curso.curso}
                            className="text-center"
                            data-bs-theme="dark"
                        >
                            <Card.Header>Codigo: {curso.curso}</Card.Header>
                            <Card.Body>
                                <Card.Title>{curso.CursoNombre}</Card.Title>
                                <Card.Text>Profesor: {curso.profesor}</Card.Text>
                                <Button
                                    variant="primary"
                                    onClick={() => {
                                        //console.log(curso.curso)
                                        router.push(
                                            `/student/${codstudent}/${curso.profesor}/${curso.curso}`
                                        )
                                    }}
                                >
                                    Ver curso
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            ))}
        </Container>
    );
}
