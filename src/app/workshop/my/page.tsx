"use client";

import { Tour } from "@/common/types/tour";
import { User } from "@/common/types/user";
import { Workshop } from "@/common/types/workshop";
import { fetcher } from "@/utils/axios";
import axios from "axios";
import { useRouter } from "next/navigation";
import { QRCodeSVG } from "qrcode.react";
import { useEffect, useState } from "react";
import useSWR from "swr";

export default function MyWorkshop() {
  const router = useRouter();

  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [tours, setTours] = useState<Tour[]>([]);
  const [userPhoneNumber] = useState<string>(
    (JSON.parse(localStorage.getItem("formData") ?? "{}") as User).mobileNumber,
  );

  const {
    data: userData,
    isLoading: isUserDataLoading,
    error: userDataError,
    mutate: mutateUserData,
  } = useSWR(`/api/user/${userPhoneNumber}`, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    revalidateOnMount: true,
  });

  useEffect(() => {
    if (!userData) {
      return;
    }

    const fetchWorkshops = async () => {
      try {
        const workshopsData = await Promise.all(
          (userData as User).workshops.map(async (workshopId) => {
            try {
              const response = await axios.get(`/api/workshop/${workshopId}`);
              return response.data;
            } catch (error) {
              console.error("Error fetching workshop:", error);
              return null;
            }
          }),
        );

        setWorkshops(workshopsData as Workshop[]);
      } catch (error) {
        console.error("Error fetching workshops:", error);
      }
    };

    const fetchTours = async () => {
      try {
        const toursData = await Promise.all(
          (userData as User).tours.map(async (tourId) => {
            try {
              const response = await axios.get(`/api/tour/${tourId}`);
              return response.data;
            } catch (error) {
              console.error("Error fetching tour:", error);
              return null;
            }
          }),
        );

        setTours(toursData as Tour[]);
      } catch (error) {
        console.error("Error fetching tours:", error);
      }
    };

    fetchWorkshops();
    fetchTours();
  }, [userData]);

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
            <div className="flex flex-col items-center space-y-3 pt-4">
              <button
                onClick={() => setQr(workshop.id)}
                className="w-[70px] rounded-full bg-primary px-3 py-1 text-[10px] text-white shadow-button-solid"
              >
                QR Code
              </button>
              <button
                onClick={async () => {
                  const confirm = window.confirm(
                    "ต้องการยกเลิกการลงทะเบียนใช่หรือไม่",
                  );

                  if (!confirm) {
                    return;
                  }

                  await axios
                    .post("/api/workshop/cancel", {
                      workshopId: workshop.id,
                      userId: userPhoneNumber,
                    })
                    .then(() => mutateUserData())
                    .catch((error) => {
                      console.error("Error cancelling workshop:", error);
                    });
                }}
                className="text-center text-xs text-gray-400"
              >
                ยกเลิก
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
            <div className="flex flex-col items-center space-y-3 pt-4">
              <button
                onClick={() => setQr(tour.id)}
                className="rounded-full bg-primary px-3 py-1 text-[10px] text-white shadow-button-solid"
              >
                QR Code
              </button>
              <button
                onClick={async () => {
                  const confirm = window.confirm(
                    "ต้องการยกเลิกการลงทะเบียนใช่หรือไม่",
                  );

                  if (!confirm) {
                    return;
                  }

                  await axios
                    .post("/api/tour/cancel", {
                      tourId: tour.id,
                      userId: userPhoneNumber,
                    })
                    .then(() => mutateUserData())
                    .catch((error) => {
                      console.error("Error cancelling tour:", error);
                    });
                }}
                className="text-center text-xs text-gray-400"
              >
                ยกเลิก
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
