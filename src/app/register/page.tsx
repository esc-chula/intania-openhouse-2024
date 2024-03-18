"use client";

import { User } from "@/common/types/user";
import Header from "@/components/common/header";
import Button from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import "firebase/firestore";
import { FormEvent, useEffect, useState } from "react";

export default function Register() {
  const [formData, setFormData] = useState<User>({
    prefix: "",
    firstName: "",
    lastName: "",
    nickname: "",
    lineId: "",
    mobileNumber: "",
    email: "",
    guardianPhone: "",
  });

  useEffect(() => {
    const storedFormData = localStorage.getItem("formData");
    if (storedFormData) {
      setFormData(JSON.parse(storedFormData));
    }
  }, []);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    localStorage.setItem("formData", JSON.stringify(formData));
    fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
  };

  return (
    <>
      <Header />
      <div className="flex h-5/6 items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="flex w-full max-w-md flex-col items-center justify-center gap-5"
        >
          <Select
            name="prefix"
            value={formData.prefix}
            className="input"
            onChange={handleChange}
            required
          >
            <option value="" disabled hidden>
              เลือกคำนำหน้า
            </option>
            <option value="male" className="text-black">
              ชาย
            </option>
            <option value="female" className="text-black">
              หญิง
            </option>
          </Select>
          <Input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="ชื่อจริง"
            required
          />

          <Input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="นามสกุล"
            required
          />

          <Input
            type="text"
            name="nickname"
            value={formData.nickname}
            onChange={handleChange}
            placeholder="ชื่อเล่น"
            required
          />

          <Input
            type="text"
            name="lineId"
            value={formData.lineId}
            onChange={handleChange}
            placeholder="Line ID"
          />

          <Input
            type="text"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleChange}
            placeholder="เบอร์โทรศัพท์มือถือ"
            required
          />

          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="อีเมล"
            required
          />

          <Input
            type="text"
            name="guardianPhone"
            value={formData.guardianPhone}
            onChange={handleChange}
            placeholder="เบอร์โทรศัพท์ผู้ปกครอง"
            required
          />

          {/* 
            <input
              type="text"
              name="academicYear"
              value={formData.academicYear}
              onChange={handleChange}
              placeholder="ปีการศึกษา"
              className="input"
            />
          
            <input
              type="text"
              name="course"
              value={formData.course}
              onChange={handleChange}
              placeholder="หลักสูตร"
              className="input"
            />
          
            <input
              type="text"
              name="school"
              value={formData.school}
              onChange={handleChange}
              placeholder="โรงเรียน"
              className="input"
            />
          
            <input
              type="text"
              name="howFound"
              value={formData.howFound}
              onChange={handleChange}
              placeholder="รู้จักงานนี้จากที่ไหน"
              className="input"
            />
          */}

          <Button type="submit"> ไปต่อ </Button>
        </form>
      </div>
    </>
  );
}
