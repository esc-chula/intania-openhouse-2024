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

  if (workshopData.users.length === workshopData.maxUser) {
    return NextResponse.json(
      { message: "Workshop is fully reserved" },
      { status: 400 },
    );
  }

  const update = await updateDocument("workshops", parsedData.workshopId, {
    users: [],
  });

  if (update.error || !update.result) {
    return NextResponse.json(
      { message: "Error updating workshop" },
      { status: 500 },
    );
  }

  return NextResponse.json(update);
};
