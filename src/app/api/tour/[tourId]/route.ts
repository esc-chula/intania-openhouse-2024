import { getDocumentById } from "@/server/firebase/firestore/read";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  _req: NextRequest,
  {
    params: { tourId },
  }: {
    params: { tourId: string };
  },
) => {
  const { result, error } = await getDocumentById("tours", tourId);

  if (error || !result) {
    return NextResponse.json(
      { message: "Error fetching data" },
      { status: 500 },
    );
  }

  if (!result.exists()) {
    return NextResponse.json(
      { message: "Document does not exist" },
      { status: 404 },
    );
  }

  return NextResponse.json({ id: result.id, ...result.data() });
};
