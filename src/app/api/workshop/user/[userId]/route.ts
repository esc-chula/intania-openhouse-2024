import { User } from "@/common/types/user";
import { Workshop } from "@/common/types/workshop";
import {
  getAllDocuments,
  getDocumentById,
} from "@/server/firebase/firestore/read";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  _req: NextRequest,
  {
    params: { userId },
  }: {
    params: { userId: string };
  },
) => {
  const { result, error } = await getAllDocuments("workshops");

  if (error || !result) {
    return NextResponse.json(
      { message: "Error fetching data" },
      { status: 500 },
    );
  }

  const workshopsData = result.docs
    .map((doc) => {
      const workshop = { id: doc.id, ...doc.data() } as Workshop;
      if (workshop.users.length < workshop.maxUser) {
        const { users, ...rest } = workshop;
        return rest;
      }
      return null;
    })
    .filter(Boolean) as Workshop[];

  const user = await getDocumentById("users", userId);

  if (user.error || !user.result) {
    return NextResponse.json(
      { message: "Error fetching data" },
      { status: 500 },
    );
  }

  if (!user.result.exists()) {
    return NextResponse.json({ message: "User not found" }, { status: 500 });
  }

  const userData = user.result.data() as User;

  const reservedWorkshops = userData.workshops.map((workshopId) =>
    workshopsData.find((workshop) => workshop.id === workshopId),
  );
  const reservedDepartments = Array.from(
    new Set(...reservedWorkshops.map((workshop) => workshop?.department)),
  );
  const filteredWorkshop = workshopsData.filter(
    (workshop) => !reservedDepartments.includes(workshop.department),
  );

  return NextResponse.json(filteredWorkshop);
};
