import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  try {
    const { searchParams } = new URL(request.url);
    const dateParam = searchParams.get("date");
    if (!dateParam) {
      return NextResponse.json({ message: "Missing date" }, { status: 400 });
    }
    const date = new Date(dateParam);
    const rapports = await prisma.rapport.findMany({
      where: { date: { equals: date } },
    });
    return NextResponse.json(rapports, { status: 200 });
  } catch (e) {
    console.error("Error getting date", e);
    return NextResponse.json(
      { message: "Failed to get date" },
      { status: 500 }
    );
  }
};
