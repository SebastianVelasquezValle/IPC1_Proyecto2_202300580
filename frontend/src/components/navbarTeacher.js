"use client";
import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import Image from "react-bootstrap/Image";
import { useRouter } from "next/navigation";

export default function NavbarTeacher({ params }) {
    const router = useRouter();

    const codprofe = React.use(params).codprofe;

    const cerrarSesion = () => {
        document.cookie = "tipo_usuario=; max-age=0; path=/";
        document.cookie = "usuario=; max-age=0; path=/";
        router.push("/login");
    };

    return (
        <>
            <Navbar bg="dark" data-bs-theme="dark" className="fs-5">
                <Container>
                    <Navbar.Brand className="fs-3">Profesor</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link
                            onClick={() => router.push(`/teacher/${codprofe}`)}
                        >
                            Cursos
                        </Nav.Link>
                        <Nav.Link
                            onClick={() => router.push(`/teacher/${codprofe}/reporte`)}
                        >
                            Reportes
                        </Nav.Link>
                    </Nav>
                    <Nav className="justify-content-end">
                        <Nav.Link onClick={cerrarSesion}>
                            Cerrar Sesión
                        </Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
}
