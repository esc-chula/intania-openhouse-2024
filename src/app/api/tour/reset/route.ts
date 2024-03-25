import { Tour } from "@/common/types/tour";
import { User } from "@/common/types/user";
import { getAllDocuments } from "@/server/firebase/firestore/read";
import { updateDocument } from "@/server/firebase/firestore/update";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  if (
    req.headers.get("Authorization")?.replace("Bearer ", "") !==
    process.env.SECRET_KEY
  ) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { result: users, error: usersError } = await getAllDocuments("users");
  const { result: tours, error: toursError } = await getAllDocuments("tours");

  if (usersError || !users) {
    return NextResponse.json(
      { message: "Error fetching users" },
      { status: 500 },
    );
  }

  if (toursError || !tours) {
    return NextResponse.json(
      { message: "Error fetching tours" },
      { status: 500 },
    );
  }

  const usersData = users.docs.map((doc) => {
    return { id: doc.id, ...(doc.data() as User) };
  });

  const toursData = tours.docs.map((doc) => {
    return { id: doc.id, ...doc.data() } as Tour;
  });

  for (const user of usersData) {
    let registeredTours = user.tours.map((tourId) => {
      const tourData = toursData.find((tour) => tour.id === tourId)!;

      return tourData;
    });

    for (const tour of registeredTours) {
      let duplicated = registeredTours;

      if (duplicated.length > 0) {
        const removingTours = duplicated;

        for (const removingTour of removingTours) {
          await updateDocument("tours", removingTour.id, {
            users: removingTour.users.filter((u) => u !== user.id),
          });

          registeredTours = registeredTours.filter(
            (w) => w.id !== removingTour.id,
          );
        }
      }
    }

    await updateDocument("users", user.id, {
      tours: registeredTours.map((tour) => tour.id),
    });
  }

  return NextResponse.json({ message: "All users' tours reset" });
};
