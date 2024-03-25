import { CancelWorksopSchema } from "@/common/schema/workshop";
import { getDocumentById } from "@/server/firebase/firestore/read";
import { updateDocument } from "@/server/firebase/firestore/update";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const parseResponse = CancelWorksopSchema.safeParse(body);

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

  await updateDocument("workshops", parsedData.workshopId, {
    users: workshop.result
      .data()
      .users?.filter((user: string) => user !== parsedData.userId),
  });

  await updateDocument("users", parsedData.userId, {
    workshops: user.result
      .data()
      .workshops?.filter(
        (workshop: string) => workshop !== parsedData.workshopId,
      ),
  });

  return NextResponse.json({ parsedData });
};
