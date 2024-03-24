"use client";

import { Tour } from "@/common/types/tour";
import { Workshop } from "@/common/types/workshop";
import Button from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { useEffect, useState } from "react";

export default function ReserveWorkshop() {
  const { mobileNumber } = JSON.parse(localStorage.getItem("formData") ?? "{}");
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [tours, setTours] = useState<Tour[]>([]);

  const [selectedWorkshopDepartment, setSelectedWorkshopDepartment] =
    useState("");
  const [selectedWorkshopDate, setSelectedWorkshopDate] = useState("");
  const [selectedWorkshopTime, setSelectedWorkshopTime] = useState("");
  const [selectedWorkshopId, setSelectedWorkshopId] = useState<string>("");

  const [selectedTourDate, setSelectedTourDate] = useState<string>("");
  const [selectedTourTime, setSelectedTourTime] = useState<string>("");
  const [selectedTourId, setSelectedTourId] = useState<string>("");

  useEffect(() => {
    const fetchWorkshops = async () => {
      try {
        const response = await fetch("/api/workshop");
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
        const response = await fetch("/api/tour");
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
  }, []);

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
    try {
      await Promise.all([
        fetch("/api/workshop/reserve", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: mobileNumber,
            workshopId: selectedWorkshopId,
          }),
        }),
        fetch("/api/tour/reserve", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: mobileNumber,
            tourId: selectedTourId,
          }),
        }),
      ]);
    } catch (error) {
      console.error("Error reserving:", error);
    }
  };

  const workshopDepartments = Array.from(
    new Set(workshops.map((workshop) => workshop.department)),
  );

  const workshopDates = workshops
    .filter((workshop) => workshop.department === selectedWorkshopDepartment)
    .map((workshop) => workshop.date);

  const workshopTimes = workshops
    .filter(
      (workshop) =>
        workshop.department === selectedWorkshopDepartment &&
        workshop.date === selectedWorkshopDate,
    )
    .map((workshop) => workshop.time);

  const tourDates = Array.from(new Set(tours.map((tour) => tour.date)));

  const tourTimes = tours
    .filter((tour) => tour.date === selectedTourDate)
    .map((tour) => tour.time);

  return (
    <div className="flex h-full w-full flex-col justify-between pb-14 pt-4">
      <div className="flex w-full flex-col items-center space-y-6">
        <h1 className="text-center text-3xl font-bold">
          ลงทะเบียน
          <br />
          Workshop
        </h1>
        <Select
          name="department"
          value={selectedWorkshopDepartment}
          onChange={(e) => setSelectedWorkshopDepartment(e.target.value)}
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
          onChange={(e) => setSelectedWorkshopDate(e.target.value)}
        >
          <option value="" disabled hidden>
            วันที่
          </option>
          {workshopDates.map((date) => (
            <option key={date} value={date} className="text-black">
              {date}
            </option>
          ))}
        </Select>
        <Select
          name="time"
          value={selectedWorkshopTime}
          onChange={(e) => setSelectedWorkshopTime(e.target.value)}
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

      <div className="flex w-full flex-col items-center space-y-6">
        <h1 className="text-center text-3xl font-bold">Intania Tour</h1>
        <Select
          name="date"
          value={selectedTourDate}
          onChange={(e) => setSelectedTourDate(e.target.value)}
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
