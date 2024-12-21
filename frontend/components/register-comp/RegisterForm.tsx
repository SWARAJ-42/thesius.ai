"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Navbar from "@/components/global-comp/navbar";
import { Loader2 } from "lucide-react"; // Import the loading icon
import { BACKEND_URL } from "@/lib/constants";
import { useRouter } from "next/navigation";
import axios from "axios";

const RegisterForm = () => {
  const [loading, setLoading] = useState(false); // Add loading state
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true); // Set loading to true
    const formData = new FormData(e.currentTarget);

    const fullname = formData.get("fullname") as string;
    const username = formData.get("username") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const cpassword = formData.get("cpassword") as string;

    try {
      const response = await axios.post(`${BACKEND_URL}/auth/register`, {
        fullname: fullname,
        username: username,
        email: email,
        password: password,
      });
      router.push("/auth/login")
      alert("Registration successfull, Before you login please check your mail for a verification link")
    } catch(error) {
      console.error('Failed to register user:', error);
    }
  };

  return (
    <div className="h-[100vh] flex justify-center items-center">
      <Navbar />
      <div className="mt-10 max-w-md w-full sm:mx-auto m-2 rounded-2xl p-4 md:p-10 bg-white/30 shadow-lg">
        <h2 className="font-bold text-xl md:text-3xl text-neutral-800 dark:text-neutral-200">
          Welcome to Thesius.ai
        </h2>
        <p className="text-neutral-600 text-md max-w-sm mt-2 dark:text-neutral-300">
          Before you get started, please fill all the necessary information
        </p>
        <form className="my-4" onSubmit={handleSubmit}>
          <Label className="my-2">Username</Label>
          <Input
            className="my-2 bg-white/50"
            id="username"
            name="username"
            placeholder="John42"
          />

          <Label className="my-2">Full Name</Label>
          <Input
            className="my-2 bg-white/50"
            id="fullname"
            name="fullname"
            placeholder="John Doe"
          />

          <Label className="my-2">Email Address</Label>
          <Input
            className="my-2 bg-white/50"
            id="email"
            placeholder="johndoe@foo.com"
            type="email"
            name="email"
          />

          <Label className="my-2">Password</Label>
          <Input
            className="my-2 bg-white/50"
            id="password"
            placeholder="*********"
            type="password"
            name="password"
          />

          <Label className="my-2">Confirm Password</Label>
          <Input
            className="my-2 bg-white/50"
            id="cpassword"
            placeholder="*********"
            type="password"
            name="cpassword"
          />

          <Button type="submit" className="my-4 min-w-20" disabled={loading}>
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Sign up"
            )}
          </Button>

          <div className="flex">
            <p className="text-neutral-600 text-md max-w-sm mr-1">
              Already have an account?
            </p>
            <Link className="text-blue-500 font-semibold" href="/auth/login">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
