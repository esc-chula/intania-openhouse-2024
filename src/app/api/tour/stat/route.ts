import { Tour } from "@/common/types/tour";
import { getAllDocuments } from "@/server/firebase/firestore/read";
import { NextResponse } from "next/server";

export const GET = async () => {
  const { result: tours, error } = await getAllDocuments("tours");

  if (error || !tours) {
    return NextResponse.json(
      { message: "Error fetching data" },
      { status: 500 },
    );
  }

  const data = tours.docs.map((doc) => {
    return { id: doc.id, ...doc.data() };
  }) as Tour[];

  const availableTours = data
    .filter((tour) => tour.users.length < tour.maxUser)
    .map((tour) => {
      return {
        date: tour.date,
        time: tour.time,
        availableSeats: tour.maxUser - tour.users.length,
      };
    });

  return NextResponse.json(availableTours);
};
