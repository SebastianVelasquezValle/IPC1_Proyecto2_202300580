"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import {
    Container,
    Row,
    Col,
    Form,
    Button,
    Stack,
    Image,
} from "react-bootstrap";
import axiosInstance, {
    handleAxiosError,
    handleAxiosMsg,
} from "@/helpers/axiosConfig";
import { useRouter } from 'next/navigation';


export default function Login() {
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const codigo_carnet = e.target.formBasicUsername.value;
        const contrasenia = e.target.formBasicPassword.value;

        if (!codigo_carnet || !contrasenia) {
            handleAxiosMsg("Por favor llene todos los campos", "error");
            return;
        }

        try {
            const data = {
                codigo_carnet: codigo_carnet,
                contrasenia: contrasenia,
            }
            console.log(data);
            const res = await axiosInstance.post("/login", data);
            console.log(res.data.user);
            console.log(res.data.rol);
            handleAxiosMsg(res.data.message, "success");

            //lo voy a comentar porque para mientras asi sigo trabajando
            //document.cookie = `tipo_usuario=${res.data.rol}; path=/;`; // Guardar el tipo de usuario en las cookies

            
            
            if (res.data.rol === "admin") {
                router.push("/admin");
            } else if (res.data.rol === "estudiante") {
                console.log(res.data.user.carnet);
                //document.cookie = `carnet=${res.data.carnet}; path=/;`;
                router.push(`/student/${res.data.user.carnet}`);
            } else if (res.data.rol === "profesor") {
                console.log(res.data.user.codigo);
                //document.cookie = `codigo=${res.data.codigo}; path=/;`;
                router.push(`/teacher/${res.data.user.codigo}`);
            } 
            //document.cookie = `usuario=${res.data.user}; path=/;`;
            
            
            e.target.reset(); // Limpiar los campos
        } catch (error) {
            handleAxiosError(error);
        }
    };
    

    return (
        <Container
            fluid
            className="vh-100 d-flex justify-content-center align-items-center bg-primary"
        >
            <Row className="p-5 rounded bg-white">
                <Row>
                    <Col>
                        <h1 className="text-center">
                            <Col>
                                <Image
                                    aria-hidden
                                    src="/person-circle.svg"
                                    alt="person"
                                    width={50}
                                    height={50}
                                />
                            </Col>
                            Iniciar sesion
                        </h1>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form
                        onSubmit={handleSubmit}>
                            <Form.Group
                                className="mb-3"
                                controlId="formBasicUsername"
                            >
                                <Form.Label>Número de Carnet/Codigo</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Ingrese su codigo"
                                />
                            </Form.Group>
                            <Form.Group
                                className="mb-3"
                                controlId="formBasicPassword"
                            >
                                <Form.Label>Contraseña</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Ingrese su contraseña"
                                />
                            </Form.Group>
                            <Stack className="col-md-9 mx-auto">
                                <Button variant="primary" type="submit">
                                    Iniciar sesion
                                </Button>
                            </Stack>
                        </Form>
                    </Col>
                </Row>
            </Row>
        </Container>
    );
}
