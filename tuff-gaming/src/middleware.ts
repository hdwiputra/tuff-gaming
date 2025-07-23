import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { errorHandler } from "./helpers/errorHandler";
import { verifyToken } from "./helpers/jwt";

export async function middleware(request: NextRequest) {
  try {
    const token = request.cookies.get("Authorization")?.value;
    const isApiRoute = request.nextUrl.pathname.startsWith("/api/");

    // For API routes
    if (isApiRoute) {
      // Check if this is a protected API route
      const isProtectedApiRoute =
        request.nextUrl.pathname.startsWith("/api/wishlist");

      if (isProtectedApiRoute) {
        // Require authentication for protected routes
        if (!token) {
          return new Response(
            JSON.stringify({ message: "Authentication required", status: 401 }),
            {
              status: 401,
              headers: { "Content-Type": "application/json" },
            }
          );
        }

        const rawToken = token.split(" ");
        const tokenType = rawToken[0];
        const tokenValue = rawToken[1];

        if (tokenType !== "Bearer" || !tokenValue) {
          throw { message: "Invalid token", status: 401 };
        }

        const decodedToken = await verifyToken<{ _id: string }>(tokenValue);
        const requestHeaders = new Headers(request.headers);
        requestHeaders.set("x-userId", decodedToken.id as string);

        return NextResponse.next({ headers: requestHeaders });
      } else {
        // For non-protected API routes (like /api/products), optional auth
        if (token) {
          try {
            const rawToken = token.split(" ");
            const tokenType = rawToken[0];
            const tokenValue = rawToken[1];

            if (tokenType === "Bearer" && tokenValue) {
              const decodedToken = await verifyToken(tokenValue);
              const requestHeaders = new Headers(request.headers);
              requestHeaders.set("x-userId", decodedToken.id as string);

              return NextResponse.next({ headers: requestHeaders });
            }
          } catch (error) {
            // Invalid token - continue without userId
            console.error(
              "Invalid token for API route, continuing without auth: ",
              error
            );
          }
        }

        // No token or invalid token - continue without userId
        return NextResponse.next();
      }
    }

    // For client routes - check if this is a protected client route
    const isProtectedClientRoute =
      request.nextUrl.pathname.startsWith("/wishlist");

    if (isProtectedClientRoute) {
      // For protected client routes, require authentication
      if (!token) {
        return NextResponse.redirect(new URL("/login", request.url));
      }

      try {
        const rawToken = token.split(" ");
        const tokenType = rawToken[0];
        const tokenValue = rawToken[1];

        if (tokenType === "Bearer" && tokenValue) {
          const decodedToken = await verifyToken(tokenValue);
          const requestHeaders = new Headers(request.headers);
          requestHeaders.set("x-userId", decodedToken.id as string);

          return NextResponse.next({ headers: requestHeaders });
        } else {
          throw new Error("Invalid token format");
        }
      } catch (error) {
        console.error("Error during token verification: ", error);
        return NextResponse.redirect(new URL("/login", request.url));
      }
    } else {
      // For non-protected client routes (like product pages), optional auth
      if (token) {
        try {
          const rawToken = token.split(" ");
          const tokenType = rawToken[0];
          const tokenValue = rawToken[1];

          if (tokenType === "Bearer" && tokenValue) {
            const decodedToken = await verifyToken(tokenValue);
            const requestHeaders = new Headers(request.headers);
            requestHeaders.set("x-userId", decodedToken.id as string);

            return NextResponse.next({ headers: requestHeaders });
          }
        } catch (error) {
          console.error(
            "Invalid token for client route, continuing without auth: ",
            error
          );
        }
      }

      // No token or invalid token for non-protected routes - continue without userId
      return NextResponse.next();
    }
  } catch (error) {
    const isApiRoute = request.nextUrl.pathname.startsWith("/api/");

    // For API routes, return error
    if (isApiRoute) {
      return errorHandler(error);
    }

    // For client routes, redirect to /login
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: [
    "/api/wishlist/:path*",
    "/api/products/:path*",
    "/api/products",
    "/wishlist/:path*",
    "/products/:path*",
  ],
};
