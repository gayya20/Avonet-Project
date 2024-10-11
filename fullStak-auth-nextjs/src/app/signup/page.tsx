"use client";
import { Button } from "@/components/Button";
import InputBox from "@/components/InputBox";
import { Backend_URL } from "@/lib/Constants";
import Link from "next/link";
import React, { useRef } from "react";
import axios from "axios"; // Import axios

type FormInputs = {
  name: string;
  email: string;
  password: string;
};

const SignupPage = () => {
  const data = useRef<FormInputs>({
    name: "",
    email: "",
    password: "",
  });

  const register = async () => {
    try {
      const res = await axios.post(`${Backend_URL}/auth/register`, {
        name: data.current.name,
        email: data.current.email,
        password: data.current.password,
      });

      // Axios automatically handles JSON response parsing
      alert("User Registered!");
      console.log(res.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(`Error: ${error.response?.data.message || error.message}`);
      } else {
        alert(`An error occurred: ${error.message}`);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-white to-slate-200">
      <div className="m-4 border rounded-lg overflow-hidden shadow-lg w-full max-w-md">
      <div className="p-4 bg-black text-white text-xl font-semibold text-center">
  Sign Up
</div>
        <div className="p-6 flex flex-col gap-4">
          <InputBox
            autoComplete="off"
            name="name"
            labelText="Name"
            required
            onChange={(e) => (data.current.name = e.target.value)}
          />
          <InputBox
            name="email"
            labelText="Email"
            required
            onChange={(e) => (data.current.email = e.target.value)}
          />
          <InputBox
            name="password"
            labelText="Password"
            type="password"
            required
            onChange={(e) => (data.current.password = e.target.value)}
          />
          <div className="flex justify-between items-center mt-4">
            <Button onClick={register} className="flex-grow mr-2">
              Submit
            </Button>
            <Link href="/" className="text-blue-600 hover:underline">
              Cancel
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
