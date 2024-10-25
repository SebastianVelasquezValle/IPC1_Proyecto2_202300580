"use client";
//import "bootstrap/dist/css/bootstrap.min.css";
import NavbarHome from "./components/navbar/navbarHome"; // importamos el componente NavbarHome, no se puede poner {NavbarHome} porque no se exportó así, se exportó como export default
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

export default function Home() {
    return (
        <div>
            <div>
                <NavbarHome />
            </div>
            <div>
                <Container>
                    <Row className="justify-content-md-center">
                        <Col md="auto">
                            <h1>ECYS</h1>
                        </Col>
                    </Row>
                    <Row className="justify-content-md-center">
                        <Col md="auto">
                            <Image
                                src="logo.jpg"
                                alt="Logo"
                                width={200}
                                height={200}
                                rounded
                            />
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col>
                            <p>
                                La Escuela de Ciencias y Sistemas de la Facultad
                                de Ingeniería de la Universidad de San Carlos de
                                Guatemala enfrenta varios desafíos en la gestión
                                eficiente de los cursos impartidos en la carrera
                                de Ingeniería en Ciencias y Sistemas. Con una
                                creciente demanda de estudiantes y la
                                complejidad de administrar múltiples cursos, es
                                crucial implementar un sistema web robusto que
                                facilite la administración de cursos, profesores
                                y alumnos. Este sistema permitirá la gestión
                                precisa de los cursos, asegurando que cada
                                asignatura esté adecuadamente registrada, con
                                profesores asignados, y que los estudiantes
                                puedan inscribirse sin dificultades, mejorando
                                la organización y reduciendo los errores
                                administrativos.
                                <br />
                                <br />
                                El sistema garantizará una trazabilidad completa
                                de la información académica, permitiendo al
                                administrador cargar y actualizar los cursos y
                                profesores de manera eficiente, mientras que los
                                profesores podrán gestionar sus clases,
                                actividades y calificaciones de los estudiantes.
                                Además, la plataforma proporcionará a los
                                alumnos una interfaz intuitiva para inscribirse
                                en cursos, consultar sus notas y actualizar su
                                información personal, todo en tiempo real. La
                                capacidad de modificar y eliminar registros de
                                manera segura será fundamental para mantener la
                                base de datos actualizada y evitar
                                inconsistencia
                                <br />
                                <br />
                                Más allá de la gestión básica de usuarios y
                                cursos, el sistema también ofrecerá la capacidad
                                de generar reportes académicos que ayuden a
                                visualizar el rendimiento de los estudiantes a
                                lo largo del tiempo. Esta herramienta será clave
                                para mejorar la toma de decisiones en la
                                administración educativa y para proporcionar a
                                los profesores una visión clara del progreso de
                                sus alumnos. Implementada con Express en el
                                backend y React en el frontend, la aplicación
                                garantizará un rendimiento óptimo y una
                                experiencia de usuario moderna y fluida,
                                adecuada para un entorno académico de alto
                                nivel.
                            </p>
                        </Col>
                    </Row>
                    <br />
                    <Row className="justify-content-md-center">
                        <Col md="auto">
                            <Card style={{ width: "18rem" }}>
                                <Card.Img variant="top" src="2.jpeg" />
                                <Card.Body>
                                    <Card.Title>
                                        Sebastian Levi Velásquez Valle
                                    </Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">
                                        Carnet: 202300580
                                    </Card.Subtitle>
                                    <Card.Text>
                                        Carrera: Ingeniería en Ciencias y Sistemas
                                        <br />
                                        Curso: Introducción a la Programación y Computación 1
                                        <br />
                                        Correo: sebastianl.velasquezv@gmail.com
                                        
                                    </Card.Text>

                                    <Card.Link href="https://github.com/SebastianVelasquezValle">
                                        <Image
                                            aria-hidden
                                            src="/github.svg"
                                            alt="GitHub icon"
                                            width={18}
                                            height={18}
                                        />
                                        GitHub
                                    </Card.Link>
                                    <Card.Link href="https://www.instagram.com/sebastian_vv05/">
                                        <Image
                                            aria-hidden
                                            src="/instagram.svg"
                                            alt="Globe icon"
                                            width={18}
                                            height={18}
                                        />
                                        Instragram
                                    </Card.Link>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
}
