import { Workshop } from "@/common/types/workshop";
import { getAllDocuments } from "@/server/firebase/firestore/read";
import { NextResponse } from "next/server";

export const GET = async () => {
  const { result: workshops, error } = await getAllDocuments("workshops");

  if (error || !workshops) {
    return NextResponse.json(
      { message: "Error fetching data" },
      { status: 500 },
    );
  }

  const data = workshops.docs.map((doc) => {
    return { id: doc.id, ...doc.data() };
  }) as Workshop[];

  const availableWorkshops = data
    .filter((workshop) => workshop.users.length < workshop.maxUser)
    .map((workshop) => {
      return {
        department: workshop.department,
        date: workshop.date,
        time: workshop.time,
        availableSeats: workshop.maxUser - workshop.users.length,
      };
    });

  return NextResponse.json(availableWorkshops);
};
