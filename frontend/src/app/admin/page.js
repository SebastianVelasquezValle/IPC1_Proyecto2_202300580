"use client";
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from "react-bootstrap/Container";
export default function AdminPage() {
    return (
        <Container className="justify-content-center align-items-center">
            <h1 className="d-flex justify-content-center align-items-center">¡Hola, admin!</h1>
            <h2 className="d-flex justify-content-center align-items-center">Presiona una opción el navbar</h2>
        </Container>
    );
}
