"use client";
import { useEffect, useState, useRef } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
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


    const [profesorData, setProfesorData] = useState({nodes: []});

    const cargarArchivo = async () => {
        const file = fileInputRef.current.files[0]; // Obtenemos el archivo

        if (!file || file.type !== "application/json" ) {
            alert("Solo se permiten archivos .json");
            return;
        }
        //console.log(file);

        const formData = new FormData();
        formData.append('file', file);
        // const data = Object.fromEntries(formData.entries());
        // console.log(data);
        

        try {
            
            const response = await axiosInstance.post("/admin/upload",formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log( response.data);
            handleAxiosMsg(response.data.message, "success");
        } catch (error) {
            handleAxiosError(error);
        }
    };

    const obtenerProfesores = async () => {
        try {
        } catch (error) {
            handleAxiosError(error);
        }
    };

    // Acá obtenemos la información de la api
    useEffect(() => {
        console.log("useEffect");
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
                                variant="primary"
                                size="sm"
                                onClick={cargarArchivo}
                            >
                                Carga Masiva
                            </Button>
                            <Button variant="secondary" size="sm" type="submit">
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
        </Container>
    );
}
