import { NextResponse, NextRequest } from "next/server";

function unauthorized() {
  return new NextResponse("Unauthorized", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Admin"' },
  });
}

export function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith("/admin")) {
    const user = process.env.ADMIN_USER || "";
    const pass = process.env.ADMIN_PASS || "";
    const header = req.headers.get("authorization") || "";

    if (!user || !pass) return unauthorized();
    if (!header.startsWith("Basic ")) return unauthorized();

    const base64 = header.slice(6); // after "Basic "
    let decoded = "";
    try {
      decoded = atob(base64);
    } catch {
      return unauthorized();
    }

    const [u, p] = decoded.split(":");
    if (u !== user || p !== pass) return unauthorized();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
