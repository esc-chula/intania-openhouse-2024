import { User } from "@/common/types/user";
import { Workshop } from "@/common/types/workshop";
import { getDocumentById } from "@/server/firebase/firestore/read";
import { updateDocument } from "@/server/firebase/firestore/update";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export const POST = async (req: NextRequest) => {
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

  const workshopData = workshop.result.data() as Workshop;
  const userData = user.result.data() as User;

  if (workshopData.users.length >= workshopData.maxUser) {
    return NextResponse.json(
      { message: "Workshop is fully reserved" },
      { status: 400 },
    );
  }

  if (workshopData.users.includes(parsedData.userId)) {
    return NextResponse.json(
      { message: "User has already reserve the workshop" },
      { status: 400 },
    );
  }

  const updatedWorkshop = await updateDocument(
    "workshops",
    parsedData.workshopId,
    {
      users: Array.from(new Set([...workshopData.users, parsedData.userId])),
    },
  );

  if (updatedWorkshop.error || !updatedWorkshop.result) {
    return NextResponse.json(
      { message: "Error updating workshop" },
      { status: 500 },
    );
  }

  const updatedUser = await updateDocument("users", parsedData.workshopId, {
    workshops: Array.from(new Set([...userData.workshops, parsedData.userId])),
  });

  if (updatedUser.error || !updatedUser.result) {
    return NextResponse.json(
      { message: "Error updating user" },
      { status: 500 },
    );
  }

  return NextResponse.json(updatedUser, updatedWorkshop);
};

export const DELETE = async (req: NextRequest) => {
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

  const { result, error } = await getDocumentById(
    "workshops",
    parsedData.workshopId,
  );

  if (error || !result) {
    return NextResponse.json(
      { message: "Error fetching data" },
      { status: 500 },
    );
  }

  if (!result.exists()) {
    return NextResponse.json(
      { message: "Workshop not found" },
      { status: 500 },
    );
  }

  const workshopData = result.data() as Workshop;

  if (!workshopData.users.includes(parsedData.userId)) {
    return NextResponse.json(
      { message: "User has not already reserve the workshop" },
      { status: 400 },
    );
  }

  const update = await updateDocument("workshops", parsedData.workshopId, {
    users: workshopData.users.filter((userId) => userId !== parsedData.userId),
  });

  if (update.error || !update.result) {
    return NextResponse.json(
      { message: "Error updating workshop" },
      { status: 500 },
    );
  }

  return NextResponse.json(update);
};
