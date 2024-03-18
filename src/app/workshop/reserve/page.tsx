"use client";

import Button from "@/components/ui/button";
import { Select } from "@/components/ui/select";

export default function ReserveWorkshop() {
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
      <div className="flex flex-col items-center space-y-4">
        <p className="text-center text-xs">
          หากจำนวนคนเต็มแล้ว Workshop
          <br />
          ในภาควิชา วัน หรือ เวลา
          <br />
          จะไม่แสดงให้สามารถเลือกได้
        </p>
        <Button size="default" className="w-36">
          จอง
        </Button>
      </div>
    </div>
  );
}
