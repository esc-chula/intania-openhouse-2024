"use client";

import { Tour } from "@/common/types/tour";
import { Workshop } from "@/common/types/workshop";
import Button from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { useEffect, useState } from "react";

export default function ReserveWorkshop() {
  const userId = localStorage.getItem("formData") ?? {};
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [tours, setTours] = useState<Tour[]>([]);

  useEffect(() => {
    const fetchWorkshops = async () => {
      try {
        const workshopResponse = await fetch("/api/workshop", {
          method: "GET",
        });
        if (!workshopResponse) {
          throw new Error("Cannot fetch workshops");
        }

        setWorkshops(await workshopResponse.json());
      } catch (error) {
        console.error("Error fetching workshops:", error);
      }
    };
    const fetchTours = async () => {
      try {
        const tourResponse = await fetch("/api/tour", {
          method: "GET",
        });
        if (!tourResponse) {
          throw new Error("Cannot fetch tours");
        }

        setTours(await tourResponse.json());
      } catch (error) {
        console.error("Error fetching tours:", error);
      }
    };

    fetchWorkshops();
    fetchTours();
  }, []);

  const departments = [
    {
      value: "mock1",
      label: "Mock Department",
    },
    {
      value: "mock2",
      label: "Mock Department",
    },
  ];

  const dates = [
    {
      value: "mock1",
      label: "Mock Date",
    },
    {
      value: "mock2",
      label: "Mock Date",
    },
  ];

  const times = [
    {
      value: "mock1",
      label: "Mock Time",
    },
    {
      value: "mock2",
      label: "Mock Time",
    },
  ];

  const handleSubmit = () => {
    fetch("/api/workshop/reserve", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: mobileNumber, workshopId: workshopId }),
    });
    fetch("/api/tour/reserve", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: mobileNumber, tourId: tourId }),
    });
  };

  return (
    <div className="flex h-full w-full flex-col justify-between pb-14 pt-4">
      <div className="flex w-full flex-col items-center space-y-6">
        <h1 className="text-center text-3xl font-bold">
          ลงทะเบียน
          <br />
          Workshop
        </h1>
        <Select name="department" value="" onChange={() => {}}>
          <option value="" disabled hidden>
            ภาควิชา
          </option>
          {departments.map((department) => (
            <option
              key={department.value}
              value={department.value}
              className="text-black"
            >
              {department.label}
            </option>
          ))}
        </Select>
        <Select name="date" value="" onChange={() => {}}>
          <option value="" disabled hidden>
            วันที่
          </option>
          {dates.map((department) => (
            <option
              key={department.value}
              value={department.value}
              className="text-black"
            >
              {department.label}
            </option>
          ))}
        </Select>
        <Select name="time" value="" onChange={() => {}}>
          <option value="" disabled hidden>
            เวลา
          </option>
          {times.map((department) => (
            <option
              key={department.value}
              value={department.value}
              className="text-black"
            >
              {department.label}
            </option>
          ))}
        </Select>
      </div>

      <div className="mt-5 flex w-full flex-col items-center space-y-6 ">
        <h1 className="text-center text-3xl font-bold">Intania Tour</h1>
        <Select name="date" value="" onChange={() => {}}>
          <option value="" disabled hidden>
            วันที่
          </option>
          {dates.map((department) => (
            <option
              key={department.value}
              value={department.value}
              className="text-black"
            >
              {department.label}
            </option>
          ))}
        </Select>
        <Select name="time" value="" onChange={() => {}}>
          <option value="" disabled hidden>
            เวลา
          </option>
          {times.map((department) => (
            <option
              key={department.value}
              value={department.value}
              className="text-black"
            >
              {department.label}
            </option>
          ))}
        </Select>
      </div>

      <div className="flex flex-col items-center space-y-4">
        <p className="text-center text-xs">
          หากจำนวนคนเต็มแล้ว Workshop
          <br />
          ในภาควิชา วัน หรือ เวลา
          <br />
          จะไม่แสดงให้สามารถเลือกได้
        </p>
        <Button size="default" className="w-36" onClick={handleSubmit}>
          จอง
        </Button>
      </div>
    </div>
  );
}
