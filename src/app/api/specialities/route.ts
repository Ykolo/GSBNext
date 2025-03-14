import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export const GET = async (): Promise<NextResponse> => {
  const capitalizeFirstLetter = (string: string | null) => {
    if (!string) return string;
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  try {
    const specialities = await prisma.medecin.findMany({
      select: {
        specialitecomplementaire: true,
      },
      distinct: ["specialitecomplementaire"],
      where: {
        specialitecomplementaire: {
          not: null,
          notIn: ["null"],
        },
      },
    });
    const upperCaseSpecialities = specialities.map(
      ({ specialitecomplementaire }) => ({
        label: specialitecomplementaire?.toUpperCase(),
        value: capitalizeFirstLetter(specialitecomplementaire),
      })
    );
    return NextResponse.json(upperCaseSpecialities, { status: 200 });
  } catch (e) {
    console.error("Error getting specialities", e);
    return NextResponse.json(
      { success: false, error: "Failed to fetch specialities" },
      { status: 500 }
    );
  }
};
