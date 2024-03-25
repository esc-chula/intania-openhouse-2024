import { Tour } from "@/common/types/tour";
import { Workshop } from "@/common/types/workshop";
import { getDocumentById } from "@/server/firebase/firestore/read";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  _req: NextRequest,
  {
    params: { userId },
  }: {
    params: { userId: string };
  },
) => {
  const { result, error } = await getDocumentById("users", userId);

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

  const userData = result.data();

  const userWorkshops = await Promise.all(
    userData.workshops.map(async (workshopId: string) => {
      const { result: workshopResult, error: workshopError } =
        await getDocumentById("workshops", workshopId);

      if (workshopError || !workshopResult) {
        return null;
      }

      const workshopData = workshopResult.data() as Workshop;

      return {
        id: workshopResult.id,
        department: workshopData.department,
        date: workshopData.date,
        time: workshopData.time,
        location: workshopData.location,
      };
    }),
  );

  const userTours = await Promise.all(
    userData.tours.map(async (tourId: string) => {
      const { result: tourResult, error: tourError } = await getDocumentById(
        "tours",
        tourId,
      );

      if (tourError || !tourResult) {
        return null;
      }

      const tourData = tourResult.data() as Tour;

      return {
        id: tourResult.id,
        maxUser: tourData.maxUser,
        date: tourData.date,
        time: tourData.time,
      };
    }),
  );

  return NextResponse.json({
    workshops: userWorkshops,
    tours: userTours,
  });
};
