"use client";

import Header from "@/components/common/header";
import { createDocument } from "@/server/firebase/firestore/create";
import "firebase/firestore";
import { useState } from "react";
import { v4 as uuid } from "uuid";

export default function Register() {
  const [formData, setFormData] = useState({
    prefix: "",
    firstName: "",
    lastName: "",
    nickname: "",
    lineId: "",
    mobileNumber: "",
    email: "",
    guardianPhone: "",
    academicYear: "",
    course: "",
    school: "",
    howFound: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: save formData
    const id = uuid();
    createDocument("register", id, formData);
  };

  return (
    <>
      <Header />
      <div className="flex h-5/6 items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="flex w-full max-w-md flex-col items-center justify-center gap-5"
        >
          <input
            type="text"
            name="prefix"
            value={formData.prefix}
            onChange={handleChange}
            placeholder="คำนำหน้าชื่อ"
            className="input"
            required
          />
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="ชื่อจริง"
            className="input"
            required
          />

          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="นามสกุล"
            className="input"
            required
          />

          <input
            type="text"
            name="nickname"
            value={formData.nickname}
            onChange={handleChange}
            placeholder="ชื่อเล่น"
            className="input"
            required
          />

          <input
            type="text"
            name="lineId"
            value={formData.lineId}
            onChange={handleChange}
            placeholder="Line ID"
            className="input"
          />

          <input
            type="text"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleChange}
            placeholder="เบอร์โทรศัพท์มือถือ"
            className="input"
            required
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="อีเมล"
            className="input"
            required
          />

          <input
            type="text"
            name="guardianPhone"
            value={formData.guardianPhone}
            onChange={handleChange}
            placeholder="เบอร์โทรศัพท์ผู้ปกครอง"
            className="input"
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

          <button type="submit" className="btn">
            ส่งข้อมูล
          </button>
        </form>
      </div>
    </>
  );
}
