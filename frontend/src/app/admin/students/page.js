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
} from "react-bootstrap";
import axiosInstance, {
    handleAxiosError,
    handleAxiosMsg,
} from "@/helpers/axiosConfig";
import { CompactTable } from "@table-library/react-table-library/compact";

export default function AdminStudents() {
    const fileInputRef = useRef(null);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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
                            onClick={() => mostrarEstudiantes(item)} // item es la tarea
                        >
                            Editar
                        </Button>
                        <Button
                            variant="outline-danger"
                            size="sm"
                            className="me-2"
                            onClick={() => eliminarEstudiantes(item.carnet)} // item.id es el id de la tarea
                        >
                            Eliminar
                        </Button>
                    </>
                );
            },
        },
    ];

    const [alumnosData, setAlumnosData] = useState({ nodes: [] });

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
                "/admin/students",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            console.log(response.data);
            handleAxiosMsg(response.data.message, "success");
            obtenerEstudiantes(); // Actualizamos la tabla / Refrescamos la tabla
        } catch (error) {
            handleAxiosError(error);
        }
    };

    const obtenerEstudiantes = async () => {
        try {
            const response = await axiosInstance.get("/admin/students");
            console.log(response.data);
            setAlumnosData({ nodes: response.data });
        } catch (error) {
            handleAxiosError(error);
        }
    };

    const eliminarEstudiantes = async (carnet) => {
        try {
            const response = await axiosInstance.delete(
                `/admin/students/${carnet}`
            );
            handleAxiosMsg(response.data.message);
            obtenerEstudiantes(); // Actualizamos la tabla / Refrescamos la tabla
        } catch (error) {
            handleAxiosError(error);
        }
    };

    const [estudiantesEdit, setEstudiantesEdit] = useState({});
    const mostrarEstudiantes = (item) => {
        setEstudiantesEdit(item);
        handleShow();
    };

    const modificarEstudiante = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData(e.currentTarget);
            const response = await axiosInstance.put(
                `/admin/students/${estudiantesEdit.carnet}`,
                formData,
                formData
            );
            handleAxiosMsg(response.data.message);
            handleClose();
            obtenerEstudiantes(); // Actualizamos la tabla / Refrescamos la tabla
        } catch (error) {
            handleAxiosError(error);
        }
    };

    const exportarExcel = async () => {
        try {
            const response = await axiosInstance.get(
                "/admin/students/download-students",
                {
                    responseType: "blob", // Indicamos que la respuesta es un archivo
                }
            );
            console.log(response.data);
            const url = window.URL.createObjectURL(new Blob([response.data])); // Creamos una URL del archivo
            const link = document.createElement("a"); // Creamos un link
            link.href = url; // Agregamos la URL al link
            link.setAttribute("download", "Estudiantes.xlsx"); // Agregamos el atributo de descarga
            document.body.appendChild(link); // Agregamos el link al body
            link.click(); // Simulamos un click

            document.body.removeChild(link); // Eliminamos el link
        } catch (error) {
            handleAxiosError(error);
        }
    };

    useEffect(() => {
        obtenerEstudiantes(); // Actualizamos la tabla / Refrescamos la tabla
    }, []);

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
                <CompactTable columns={COLUMNS2} data={alumnosData} />
            </Row>
            <Modal show={show} onHide={handleClose}>
                <Form onSubmit={modificarEstudiante}>
                    <Modal.Header closeButton>
                        <Modal.Title>Editar Profesor</Modal.Title>
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
                                defaultValue={estudiantesEdit.nombre}
                            />
                            <Form.Label>Correo</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Ingrese el correo"
                                name="correo"
                                defaultValue={estudiantesEdit.correo}
                            />
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ingrese la contraseña"
                                name="contrasenia"
                                defaultValue={estudiantesEdit.contrasenia}
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
