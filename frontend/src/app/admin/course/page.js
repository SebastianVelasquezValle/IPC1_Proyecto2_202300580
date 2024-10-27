"use client";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
    Container,
    Row,
    Col,
    Form,
    Button,
    Stack,
    Modal,
} from "react-bootstrap";
import axiosInstance, {
    handleAxiosError,
    handleAxiosMsg,
} from "@/helpers/axiosConfig";
import { CompactTable } from "@table-library/react-table-library/compact";


export default function AdminCourse() {
    const nodes = [
        {
            codigo: 17,
            nombre: "Área Social Humanística 1",
            creditos: 3,
            alumnos: 0,
            profesor: "ECYSP-001",
        },
        {
            codigo: 18,
            nombre: "Área Social Humanística 1",
            creditos: 5,
            alumnos: 10,
            profesor: "ECYSP-001",
        },
    ];

    const COLUMNS3 = [
        { label: "Código", renderCell: (item) => item.codigo },
        { label: "Nombres", renderCell: (item) => item.nombre },
        { label: "Creditos", renderCell: (item) => item.creditos },
        { label: "Alumnos", renderCell: (item) => item.alumnos },
        { label: "Profesor", renderCell: (item) => item.profesor },
        {
            label: "Acciones",
            renderCell: (item) => {
                return (
                    <>
                        <Button
                            variant="outline-warning"
                            size="sm"
                            className="me-2"
                            // onClick={() => mostrarTarea(item)} // item es la tarea
                        >
                            Editar
                        </Button>
                        <Button
                            variant="outline-danger"
                            size="sm"
                            className="me-2"
                            // onClick={() => eliminarTarea(item.id)} // item.id es el id de la tarea
                        >
                            Eliminar
                        </Button>
                    </>
                );
            },
        },
    ];

    //const [profesores, setProfesores] = useState({ node: [] });
    const cursos = { nodes };
    return (
        <Container>
            <Row>
                <Col>
                    <h1>Cursos</h1>
                </Col>
            </Row>
            <br />
            <Row>
                <Col>
                    <div className="mb-2">
                        <Button variant="primary" size="sm">
                            Carga Masiva
                        </Button>{" "}
                        <Button variant="secondary" size="sm">
                            Exportar Excel
                        </Button>
                    </div>
                </Col>
            </Row>
            <br />
            <Row>
                <CompactTable columns={COLUMNS3} data={cursos} />
            </Row>
        </Container>
    );
}
