import { createDocument } from "@/server/firebase/firestore/create";
import { getAllDocuments } from "@/server/firebase/firestore/read";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuid } from "uuid";
import z from "zod";

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

  const parseResponse = z
    .object({
      prefix: z.string(),
      firstName: z.string(),
      lastName: z.string(),
      nickname: z.string(),
      lineId: z.string(),
      mobileNumber: z.string(),
      email: z.string().email(),
      guardianPhone: z.string(),
      academicYear: z.optional(z.string()),
      course: z.optional(z.string()),
      school: z.optional(z.string()),
      howFound: z.optional(z.string()),
    })
    .safeParse(body);

  if (!parseResponse.success) {
    return NextResponse.json(
      { message: "Invalid request body", error: parseResponse.error },
      { status: 400 },
    );
  }

  const id = uuid();
  const { result, error } = await createDocument("users", id, {
    prefix: parseResponse.data.prefix,
    firstName: parseResponse.data.firstName,
    lastName: parseResponse.data.lastName,
    nickname: parseResponse.data.nickname,
    lineId: parseResponse.data.lineId,
    mobileNumber: parseResponse.data.mobileNumber,
    email: parseResponse.data.email,
    guardianPhone: parseResponse.data.guardianPhone,
  });

  if (error || !result) {
    return NextResponse.json(
      { message: "Error creating document" },
      { status: 500 },
    );
  }

  return NextResponse.json({ id, ...result });
};
