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

export default function AdminStudents() {
    const nodes = [
        {
            carnet: "202400000",
            nombre: "Guillermo 1",
            correo: "guillermo1@gmail.com",
            genero: "m",
            contrasenia: "1234",
        },
    ];

    const COLUMNS2 = [
        { label: "Carnet", renderCell: (item) => item.carnet },
        { label: "Nombres y apellidos", renderCell: (item) => item.nombre },
        { label: "Correo", renderCell: (item) => item.correo },
        { label: "Genero", renderCell: (item) => item.genero },
        {
            label: "Acciones",
            renderCell: (item) => {
                return (
                    <>
                        <Button
                            variant="outline-warning"
                            size="sm"
                            className="me-2"
                            onClick={() => mostrarTarea(item)} // item es la tarea
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
    const alumnos = { nodes };
    return (
        <Container>
            <Row>
                <Col>
                    <h1>Estudiantes</h1>
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
                <CompactTable columns={COLUMNS2} data={alumnos} />
            </Row>
        </Container>
    );
}
