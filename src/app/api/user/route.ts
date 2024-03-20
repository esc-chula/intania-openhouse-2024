import { UserSchema } from "@/common/schema/user";
import { createDocument } from "@/server/firebase/firestore/create";
import { getAllDocuments } from "@/server/firebase/firestore/read";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuid } from "uuid";

export const GET = async () => {
  const { result, error } = await getAllDocuments("users");

  if (error || !result) {
    return NextResponse.json(
      { message: "Error fetching data" },
      { status: 500 },
    );
  }

  const data = result.docs.map((doc) => {
    return { id: doc.id, ...doc.data() };
  });

  return NextResponse.json(data);
};

export const POST = async (req: NextRequest) => {
  const body = await req.json();

  const parseResponse = UserSchema.safeParse(body);

  if (!parseResponse.success) {
    return NextResponse.json(
      { message: "Invalid request body", error: parseResponse.error },
      { status: 400 },
    );
  }

  const id = uuid();
  const { result, error } = await createDocument("users", id, {
    ...parseResponse.data,
    workshops: [],
  });

  if (error || !result) {
    return NextResponse.json(
      { message: "Error creating document" },
      { status: 500 },
    );
  }

  return NextResponse.json({ id, ...result });
};
