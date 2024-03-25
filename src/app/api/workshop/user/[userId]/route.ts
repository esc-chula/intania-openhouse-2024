import { User } from "@/common/types/user";
import { Workshop } from "@/common/types/workshop";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  _req: NextRequest,
  {
    params: { userId },
  }: {
    params: { userId: string };
  },
) => {
  const userResponse = await fetch("api/user/" + userId);
  if (!userResponse.ok) {
    return NextResponse.json(
      { message: "Error fetching user: ", userId },
      { status: 500 },
    );
  }

  const workshopResponse = await fetch("/api/workshop");
  if (!workshopResponse.ok) {
    return NextResponse.json(
      { message: "Error fetching workshop" },
      { status: 500 },
    );
  }
  const userData = (await userResponse.json()) as User;
  const workshops = (await workshopResponse.json()) as Workshop[];

  const reservedWorkshops = userData.workshops.map((workshopId) =>
    workshops.find((w) => w.id === workshopId),
  );
  const reservedDepartments = Array.from(
    new Set(...reservedWorkshops.map((workshop) => workshop?.department)),
  );
  const filteredWorkshop = workshops.filter(
    (workshop) => !reservedDepartments.includes(workshop.department),
  );

  return NextResponse.json(filteredWorkshop);
};
