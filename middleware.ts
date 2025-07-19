import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decodeJWT } from "./src/utils/decodeToken";
import { UserRole } from "./src/enum";

// Publicly accessible routes
const publicRoutes = ["/", "/login", "/register"];

export function middleware(request: NextRequest) {
    const token = request.cookies.get("autocare360_token")?.value;
    const { pathname } = request.nextUrl;

    const isPublic = publicRoutes.includes(pathname);
    console.log("Middleware:", { pathname, hasToken: !!token }); // Debug log

    // CASE 1: Authenticated user visiting public route → redirect to /[role]/dashboard
    if (token && publicRoutes.includes(pathname)) {
        const decoded = decodeJWT(token);
        const role = decoded?.role;

        console.log("Redirecting authenticated user to:", `/${role}/dashboard`);

        if (role) {
            const url = request.nextUrl.clone();
            url.pathname = `/${role}/dashboard`; // dynamic based on role
            return NextResponse.redirect(url);
        }
    }

    // CASE 2: Unauthenticated user trying to access private route → redirect to login
    if (!token && !isPublic) {
        console.log("Redirecting unauthenticated user to:", "/");
        const url = request.nextUrl.clone();
        url.pathname = "/";
        return NextResponse.redirect(url);
    }

    console.log("Continuing to:", pathname);
    return NextResponse.next();
}


export const config = {
    matcher: [
        "/login",
        "/register",
        "/",
        "/(admin|mechanic|super_admin|customer|receptionist)/:path*",
    ],
};