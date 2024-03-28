import { User } from "@/common/types/user";
import { Workshop } from "@/common/types/workshop";
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
      workshopId: z.string(),
    })
    .safeParse(body);

  if (!parseResponse.success) {
    return NextResponse.json(
      { message: "Invalid request body", error: parseResponse.error },
      { status: 400 },
    );
  }

  const parsedData = parseResponse.data;

  const workshop = await getDocumentById("workshops", parsedData.workshopId);

  if (workshop.error || !workshop.result) {
    return NextResponse.json(
      { message: "Error fetching data" },
      { status: 500 },
    );
  }

  if (!workshop.result.exists()) {
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

  const workshopsData = workshop.result.data() as Workshop;
  const userData = user.result.data() as User;

  const updatedWorkshop = await updateDocument(
    "workshops",
    parsedData.workshopId,
    {
      users: Array.from(new Set([...workshopsData.users, parsedData.userId])),
    },
  );

  const updatedUser = await updateDocument("users", parsedData.userId, {
    workshops: Array.from(
      new Set([...userData.workshops, parsedData.workshopId]),
    ),
  });

  return NextResponse.json({ updatedUser, updatedWorkshop });
};
