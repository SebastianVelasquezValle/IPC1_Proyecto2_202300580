import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request) {
    const cookies = request.cookies;
    const tipoUsuario = cookies.get("tipo_usuario")?.value;
    const url = request.nextUrl.pathname;

    // if (!tipoUsuario) {
    //     return NextResponse.redirect(new URL("/login", request.url));
    // } else if (tipoUsuario && tipoUsuario === "admin" && !url.startsWith("/admin")) {
    //     return NextResponse.redirect(new URL("/admin", request.url));
    // } else if (tipoUsuario && tipoUsuario === "estudiante" && !url.startsWith("/student")) {
    //     return NextResponse.redirect(new URL("/student", request.url));
    // } else if (tipoUsuario && tipoUsuario === "profesor" && !url.startsWith("/teacher")) {
    //     return NextResponse.redirect(new URL("/teacher", request.url));
    // } else if (tipoUsuario && url.startsWith("/login")) {
    //     if (tipoUsuario === "admin") {
    //         return NextResponse.redirect(new URL("/admin", request.url));
    //     } else if (tipoUsuario === "estudiante") {
    //         return NextResponse.redirect(new URL("/student", request.url));
    //     }else if (tipoUsuario === "profesor") {
    //         return NextResponse.redirect(new URL("/teacher", request.url));
    //     }
    // } else {
    //     return NextResponse.next();
    // }
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ["/admin/:path*", "/student/:path*", "/teacher/:path*"],
};
