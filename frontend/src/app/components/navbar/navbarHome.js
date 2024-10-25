"use client";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import Image from 'react-bootstrap/Image';
import { useRouter } from 'next/navigation';


export default function NavbarHome() {
    const router = useRouter();
    return (
        <>
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="#home">
                        <Image
                            src="logo.jpg"
                            alt="Logo"
                            width={50}
                            height={50}
                            roundedCircle
                        />
                    </Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="./login">Login</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
}

//export { NavbarHome };
//export default NavbarHome; // el export default es para que se pueda importar en otros archivos
