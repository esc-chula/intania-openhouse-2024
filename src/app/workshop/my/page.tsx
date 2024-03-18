"use client";

import { QRCodeSVG } from "qrcode.react";
import { useState } from "react";

export default function MyWorkshop() {
  const workshops = [
    {
      id: "this-will-be-random-very-soon-1",
      department: "ภาควิชาคอมพิวเตอร์",
      date: "30/03/2024",
      time: "13:00 - 14:30",
      location: "ห้อง 18-16 อาคารเจริญวิศวกรรม (ตึก 4)",
    },
    {
      id: "this-will-be-random-very-soon-2",
      department: "ภาควิชาคอมพิวเตอร์",
      date: "30/03/2024",
      time: "13:00 - 14:30",
      location: "ห้อง 18-16 อาคารเจริญวิศวกรรม (ตึก 4)",
    },
  ];

  const [qr, setQr] = useState<string>("");

  return (
    <>
      {qr && (
        <div
          onClick={() => setQr("")}
          className="fixed inset-0  flex items-center justify-center bg-black bg-opacity-50"
        >
          <div className="rounded-xl bg-white p-6">
            <div className="flex justify-center">
              <QRCodeSVG value={qr} size={256} />
            </div>
          </div>
        </div>
      )}
      <div className="flex w-full flex-col items-center space-y-6 pt-4">
        {workshops.map((workshop) => (
          <div
            key={workshop.id}
            className="flex w-full items-center justify-between rounded-3xl bg-white bg-button-solid p-4 shadow-button-solid"
          >
            <div>
              <h2 className="text-xl font-bold text-primary">
                {workshop.department}
              </h2>
              <p className="font-bold text-gray-500">
                {workshop.date} {workshop.time}
              </p>
              <p className="mt-2 text-xs text-gray-400">{workshop.location}</p>
            </div>
            <div>
              <button
                onClick={() => setQr(workshop.id)}
                className="rounded-full bg-primary px-3 py-1 text-[10px] text-white shadow-button-solid"
              >
                QR Code
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
