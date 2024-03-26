import { Tour } from "@/common/types/tour";
import { User } from "@/common/types/user";
import {
  getAllDocuments,
  getDocumentById,
} from "@/server/firebase/firestore/read";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  _req: NextRequest,
  {
    params: { userId },
  }: {
    params: { userId: string };
  },
) => {
  const user = await getDocumentById("users", userId);

  if (user.error || !user.result) {
    return NextResponse.json(
      { message: "Error fetching data" },
      { status: 500 },
    );
  }

  if (!user.result.exists()) {
    return NextResponse.json({ message: "User not found" }, { status: 500 });
  }

  const userData = user.result.data() as User;

  if (userData.tours.length > 0) return NextResponse.json([]);

  const { result, error } = await getAllDocuments("tours");

  if (error || !result) {
    return NextResponse.json(
      { message: "Error fetching data" },
      { status: 500 },
    );
  }

  const data = result.docs
    .map((doc) => {
      const tour = { id: doc.id, ...doc.data() } as Tour;
      if (tour.users.length < tour.maxUser) {
        const { users, ...rest } = tour;
        return rest;
      }
      return null;
    })
    .filter(Boolean);

  return NextResponse.json(data);
};
