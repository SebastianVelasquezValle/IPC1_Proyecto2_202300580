"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Stack, Image } from "react-bootstrap";
import { useRouter } from "next/navigation";

export default function TeacherLayout({ children }) {
    const router = useRouter();

    const cerrarSesion = () => {
        document.cookie = "tipo_usuario=; max-age=0; path=/";
        router.push("/login");
    };
    return (
        <>
        {/* bg-dark */}
        <div className="justify-content-center align-items-center ">
            <div>
                <Button
                    variant="outline-danger"
                    size="sm"
                    className="justify-content-end"
                    onClick={cerrarSesion} // item.id es el id de la tarea
                >
                    <Image
                        aria-hidden
                        src="/arrow-bar-left.svg"
                        alt="arrow"
                        width={18}
                        height={18}
                    />
                    Cerrar Sesión
                </Button>
            </div>
            {children}
        </div>
            
        </>
    );
}
