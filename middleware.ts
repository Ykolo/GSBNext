import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

const SECRET_KEY = process.env.JWT_SECRET || "";

export const middleware = async (req: NextRequest) => {
  const token = req.cookies.get("auth_token")?.value;
  if (!token) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  try {
    jwt.verify(token, SECRET_KEY);
    return NextResponse.next();
  } catch (e) {
    return NextResponse.redirect(new URL("/", req.url));
  }
};

export const config = {
  matcher: ["/dashboard"],
};
