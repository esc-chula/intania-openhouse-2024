"use client";

import { Tour } from "@/common/types/tour";
import { User } from "@/common/types/user";
import { Workshop } from "@/common/types/workshop";
import { useRouter } from "next/navigation";
import { QRCodeSVG } from "qrcode.react";
import { useEffect, useState } from "react";

export default function MyWorkshop() {
  const router = useRouter();

  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [tours, setTours] = useState<Tour[]>([]);

  useEffect(() => {
    const userFormData = localStorage.getItem("formData");

    if (!userFormData) {
      router.push("/register");
      return;
    }

    const userPhoneNumber = (JSON.parse(userFormData) as User).mobileNumber;

    const fetchWorkshops = async () => {
      try {
        const userResponse = await fetch("/api/user/" + userPhoneNumber, {
          method: "GET",
        });
        if (!userResponse) {
          throw new Error("Cannot fetch user or User does not exist");
        }

        const userData = (await userResponse.json()) as User;
        const workshopsData = (await Promise.all(
          userData.workshops.map(async (workshopId) => {
            const response = await fetch("/api/workshop/" + workshopId, {
              method: "GET",
            });
            if (!response) {
              throw new Error(
                "Cannot fetch workshop or Workshop does not exist",
              );
            }
            return response.json();
          }),
        )) as Workshop[];

        setWorkshops(workshopsData);
      } catch (error) {
        console.error("Error fetching workshops:", error);
      }
    };

    const fetchTours = async () => {
      try {
        const userResponse = await fetch("/api/user/" + userPhoneNumber, {
          method: "GET",
        });
        if (!userResponse) {
          throw new Error("Cannot fetch user or User does not exist");
        }

        const userData = (await userResponse.json()) as User;
        const toursData = (await Promise.all(
          userData.tours.map(async (tourId) => {
            const response = await fetch("/api/tour/" + tourId, {
              method: "GET",
            });
            if (!response) {
              throw new Error("Cannot fetch tour or Tour does not exist");
            }
            return response.json();
          }),
        )) as Workshop[];

        setTours(toursData);
      } catch (error) {
        console.error("Error fetching workshops:", error);
      }
    };

    fetchWorkshops();
    fetchTours();
  }, [router]);

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

      <div className="flex w-full flex-col items-center space-y-6 pt-4">
        {tours.map((tour) => (
          <div
            key={tour.id}
            className="flex w-full items-center justify-between rounded-3xl bg-white bg-button-solid p-4 shadow-button-solid"
          >
            <div>
              <h2 className="text-xl font-bold text-primary">Intania Tour</h2>
              <p className="font-bold text-gray-500">
                {tour.date} {tour.time}
              </p>
            </div>
            <div>
              <button
                onClick={() => setQr(tour.id)}
                className="rounded-full bg-primary px-3 py-1 text-[10px] text-white shadow-button-solid"
              >
                QR Code
              </button>
            </div>
          </div>
        ))}
      </div>

      {workshops.length === 0 && tours.length === 0 && (
        <div className="flex w-full items-center justify-center">
          <p className="text-center text-xl font-bold text-white/60">
            ยังไม่มีข้อมูลการลงทะเบียน
          </p>
        </div>
      )}
    </>
  );
}
