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

export default function AdminLoad() {
    const fileInputRef = useRef(null);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const COLUMNS1 = [
        { label: "Código", renderCell: (item) => item.codigo },
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
                            onClick={() => mostrarProfesor(item)} // item es la tarea
                        >
                            Editar
                        </Button>
                        <Button
                            variant="outline-danger"
                            size="sm"
                            className="me-2"
                            onClick={() => eliminarProfesor(item.codigo)} // item.id es el id de la tarea
                        >
                            Eliminar
                        </Button>
                    </>
                );
            },
        },
    ];

    const [profesorData, setProfesorData] = useState({ nodes: [] });

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
                "/admin/upload",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            console.log(response.data);
            handleAxiosMsg(response.data.message, "success");
            obtenerProfesores(); // Actualizamos la tabla / Refrescamos la tabla
        } catch (error) {
            handleAxiosError(error);
        }
    };

    const obtenerProfesores = async () => {
        try {
            const response = await axiosInstance.get("/admin/upload");
            console.log(response.data);
            setProfesorData({ nodes: response.data });
        } catch (error) {
            handleAxiosError(error);
        }
    };

    const eliminarProfesor = async (codigo) => {
        try {
            const response = await axiosInstance.delete(
                `/admin/upload/${codigo}`
            );
            handleAxiosMsg(response.data.message);
            obtenerProfesores(); // Actualizamos la tabla / Refrescamos la tabla
        } catch (error) {
            handleAxiosError(error);
        }
    };

    const [profesorEdit, setProfesorEdit] = useState({});
    const mostrarProfesor = (item) => {
        setProfesorEdit(item);
        handleShow();
    };

    const modificarProfesor = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData(e.currentTarget);
            const response = await axiosInstance.put(
                `/admin/upload/${profesorEdit.codigo}`,
                formData,
                formData
            );
            handleAxiosMsg(response.data.message);
            handleClose();
            obtenerProfesores(); // Actualizamos la tabla / Refrescamos la tabla
        } catch (error) {
            handleAxiosError(error);
        }
    };

    const exportarExcel = async () => {
        try {
            const response = await axiosInstance.get(
                "/admin/upload/download-profesores",
                {
                    responseType: "blob", // Indicamos que la respuesta es un archivo
                }
            );
            console.log(response.data);
            const url = window.URL.createObjectURL(new Blob([response.data])); // Creamos una URL del archivo
            const link = document.createElement("a"); // Creamos un link
            link.href = url; // Agregamos la URL al link
            link.setAttribute("download", "profesores.xlsx"); // Agregamos el atributo de descarga
            document.body.appendChild(link); // Agregamos el link al body
            link.click(); // Simulamos un click

            document.body.removeChild(link); // Eliminamos el link
        } catch (error) {
            handleAxiosError(error);
        }
    };

    // Acá obtenemos la información de la api
    useEffect(() => {
        obtenerProfesores();
    }, []);

    return (
        <Container>
            <Row>
                <Col>
                    <h1>Profesor</h1>
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
                <CompactTable columns={COLUMNS1} data={profesorData} />
            </Row>
            <Modal show={show} onHide={handleClose}>
                <Form onSubmit={modificarProfesor}>
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
                                defaultValue={profesorEdit.nombre}
                            />
                            <Form.Label>Correo</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Ingrese el correo"
                                name="correo"
                                defaultValue={profesorEdit.correo}
                            />
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ingrese la contraseña"
                                name="contrasenia"
                                defaultValue={profesorEdit.contrasenia}
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
