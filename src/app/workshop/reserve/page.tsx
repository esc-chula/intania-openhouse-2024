"use client";

import { Tour } from "@/common/types/tour";
import { User } from "@/common/types/user";
import { Workshop } from "@/common/types/workshop";
import Button from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ReserveWorkshop() {
  const router = useRouter();

  const [mobileNumber, setMobileNumber] = useState<string>("");
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const [selectedWorkshopDepartment, setSelectedWorkshopDepartment] =
    useState("");
  const [selectedWorkshopDate, setSelectedWorkshopDate] = useState("");
  const [selectedWorkshopTime, setSelectedWorkshopTime] = useState("");
  const [selectedWorkshopId, setSelectedWorkshopId] = useState<string>("");

  const [selectedTourDate, setSelectedTourDate] = useState<string>("");
  const [selectedTourTime, setSelectedTourTime] = useState<string>("");
  const [selectedTourId, setSelectedTourId] = useState<string>("");

  useEffect(() => {
    const formData = JSON.parse(
      localStorage.getItem("formData") ?? "{}",
    ) as User;

    if (!formData.mobileNumber) {
      router.push("/register");
    }

    setMobileNumber(formData.mobileNumber);

    const fetchWorkshops = async () => {
      try {
        const response = await fetch(
          "/api/workshop/user/" + formData.mobileNumber,
        );
        if (!response.ok) {
          throw new Error("Failed to fetch workshops");
        }
        const data = await response.json();
        setWorkshops(data);
      } catch (error) {
        console.error("Error fetching workshops:", error);
      }
    };

    const fetchTours = async () => {
      try {
        const response = await fetch("/api/tour/user/" + formData.mobileNumber);
        if (!response.ok) {
          throw new Error("Failed to fetch tours");
        }
        const data = await response.json();
        setTours(data);
      } catch (error) {
        console.error("Error fetching tours:", error);
      }
    };

    fetchWorkshops();
    fetchTours();
  }, [router, mobileNumber]);

  useEffect(() => {
    const selectedWorkshop = workshops.find(
      (workshop) =>
        workshop.department === selectedWorkshopDepartment &&
        workshop.date === selectedWorkshopDate &&
        workshop.time === selectedWorkshopTime,
    );
    if (selectedWorkshop) {
      setSelectedWorkshopId(selectedWorkshop.id);
    } else {
      setSelectedWorkshopId("");
    }
  }, [
    selectedWorkshopDepartment,
    selectedWorkshopDate,
    selectedWorkshopTime,
    workshops,
  ]);

  useEffect(() => {
    const selectedTour = tours.find(
      (tour) =>
        tour.date === selectedTourDate && tour.time === selectedTourTime,
    );
    if (selectedTour) {
      setSelectedTourId(selectedTour.id);
    } else {
      setSelectedTourId("");
    }
  }, [selectedTourTime, selectedTourDate, tours]);

  const handleSubmit = async () => {
    setLoading(true);

    try {
      if (selectedWorkshopId !== "") {
        const response = await fetch("/api/workshop/reserve", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: mobileNumber,
            workshopId: selectedWorkshopId,
          }),
        });

        if (response.status === 400) {
          alert((await response.json()).message);
        }
      }

      if (selectedTourId !== "") {
        await fetch("/api/tour/reserve", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: mobileNumber,
            tourId: selectedTourId,
          }),
        });
      }

      router.push("/workshop/my");
    } catch (error) {
      console.error("Error reserving:", error);
    }

    setLoading(false);
  };

  const workshopDepartments = Array.from(
    new Set(workshops.map((workshop) => workshop.department)),
  ).sort();

  const workshopDates = workshops
    .filter((workshop) => workshop.department === selectedWorkshopDepartment)
    .map((workshop) => workshop.date)
    .sort();

  const workshopTimes = workshops
    .filter(
      (workshop) =>
        workshop.department === selectedWorkshopDepartment &&
        workshop.date === selectedWorkshopDate,
    )
    .map((workshop) => workshop.time)
    .sort((a, b) => {
      const timeA = a.split(" - ")[0];
      const timeB = b.split(" - ")[0];
      const [aHours, aMinutes] = timeA.split(":").map(Number);
      const [bHours, bMinutes] = timeB.split(":").map(Number);

      if (aHours !== bHours) {
        return aHours - bHours;
      } else {
        return aMinutes - bMinutes;
      }
    });

  const tourDates = Array.from(new Set(tours.map((tour) => tour.date))).sort();

  const tourTimes = tours
    .filter((tour) => tour.date === selectedTourDate)
    .map((tour) => tour.time)
    .sort((a, b) => {
      const timeA = a.split(" - ")[0];
      const timeB = b.split(" - ")[0];
      const [aHours, aMinutes] = timeA.split(":").map(Number);
      const [bHours, bMinutes] = timeB.split(":").map(Number);

      if (aHours !== bHours) {
        return aHours - bHours;
      } else {
        return aMinutes - bMinutes;
      }
    });

  return (
    <div className="flex h-full w-full flex-col justify-between space-y-14 pb-14 pt-4">
      <div className="flex w-full flex-col items-center space-y-6">
        <h1 className="text-center text-3xl font-bold">
          ลงทะเบียน
          <br />
          Workshop
        </h1>
        <Select
          name="department"
          value={selectedWorkshopDepartment}
          onChange={(e) => {
            setSelectedWorkshopDepartment(e.target.value);
            setSelectedWorkshopDate("");
            setSelectedWorkshopTime("");
            setSelectedWorkshopId("");
          }}
        >
          <option value="" disabled hidden>
            ภาควิชา
          </option>
          {workshopDepartments.map((department) => (
            <option key={department} value={department} className="text-black">
              {department}
            </option>
          ))}
        </Select>
        <Select
          name="date"
          value={selectedWorkshopDate}
          onChange={(e) => {
            setSelectedWorkshopDate(e.target.value);
            setSelectedWorkshopTime("");
            setSelectedWorkshopId("");
          }}
        >
          <option value="" disabled hidden>
            วันที่
          </option>
          {/* group by date (remove dupe) then map */}
          {workshopDates
            .filter((date, index, self) => self.indexOf(date) === index)
            .map((date) => (
              <option key={date} value={date} className="text-black">
                {date}
              </option>
            ))}
        </Select>
        <Select
          name="time"
          value={selectedWorkshopTime}
          onChange={(e) => {
            setSelectedWorkshopTime(e.target.value);
          }}
        >
          <option value="" disabled hidden>
            เวลา
          </option>
          {workshopTimes.map((time) => (
            <option key={time} value={time} className="text-black">
              {time}
            </option>
          ))}
        </Select>
      </div>

      {tours.length > 0 ? (
        <div className="flex w-full flex-col items-center space-y-6">
          <h1 className="text-center text-3xl font-bold">Intania Tour</h1>
          <Select
            name="date"
            value={selectedTourDate}
            onChange={(e) => {
              setSelectedTourDate(e.target.value);
              setSelectedTourTime("");
              setSelectedTourId("");
            }}
          >
            <option value="" disabled hidden>
              วันที่
            </option>
            {tourDates.map((date) => (
              <option key={date} value={date} className="text-black">
                {date}
              </option>
            ))}
          </Select>
          <Select
            name="time"
            value={selectedTourTime}
            onChange={(e) => setSelectedTourTime(e.target.value)}
          >
            <option value="" disabled hidden>
              เวลา
            </option>
            {tourTimes.map((time) => (
              <option key={time} value={time} className="text-black">
                {time}
              </option>
            ))}
          </Select>
        </div>
      ) : null}

      <div className="flex flex-col items-center space-y-4 pb-6 text-center">
        <p className="text-xs">
          หากจำนวนคนเต็มแล้ว Workshop
          <br />
          ในภาควิชา วัน หรือ เวลา
          <br />
          จะไม่แสดงให้สามารถเลือกได้
        </p>
        <p className="text-xs">
          หมายเหตุ:
          <br />
          สามารถลงทะเบียน 1 Workshop ได้ต่อ 1 ภาควิชา
          <br />
          และ Intania Tour ได้ 1 รอบ
        </p>
        <Button
          size="default"
          className="w-36"
          onClick={handleSubmit}
          disabled={loading}
        >
          จอง
        </Button>
      </div>
    </div>
  );
}
