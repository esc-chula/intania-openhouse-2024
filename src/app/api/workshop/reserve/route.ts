import { User } from "@/common/types/user";
import { Workshop } from "@/common/types/workshop";
import rawWorkshopsData from "@/data/workshops.json";
import { getDocumentById } from "@/server/firebase/firestore/read";
import { updateDocument } from "@/server/firebase/firestore/update";
import moment from "moment";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const parseResponse = z
    .object({
      userId: z.string(),
      workshopId: z.string(),
    })
    .safeParse(body);

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

  const workshopsData = workshop.result.data() as Workshop;
  const userData = user.result.data() as User;

  if (workshopsData.users.length >= workshopsData.maxUser) {
    return NextResponse.json(
      { message: "Workshop is fully reserved" },
      { status: 400 },
    );
  }

  if (workshopsData.users.includes(parsedData.userId)) {
    return NextResponse.json(
      { message: "User has already reserve the workshop" },
      { status: 400 },
    );
  }

  const reservedWorkshops = userData.workshops.map((workshopId) => {
    const workshopData = rawWorkshopsData.find(
      (workshop) => workshop.id === workshopId,
    )!;

    return workshopData;
  });

  const currentDateTime = moment(
    `${workshopsData.date} ${workshopsData.time.split(" - ")[0]}`,
    "DD/MM/YYYY HH:mm",
  );
  const currentEndTime = moment(
    `${workshopsData.date} ${workshopsData.time.split(" - ")[1]}`,
    "DD/MM/YYYY HH:mm",
  );

  for (let i = 0; i < reservedWorkshops.length; i++) {
    const comparedWorkshop = reservedWorkshops[i];
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
      return NextResponse.json({
        message: `ไม่สามารถจองได้ ช่วงเวลาตรงกับของ ${comparedWorkshop.department}`,
        status: 400,
      });
    }
  }

  const updatedWorkshop = await updateDocument(
    "workshops",
    parsedData.workshopId,
    {
      users: Array.from(new Set([...workshopsData.users, parsedData.userId])),
    },
  );

  const updatedUser = await updateDocument("users", parsedData.userId, {
    workshops: Array.from(
      new Set([...userData.workshops, parsedData.workshopId]),
    ),
  });

  return NextResponse.json({ updatedUser, updatedWorkshop });
};
