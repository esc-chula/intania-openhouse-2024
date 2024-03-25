import { UserSchema } from "@/common/schema/user";
import { createDocument } from "@/server/firebase/firestore/create";
import { getDocumentById } from "@/server/firebase/firestore/read";
import { updateDocument } from "@/server/firebase/firestore/update";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const body = await req.json();

  const parseResponse = UserSchema.safeParse(body);

  if (!parseResponse.success) {
    return NextResponse.json(
      { message: "Invalid request body", error: parseResponse.error },
      { status: 400 },
    );
  }

  const getResponse = await getDocumentById(
    "users",
    parseResponse.data.mobileNumber,
  );

  if (getResponse.error || !getResponse.result) {
    return NextResponse.json(
      { message: "Error fetching data" },
      { status: 500 },
    );
  }

  if (getResponse.result.exists()) {
    const { workshops, tours, ...rest } = parseResponse.data;
    const { result, error } = await updateDocument(
      "users",
      parseResponse.data.mobileNumber,
      rest,
    );

    return NextResponse.json(result);
  }

  const { result, error } = await createDocument(
    "users",
    parseResponse.data.mobileNumber,
    {
      ...parseResponse.data,
      workshops: [],
      tours: [],
    },
  );

  if (error || !result) {
    return NextResponse.json(
      { message: "Error creating new user" },
      { status: 500 },
    );
  }

  return NextResponse.json(result);
};
