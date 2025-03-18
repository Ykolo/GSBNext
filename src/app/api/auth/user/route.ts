import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

interface CustomJWTPayload {
  id: string;
  login: string;
  password: string;
}
export const GET = async () => {
  const cookieStore = await cookies();
  const tokenCookie = cookieStore.get("auth_token");
  if (!tokenCookie || !tokenCookie.value) {
    console.error("No token found");
    return NextResponse.json({ error: "No token found" });
  }
  const token = tokenCookie.value;
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as CustomJWTPayload;
    return NextResponse.json({ decoded });
  } catch (e: any) {
    console.error(e);
    return NextResponse.json({ error: e.message });
  }
};
