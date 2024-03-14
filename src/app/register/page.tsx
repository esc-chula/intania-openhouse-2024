"use client";

import Header from "@/components/common/header";
import { createDocument } from "@/server/firebase/firestore/create";
import "firebase/firestore";
import { useState } from "react";

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
    const id = "someuuid";
    createDocument("register", id, formData);
  };

  return (
    <>
      <Header />
      <div className="flex h-screen items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="flex w-full max-w-md flex-col items-center justify-center gap-5"
        >
          <input
            type="text"
            name="prefix"
            value={formData.prefix}
            onChange={handleChange}
            placeholder="Prefix"
            className="input"
            required
          />
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First Name"
            className="input"
            required
          />

          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            className="input"
            required
          />

          <input
            type="text"
            name="nickname"
            value={formData.nickname}
            onChange={handleChange}
            placeholder="Nickname"
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
            placeholder="Mobile Number"
            className="input"
            required
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="input"
            required
          />

          <input
            type="text"
            name="guardianPhone"
            value={formData.guardianPhone}
            onChange={handleChange}
            placeholder="Guardian's Phone Number"
            className="input"
            required
          />

          {/* 
            <input
              type="text"
              name="academicYear"
              value={formData.academicYear}
              onChange={handleChange}
              placeholder="Academic Year"
              className="input"
            />
          
            <input
              type="text"
              name="course"
              value={formData.course}
              onChange={handleChange}
              placeholder="Course/Program"
              className="input"
            />
          
            <input
              type="text"
              name="school"
              value={formData.school}
              onChange={handleChange}
              placeholder="School/Institution"
              className="input"
            />
          
            <input
              type="text"
              name="howFound"
              value={formData.howFound}
              onChange={handleChange}
              placeholder="How did you hear about this event?"
              className="input"
            />
          */}

          <button type="submit" className="btn">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
