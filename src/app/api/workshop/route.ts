import { WorkshopSchema } from "@/common/schema/workshop";
import { Workshop } from "@/common/types/workshop";
import { createDocument } from "@/server/firebase/firestore/create";
import { getAllDocuments } from "@/server/firebase/firestore/read";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuid } from "uuid";

export const GET = async (req: NextRequest) => {
  const { result, error } = await getAllDocuments("workshops");

  if (error || !result) {
    return NextResponse.json(
      { message: "Error fetching data" },
      { status: 500 },
    );
  }

  const data = result.docs
    .map((doc) => {
      const workshop = { id: doc.id, ...doc.data() } as Workshop;
      if (workshop.users.length < workshop.maxUser) {
        return workshop;
      }
      return null;
    })
    .filter(Boolean);

  return NextResponse.json(data);
};

export const POST = async (req: NextRequest) => {
  if (
    req.headers.get("Authorization")?.replace("Bearer ", "") !==
    process.env.SECRET_KEY
  ) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  const parseResponse = WorkshopSchema.safeParse(body);

  if (!parseResponse.success) {
    return NextResponse.json(
      { message: "Invalid request body", error: parseResponse.error },
      { status: 400 },
    );
  }

  const id = uuid();
  const { result, error } = await createDocument("workshops", id, {
    ...parseResponse.data,
    users: [],
  });

  if (error || !result) {
    return NextResponse.json(
      { message: "Error creating document" },
      { status: 500 },
    );
  }

  return NextResponse.json({ id, ...result });
};
