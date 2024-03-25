import { CancelTourSchema } from "@/common/schema/tour";
import { getDocumentById } from "@/server/firebase/firestore/read";
import { updateDocument } from "@/server/firebase/firestore/update";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const parseResponse = CancelTourSchema.safeParse(body);

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
    return NextResponse.json(
      { message: "Workshop not found" },
      { status: 500 },
    );
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

  if (
    !tour.result.data().users?.includes(parsedData.userId) ||
    !user.result.data().tours?.includes(parsedData.tourId)
  ) {
    return NextResponse.json(
      { message: "User not registered in workshop" },
      { status: 400 },
    );
  }

  await updateDocument("tours", parsedData.tourId, {
    users: tour.result
      .data()
      .users?.filter((userId: string) => userId !== parsedData.userId),
  });

  await updateDocument("users", parsedData.userId, {
    tours: user.result
      .data()
      .tours?.filter((tourId: string) => tourId !== parsedData.tourId),
  });

  return NextResponse.json({ message: "Tour cancelled" });
};
