import { Tour } from "@/common/types/tour";
import { User } from "@/common/types/user";
import { getDocumentById } from "@/server/firebase/firestore/read";
import { updateDocument } from "@/server/firebase/firestore/update";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export const POST = async (req: NextRequest) => {
  if (
    req.headers.get("Authorization")?.replace("Bearer ", "") !==
    process.env.SECRET_KEY
  ) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const parseResponse = z
    .object({
      userId: z.string(),
      tourId: z.string(),
    })
    .safeParse(body);

  if (!parseResponse.success) {
    return NextResponse.json(
      { message: "Invalid request body", error: parseResponse.error },
      { status: 400 },
    );
  }

  const parsedData = parseResponse.data;

  const tour = await getDocumentById("tours", parsedData.tourId);

  if (tour.error || !tour.result) {
    return NextResponse.json(
      { message: "Error fetching data" },
      { status: 500 },
    );
  }

  if (!tour.result.exists()) {
    return NextResponse.json({ message: "Tour not found" }, { status: 500 });
  }

  const user = await getDocumentById("users", parsedData.userId);

  if (user.error || !user.result) {
    return NextResponse.json(
      { message: "Error fetching data" },
      { status: 500 },
    );
  }

  if (!user.result.exists()) {
    return NextResponse.json({ message: "User not found" }, { status: 500 });
  }

  const tourData = tour.result.data() as Tour;
  const userData = user.result.data() as User;

  if (tourData.users.includes(parsedData.userId)) {
    return NextResponse.json(
      { message: "User has already reserve the tour" },
      { status: 400 },
    );
  }

  const updatedTour = await updateDocument("tours", parsedData.tourId, {
    users: Array.from(new Set([...tourData.users, parsedData.userId])),
  });

  const updatedUser = await updateDocument("users", parsedData.userId, {
    tours: Array.from(new Set([...userData.tours, parsedData.tourId])),
  });

  return NextResponse.json({ updatedUser, updatedTour });
};
