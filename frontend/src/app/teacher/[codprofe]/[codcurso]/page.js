"use client";
import React, { useEffect, useState, useRef } from "react";
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

export default function Curso({ params }) {
    const codprofe = React.use(params).codprofe; // Obtener el valor de codprofe (el codigo del profesor)
    const codcurso = React.use(params).codcurso; // Obtener el valor de codcurso (el codigo del curso)
    const fileInputRefAlumnos = useRef(null); // Referencia para el input de alumnos
    const fileInputRefActividades = useRef(null); // Referencia para el input de actividades

    const COLUMNSLISTADOALUMNOS = [
        { label: "Carnet ", renderCell: (item) => item.carnet },
        { label: "Nombre Completo", renderCell: (item) => item.nombre },
    ];

    const COLUMNSLISTADOACTIVIDADES = [
        { label: "Nombre ", renderCell: (item) => item.nombre },
        { label: "Descripción", renderCell: (item) => item.descripcion },
        { label: "Ponderación", renderCell: (item) => item.ponderacion },
        { label: "Promedio", renderCell: (item) => item.promedio },
    ];

    const [cursos, setCursos] = useState({ nodes: [] }); // Acá estara la info de los cursos, por si se necesita
    const loadCursos = async () => {
        try {
            //const response = await axiosInstance.get("/teacher/home/ECYSP-001");
            const response = await axiosInstance.get(
                `/teacher/home/${codprofe}`
            );
            //console.log(response.data); // muestra la data en consola
            setCursos({ nodes: response.data });
        } catch (error) {
            handleAxiosError(error);
        }
    };

    const nombreCurso = () => {
        const curso = cursos.nodes.find(
            (curso) => String(curso.codigo) === String(codcurso)
        );
        return curso ? curso.nombre : "Curso no encontrado";
    };

    const [alumnos, setAlumnos] = useState({ nodes: [] });
    const [actividades, setActividades] = useState({ nodes: [] });

    const cargarAlumnos = async () => {
        const file = fileInputRefAlumnos.current.files[0]; // Obtenemos el archivo

        if (!file || file.type !== "application/json") {
            // Verificamos que sea un archivo .json
            alert("Solo se permiten archivos .json");
            return;
        }
        //console.log(file);
        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await axiosInstance.post(
                `/teacher/course/alumno/${codprofe}/${codcurso}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            console.log(response.data);
            handleAxiosMsg(response.data.message, "success");
            obtenerAlumnos(); // Actualizamos la tabla / Refrescamos la tabla
        } catch (error) {
            handleAxiosError(error);
        }
    }; // Funcion para cargar los alumnos

    const obtenerAlumnos = async () => {
        try {
            const response = await axiosInstance.get(
                `/teacher/course/alumno/${codprofe}/${codcurso}`
            );
            console.log(response.data);
            setAlumnos({ nodes: response.data });
        } catch (error) {
            handleAxiosError(error);
        }
    };

    
    const cargarActividades = async () => {
        const file = fileInputRefActividades.current.files[0]; // Obtenemos el archivo

        if (!file || file.type !== "application/json") {
            // Verificamos que sea un archivo .json
            alert("Solo se permiten archivos .json");
            return;
        }
        //console.log(file);
        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await axiosInstance.post(
                `/teacher/course/actividad/${codprofe}/${codcurso}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            console.log(response.data);
            handleAxiosMsg(response.data.message, "success");
            obtenerActividades(); // Actualizamos la tabla / Refrescamos la tabla
        } catch (error) {
            handleAxiosError(error);
        }
    };

    const obtenerActividades = async () => {
        try {
            const response = await axiosInstance.get(
                `/teacher/course/actividad/${codprofe}/${codcurso}`
            );
            console.log(response.data);
            setActividades({ nodes: response.data });
        } catch (error) {
            handleAxiosError(error);
        }
    };

    useEffect(() => {
        loadCursos();
        obtenerAlumnos();
        obtenerActividades();
    }, [codprofe, codcurso]); // Se vuelve ejecuta cada vez que cambia el valor de codprofe y codcurso

    return (
        <Container>
            <Row>
                <Col>
                    <h1>
                        <b>Curso: </b>
                        {nombreCurso()}
                    </h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h1>
                        <b>Código: </b>
                        {codcurso}
                    </h1>
                </Col>
            </Row>
            <br />
            <Row>
                <Col>
                    <Row>
                        <Col>
                            <h5>Listado de Alumnos</h5>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <CompactTable
                                columns={COLUMNSLISTADOALUMNOS}
                                data={alumnos}
                            />
                        </Col>
                    </Row>
                </Col>
                <Col>
                    <Row>
                        <Col>
                            <h5>Listado de Actividades</h5>
                        </Col>
                        <Col>
                            {/* <h5>Acumulado: /100</h5> */}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <CompactTable
                                columns={COLUMNSLISTADOACTIVIDADES}
                                data={actividades}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div className="mb-2">
                                <InputGroup className="mb-3">
                                    <Form.Control
                                        ref={fileInputRefActividades}
                                        type="file"
                                        accept=".json"
                                        // style={{ display: "none" }}
                                    />
                                    <Button
                                        variant="outline-primary"
                                        size="sm"
                                        onClick={cargarActividades}
                                    >
                                        Carga Actividades
                                    </Button>
                                </InputGroup>
                                <InputGroup className="mb-3">
                                    <Form.Control
                                        ref={fileInputRefAlumnos}
                                        type="file"
                                        accept=".json"
                                        // style={{ display: "none" }}
                                    />
                                    <Button
                                        variant="outline-warning"
                                        size="sm"
                                        onClick={cargarAlumnos}
                                    >
                                        Carga Alumnos
                                    </Button>
                                </InputGroup>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
            {/* <h2>{codcurso}</h2>
            <h3>{codprofe}</h3> */}
        </Container>
    );
}
