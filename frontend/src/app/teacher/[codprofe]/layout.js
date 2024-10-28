"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Stack, Image, Navbar, Nav, Container } from "react-bootstrap";
import { useRouter } from "next/navigation";
import NavbarTeacher from "@/components/navbarTeacher";

export default function TeacherLayout({ children, params }) {
    const router = useRouter();

    const cerrarSesion = () => {
        document.cookie = "tipo_usuario=; max-age=0; path=/";
        router.push("/login");
    };
    return (
        <>
            {/* bg-dark */}
            <NavbarTeacher params={params}/>
            <div>{children}</div>
        </>
    );
}
