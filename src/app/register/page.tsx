"use client";

import { User } from "@/common/types/user";
import Header from "@/components/common/header";
import Button from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import axios from "axios";
import "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState<User>({
    prefix: "",
    firstName: "",
    lastName: "",
    nickname: "",
    lineId: "",
    mobileNumber: "",
    email: "",
    guardianPhone: "",
    workshops: [],
    tours: [],
  });

  useEffect(() => {
    const formData = localStorage.getItem("formData");

    if (formData) {
      router.push("/workshop/reserve");
    }
  }, [router]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = {
      ...Object.fromEntries(new FormData(e.currentTarget)),
    };

    localStorage.setItem("formData", JSON.stringify(formData));

    await axios
      .post("/api/user", formData)
      .then((res) => {
        if (res.data) {
          router.push("/workshop/reserve");
        } else {
          alert("เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง");
        }
      })
      .catch((err) => {
        alert("เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง");
      });
  };

  return (
    <>
      <Header />
      <form
        onSubmit={handleSubmit}
        className="mt-4 flex w-full max-w-md flex-col items-center justify-center gap-5"
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

        <div className="flex flex-col items-center space-y-4 py-10">
          <Button type="submit" className="w-36">
            ไปต่อ
          </Button>
          <Link href="/login">
            <Button variant="ghost" size="sm" className="text-xs">
              เคยลงทะเบียนแล้ว
            </Button>
          </Link>
        </div>
      </form>
    </>
  );
}
