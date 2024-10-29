"use client";
import React, { useEffect, useState } from "react";
import axiosInstance, {
    handleAxiosError,
    handleAxiosMsg,
} from "@/helpers/axiosConfig";
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
    Dropdown,
    DropdownButton,
} from "react-bootstrap";

export default function Reporte({ params }) {
    const codstudent = React.use(params).codstudent;
    return (
        <Container>
            <Row>
                <Col>
                    <h1>Reportes</h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h2>Reporte de notas</h2>
                    <h3>Grafica#</h3>
                </Col>
            </Row>
        </Container>
    )
}