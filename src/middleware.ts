import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
  const session = !!req.cookies.get("next-auth.session-token");
  console.log(session);
  if (!session) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  return NextResponse.next();
}

// export const config = {
//   matcher: ["/dashboard"],
// };
