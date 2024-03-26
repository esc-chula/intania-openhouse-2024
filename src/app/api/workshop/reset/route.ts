import { User } from "@/common/types/user";
import { Workshop } from "@/common/types/workshop";
import { getAllDocuments } from "@/server/firebase/firestore/read";
import { updateDocument } from "@/server/firebase/firestore/update";
import moment from "moment";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  if (
    req.headers.get("Authorization")?.replace("Bearer ", "") !==
    process.env.SECRET_KEY
  ) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { result: users, error: usersError } = await getAllDocuments("users");
  const { result: workshops, error: workshopsError } =
    await getAllDocuments("workshops");

  if (usersError || !users) {
    return NextResponse.json(
      { message: "Error fetching users" },
      { status: 500 },
    );
  }

  if (workshopsError || !workshops) {
    return NextResponse.json(
      { message: "Error fetching workshops" },
      { status: 500 },
    );
  }

  const usersData = users.docs.map((doc) => {
    return { id: doc.id, ...(doc.data() as User) };
  });

  const workshopsData = workshops.docs.map((doc) => {
    return { id: doc.id, ...doc.data() } as Workshop;
  });

  for (const user of usersData) {
    let registeredWorkshops = user.workshops.map((workshopId) => {
      const workshopData = workshopsData.find(
        (workshop) => workshop.id === workshopId,
      )!;

      return workshopData;
    });

    // Remove workshop with overlapping date and time first
    registeredWorkshops = registeredWorkshops.filter((workshop, index) => {
      const currentDateTime = moment(
        `${workshop.date} ${workshop.time.split(" - ")[0]}`,
        "DD/MM/YYYY HH:mm",
      );
      const currentEndTime = moment(
        `${workshop.date} ${workshop.time.split(" - ")[1]}`,
        "DD/MM/YYYY HH:mm",
      );

      for (let i = 0; i < index; i++) {
        const comparedWorkshop = registeredWorkshops[i];
        const comparedDateTime = moment(
          `${comparedWorkshop.date} ${comparedWorkshop.time.split(" - ")[0]}`,
          "DD/MM/YYYY HH:mm",
        );
        const comparedEndTime = moment(
          `${comparedWorkshop.date} ${comparedWorkshop.time.split(" - ")[1]}`,
          "DD/MM/YYYY HH:mm",
        );

        if (
          currentDateTime.isBetween(comparedDateTime, comparedEndTime) ||
          currentEndTime.isBetween(comparedDateTime, comparedEndTime) ||
          comparedDateTime.isBetween(currentDateTime, currentEndTime) ||
          comparedEndTime.isBetween(currentDateTime, currentEndTime)
        ) {
          return false;
        }
      }

      return true;
    });

    // Remove duplicated workshops with same department after removing overlaps
    for (const workshop of registeredWorkshops) {
      let duplicated = registeredWorkshops.filter(
        (w) => w.department === workshop.department && w.id !== workshop.id,
      );

      if (duplicated.length > 0) {
        const removingWorkshops = duplicated;

        for (const removingWorkshop of removingWorkshops) {
          await updateDocument("workshops", removingWorkshop.id, {
            users: removingWorkshop.users.filter((u) => u !== user.id),
          });

          registeredWorkshops = registeredWorkshops.filter(
            (w) => w.id !== removingWorkshop.id,
          );
        }
      }
    }

    await updateDocument("users", user.id, {
      workshops: registeredWorkshops.map((workshop) => workshop.id),
    });
  }

  return NextResponse.json({ message: "All users' workshops reset" });
};
