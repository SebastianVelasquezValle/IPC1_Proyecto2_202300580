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
    Image,
    Card,
} from "react-bootstrap";
import { CompactTable } from "@table-library/react-table-library/compact";
import { useRouter } from "next/navigation";

export default function Curso({ params }) {
    const codcurso = React.use(params).codcurso;
    return (
        <div>
            <h1>Curso: </h1>
            <h2>{codcurso}</h2>
        </div>
    );
}
