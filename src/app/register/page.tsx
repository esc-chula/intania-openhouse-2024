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
import { ZodError, z } from "zod";

const userSchema = z.object({
  prefix: z.string().min(2),
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  nickname: z.string().min(2),
  lineId: z.string().optional(),
  mobileNumber: z.string().startsWith("0").length(10),
  email: z.string().email(),
  guardianPhone: z.string().startsWith("0").length(10),
});

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
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);

  const setFieldError = (fieldName: string, errorMessage: string) => {
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: errorMessage,
    }));
  };

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

    setFormErrors({});

    setLoading(true);

    try {
      const validatedData = userSchema.parse(formData);
      localStorage.setItem("formData", JSON.stringify(validatedData));
      await axios.post("/api/user", validatedData);
      router.push("/workshop/reserve");
    } catch (error) {
      if (error instanceof ZodError) {
        error.errors.forEach((err) => {
          if (err.path) {
            setFieldError(err.path.join("."), err.message);
          }
        });
      } else {
        console.error(error);
        alert("เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง");
      }
    }

    setLoading(false);
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
            นาย
          </option>
          <option value="female" className="text-black">
            นางสาว
          </option>
        </Select>
        <Input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="ชื่อจริง"
          required
          helperText={formErrors["firstName"]}
        />

        <Input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="นามสกุล"
          required
          helperText={formErrors["lastName"]}
        />

        <Input
          type="text"
          name="nickname"
          value={formData.nickname}
          onChange={handleChange}
          placeholder="ชื่อเล่น"
          required
          helperText={formErrors["nickname"]}
        />

        <Input
          type="text"
          name="lineId"
          value={formData.lineId}
          onChange={handleChange}
          placeholder="Line ID"
          helperText={formErrors["lineId"]}
        />

        <Input
          type="text"
          name="mobileNumber"
          value={formData.mobileNumber}
          onChange={handleChange}
          placeholder="เบอร์โทรศัพท์มือถือ"
          required
          helperText={formErrors["mobileNumber"]}
          description="กรอกในรูป 0XXXXXXXXX"
        />

        <Input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="อีเมล"
          required
          helperText={formErrors["email"]}
        />

        <Input
          type="text"
          name="guardianPhone"
          value={formData.guardianPhone}
          onChange={handleChange}
          placeholder="เบอร์โทรศัพท์ผู้ปกครอง"
          required
          helperText={formErrors["guardianPhone"]}
          description="กรอกในรูป 0XXXXXXXXX"
        />

        <div className="flex flex-col items-center space-y-4 py-10">
          <Button type="submit" className="w-36" disabled={loading}>
            ลงทะเบียน
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
