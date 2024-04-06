import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "./app/core/auth/auth";
import type { Session } from "next-auth";

export async function middleware(request: NextRequest) {
  const session: Session | null = await auth();
  // console.log(session);
  if (!session && request.nextUrl.pathname.startsWith("/panel")) {
    return NextResponse.redirect(new URL("/member/signin", request.url));
  }
}

export const config = {
  matcher: "/((?!api|_next/static|images|_next/image|favicon.ico).*)",
};
