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
    InputGroup,
    Table,
} from "react-bootstrap";
import { CompactTable } from "@table-library/react-table-library/compact";
import { useRouter } from "next/navigation";

export default function Curso({ params }) {
    const codstudent = React.use(params).codstudent; // Obtener el valor de codstudent (el codigo del estudiante)
    const codcurso = React.use(params).codcurso; // Obtener el valor de codcurso (el codigo del curso)
    const codprofe = React.use(params).codprofe; // Obtener el valor de codprofe (el codigo del profesor)

    const COLUMNSLISTADOACTIVIDADES = [
        { label: "Nombre ", renderCell: (item) => item.nombre },
        { label: "Descripción", renderCell: (item) => item.descripcion },
        { label: "Ponderación", renderCell: (item) => item.ponderacion },
        { label: "Nota obtenida", renderCell: (item) => item.nota },
    ];

    const [cursos, setCursos] = useState({ nodes: [] }); // Acá estara la info de los cursos, por si se necesita (como el nombre del curso)
    const loadCursos = async () => {
        try {
            const response = await axiosInstance.get(
                `/student/home/${codstudent}`
            );
            //console.log(response.data);
            setCursos({ nodes: response.data });
        } catch (error) {
            handleAxiosError(error);
        }
    };
    const [actividades, setActividades] = useState({ nodes: [] }); // Acá estara la info de las actividades, lo que tendra la tabla
    const [ponderacion, setPonderacion] = useState(0); // Acá estara el promedio de las notas
    const [totalObtenido, setTotalObtenido] = useState(0); // Acá estara el total de las notas obtenidas
    const loadCursosActividades = async () => {
        try {
            //const response = await axiosInstance.get("/teacher/home/ECYSP-001");
            const response = await axiosInstance.get(
                `/student/course/${codstudent}/${codprofe}/${codcurso}`
            );
            console.log(response.data); // muestra la data en consola
            //console.log(response.data.cursoInfo)
            //console.log(response.data.totalPonderacion);
            console.log(response.data.total_Obtenido);
            setActividades({ nodes: response.data.cursoInfo });
            setPonderacion(response.data.totalPonderacion);
            setTotalObtenido(response.data.total_Obtenido);
        } catch (error) {
            handleAxiosError(error);
        }
    };

    const nombreCurso = () => {
        const curso = cursos.nodes.find(
            (curso) => String(curso.curso) === String(codcurso)
        );
        return curso ? curso.CursoNombre : "Curso no encontrado";
    };

    const exportarExcel = async () => {
        try {
            const response = await axiosInstance.get(
                `/student/course/download/${codstudent}/${codprofe}/${codcurso}`,
                {
                    responseType: "blob", // Indicamos que la respuesta es un archivo
                }
            );
            console.log(response.data);
            const url = window.URL.createObjectURL(new Blob([response.data])); // Creamos una URL del archivo
            const link = document.createElement("a"); // Creamos un link
            link.href = url; // Agregamos la URL al link
            link.setAttribute("download", "Notas.xlsx"); // Agregamos el atributo de descarga
            document.body.appendChild(link); // Agregamos el link al body
            link.click(); // Simulamos un click

            document.body.removeChild(link); // Eliminamos el link
        } catch (error) {
            handleAxiosError(error);
        }
    };

    useEffect(() => {
        loadCursos();
        loadCursosActividades();
    }, [codstudent, codprofe, codcurso]);

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
                            <h4>Listado de Actividades</h4>
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
                </Col>
            </Row>
            {/* <Row>
                <Col>
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Descripción</th>
                                <th>Ponderación</th>
                                <th>Nota Obtenida</th>
                            </tr>
                        </thead>
                        <tbody>
                            {actividades.nodes.map((actividad) => (
                                <tr key={actividad.nombre}>
                                    <td>{actividad.nombre}</td>
                                    <td>{actividad.descripcion}</td>
                                    <td>{actividad.ponderacion}</td>
                                    <td>{actividad.nota}</td>
                                </tr>
                            ))}
                            <tr>
                                <td colSpan={2} className=" align-items-center">Total: </td>
                                <td >{ponderacion}</td>
                                <td>{totalObtenido}</td>
                            </tr>
                        </tbody>
                    </Table>
                </Col>
            </Row> */}
            <Row>
                <Col>
                    <Row>
                        <Col><h5>Ponderación total: {ponderacion} </h5></Col>
                    </Row>
                    <Row>
                        <Col><h5>Nota total obtenida: {totalObtenido} </h5></Col>
                    </Row>
                </Col>

                <Col>
                    <div className="mb-2">
                        <InputGroup className="mb-3">
                            <Button
                                variant="outline-secondary"
                                size="sm"
                                type="submit"
                                onClick={exportarExcel}
                            >
                                Exportar Excel
                            </Button>
                        </InputGroup>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}
