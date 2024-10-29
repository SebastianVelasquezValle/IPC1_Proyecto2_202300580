"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Stack, Image, Navbar, Nav, Container } from "react-bootstrap";
import { useRouter } from "next/navigation";
import NavbarStudent from "@/components/navbarStudent";

export default function StudentLayout({ children, params }) {
    const router = useRouter();

    const cerrarSesion = () => {
        document.cookie = "tipo_usuario=; max-age=0; path=/";
        router.push("/login");
    };
    return (
        <>
            {/* bg-dark */}
            <NavbarStudent params={params}/>
            <div>{children}</div>
        </>
    );
}