"use client";
import { useEffect, useState, useRef } from "react";
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
} from "react-bootstrap";
import axiosInstance, {
    handleAxiosError,
    handleAxiosMsg,
} from "@/helpers/axiosConfig";
import { CompactTable } from "@table-library/react-table-library/compact";


export default function AdminCourse() {
    const fileInputRef = useRef(null);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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
                            onClick={() => mostrarCurso(item)} // item es la tarea
                        >
                            <Image
                                aria-hidden
                                src="/pencil.svg"
                                alt="pen"
                                width={18}
                                height={18}
                            />
                        </Button>
                        <Button
                            variant="outline-danger"
                            size="sm"
                            className="me-2"
                            onClick={() => eliminarCursos(item.codigo)} // item.id es el id de la tarea
                        >
                            <Image
                                aria-hidden
                                src="/trash.svg"
                                alt="trash"
                                width={18}
                                height={18}
                            />
                        </Button>
                    </>
                );
            },
        },
    ];

    const [cursosData, setCursosData] = useState({ nodes: [] });

    const cargarArchivo = async () => {
        const file = fileInputRef.current.files[0]; // Obtenemos el archivo

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
                "/admin/course",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            console.log(response.data);
            handleAxiosMsg(response.data.message, "success");
            obtenerCursos(); // Actualizamos la tabla / Refrescamos la tabla
        } catch (error) {
            handleAxiosError(error);
        }
    };

    const obtenerCursos = async () => {
        try {
            const response = await axiosInstance.get("/admin/course");
            console.log(response.data);
            setCursosData({ nodes: response.data });
        } catch (error) {
            handleAxiosError(error);
        }
    };

    const eliminarCursos = async (codigo) => {
        try {
            const response = await axiosInstance.delete(
                `/admin/course/${codigo}`
            );
            handleAxiosMsg(response.data.message);
            obtenerCursos(); // Actualizamos la tabla / Refrescamos la tabla
        } catch (error) {
            handleAxiosError(error);
        }
    };

    const [cursosEdit, setCursosEdit] = useState({});
    const mostrarCurso = (item) => {
        setCursosEdit(item);
        handleShow();
    };

    const modificarCursos = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData(e.currentTarget);
            const response = await axiosInstance.put(
                `/admin/course/${cursosEdit.codigo}`,
                formData,
                formData
            );
            handleAxiosMsg(response.data.message);
            handleClose();
            obtenerCursos(); // Actualizamos la tabla / Refrescamos la tabla
        } catch (error) {
            handleAxiosError(error);
        }
    };

    const exportarExcel = async () => {
        try {
            const response = await axiosInstance.get(
                "/admin/course/download-courses",
                {
                    responseType: "blob", // Indicamos que la respuesta es un archivo
                }
            );
            console.log(response.data);
            const url = window.URL.createObjectURL(new Blob([response.data])); // Creamos una URL del archivo
            const link = document.createElement("a"); // Creamos un link
            link.href = url; // Agregamos la URL al link
            link.setAttribute("download", "Cursos.xlsx"); // Agregamos el atributo de descarga
            document.body.appendChild(link); // Agregamos el link al body
            link.click(); // Simulamos un click

            document.body.removeChild(link); // Eliminamos el link
        } catch (error) {
            handleAxiosError(error);
        }
    };

    useEffect(() => {
        obtenerCursos();
    }, []);

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
                        <InputGroup className="mb-3">
                            <Form.Control
                                ref={fileInputRef}
                                type="file"
                                accept=".json"
                                // style={{ display: "none" }}
                            />
                            <Button
                                variant="outline-primary"
                                size="sm"
                                onClick={cargarArchivo}
                            >
                                Carga Masiva
                            </Button>
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
            <br />
            <Row>
                <CompactTable columns={COLUMNS3} data={cursosData} />
            </Row>
            <Modal show={show} onHide={handleClose}>
                <Form onSubmit={modificarCursos}>
                    <Modal.Header closeButton>
                        <Modal.Title>Editar Curso</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput1"
                        >
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ingrese el nombre"
                                name="nombre"
                                defaultValue={cursosEdit.nombre}
                            />
                            <Form.Label>Creditos</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ingrese los creditos"
                                name="creditos"
                                defaultValue={cursosEdit.creditos}
                            />
                            <Form.Label>Profesor</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ingrese el profesor"
                                name="profesor"
                                defaultValue={cursosEdit.profesor}
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Cerrar
                        </Button>
                        <Button type="submit" variant="primary">
                            Editar
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </Container>
    );
}
