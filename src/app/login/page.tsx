"use client";

import Header from "@/components/common/header";
import Button from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import "firebase/firestore";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

export default function Login() {
  const router = useRouter();
  const [mobileNumber, setMobileNumber] = useState("");

  useEffect(() => {
    const formData = localStorage.getItem("formData");

    if (formData) {
      router.push("/workshop/my");
    }
  }, [router]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    axios
      .get(`/api/user/${mobileNumber}`)
      .then((res) => {
        if (res.data) {
          localStorage.setItem("formData", JSON.stringify(res.data));
          router.push("/workshop/reserve");
        } else {
          router.push("/register");
        }
      })
      .catch(() => {
        alert("ไม่พบข้อมูล");
        router.push("/register");
      });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex h-full w-full flex-col items-center justify-between pb-9"
    >
      <Header back />
      <Input
        type="text"
        name="mobileNumber"
        placeholder="เบอร์โทรศัพท์มือถือ"
        value={mobileNumber}
        onChange={(e) => setMobileNumber(e.target.value)}
        required
      />

      <Button type="submit" className="w-36">
        ไปต่อ
      </Button>
    </form>
  );
}
