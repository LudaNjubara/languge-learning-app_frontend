"use client";

import { handleLogin } from "@/lib/handlers/handlers";
import { TLoginFormData } from "@/typings";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function validateFormData(formData: TLoginFormData): TLoginFormErrors {
  const errors: TLoginFormErrors = {};
  if (!formData.username) {
    errors.username = "Username is required";
  }
  if (!formData.password) {
    errors.password = "Password is required";
  } else if (formData.password.length < 4) {
    errors.password = "Password must be at least 4 characters long";
  }
  return errors;
}

type TLoginFormErrors = {
  username?: string;
  password?: string;
};

export default function LoginForm() {
  const router = useRouter();
  const [formData, setFormData] = useState<TLoginFormData>({
    username: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState<TLoginFormErrors>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const errors = validateFormData(formData);

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    } else {
      setFormErrors({});
    }

    try {
      setIsLoading(true);
      const userData = await handleLogin(formData);
      router.push("/quiz");
      console.log(userData);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto bg-neutral-900 rounded-lg p-8">
      <h1 className="text-4xl font-extralight text-neutral-400 text-center">Login</h1>
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4 mt-6">
        <label htmlFor="username" className="text-neutral-400 font-semibold">
          Username
        </label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
          placeholder="Username..."
          className="p-3 rounded-md bg-neutral-800 text-neutral-200 font-medium placeholder:text-neutral-500"
        />
        {formErrors.username && (
          <p className="w-full py-1 px-3 bg-red-900 text-red-200 font-semibold text-sm rounded-md">
            {formErrors.username}
          </p>
        )}

        <label htmlFor="password" className="text-neutral-400 font-semibold">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          placeholder="Password..."
          className="p-3 rounded-md bg-neutral-800 text-neutral-200 font-medium placeholder:text-neutral-500"
        />
        {formErrors.password && (
          <p className="w-full py-1 px-3 bg-red-900 text-red-200 font-semibold text-sm rounded-md">
            {formErrors.password}
          </p>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="bg-neutral-200 text-neutral-900 hover:bg-neutral-950 hover:text-neutral-100 focus:bg-neutral-950 focus:text-neutral-100 font-semibold py-3 px-5 mt-5 shadow-lg rounded-md transition duration-200 ease-in-out"
        >
          Login
        </button>
      </form>

      <p className="mt-4 text-center">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="text-neutral-200 hover:text-neutral-100 font-semibold">
          Register
        </Link>
      </p>
    </div>
  );
}
