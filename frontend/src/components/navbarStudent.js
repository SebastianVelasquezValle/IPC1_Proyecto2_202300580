"use client";
import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import Image from "react-bootstrap/Image";
import { useRouter } from "next/navigation";


export default function NavbarStudent({ params }) {
    const router = useRouter();

    const codstudent = React.use(params).codstudent;
    
    const cerrarSesion = () => {
        document.cookie = "tipo_usuario=; max-age=0; path=/";
        document.cookie = "usuario=; max-age=0; path=/";
        router.push("/login");
    }

    return (
        <>
            <Navbar bg="dark" data-bs-theme="dark" className="fs-5">
                <Container>
                    <Navbar.Brand className="fs-3">
                        Profesor
                    </Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link onClick={() => router.push(`/teacher/${codstudent}`)}>Cursos</Nav.Link>
                    </Nav>
                    <Nav className="justify-content-end">
                        <Nav.Link onClick={cerrarSesion} >Cerrar Sesión</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
}
