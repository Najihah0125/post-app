import React, { useContext, useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { AuthContext } from "../helpers/authContext";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { setRole } = useContext(AuthContext);

  // hardcode user
  const hardcodeUser = {
    email: "test@gmail.com",
    password: "Test123@",
  };

  // hardcode admin
  const hardcodeAdmin = {
    email: "admin@gmail.com",
    password: "Admin123@",
  };

  // login
  const handleLogin = async (data) => {
    if (
      (data.email === hardcodeUser.email &&
        data.password === hardcodeUser.password) ||
      (data.email === hardcodeAdmin.email &&
        data.password === hardcodeAdmin.password)
    ) {
      localStorage.setItem("logged", true);

      // store role of logged in user
      if (
        data.email === hardcodeAdmin.email &&
        data.password === hardcodeAdmin.password
      ) {
        setRole("admin");
      } else {
        setRole("user");
      }

      navigate("/posts");
    } else {
      toast.error("Incorrect email/password");
    }
  };

  return (
    <main className="bg-indigo-400 overflow-auto min-h-screen flex items-center justify-center p-20">
      <div className="text-black p-20 rounded-2xl bg-white flex flex-col flex-1 h-screen min-h-screen">
        <div className="flex flex-col space-y-5 my-auto">
          <div className="flex flex-col space-y-3">
            <h1 className="text-2xl font-semibold">Log In</h1>
            <p className="text-sm text-gray-500">
              Don't have an account?{" "}
              <a
                className="text-indigo-600 font-semibold underline"
                href="/register"
              >
                Register
              </a>
            </p>
          </div>
          <form
            className="space-y-5 flex flex-col"
            onSubmit={handleSubmit(handleLogin)}
          >
            <Input
              label="Email"
              name="email"
              type="email"
              register={register}
              validation={{
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message:
                    "Enter a valid email address (example: xxx@gmail.com)",
                },
              }}
              error={errors.email}
              readOnly={false}
            />
            <Input
              label="Password"
              name="password"
              type="password"
              register={register}
              validation={{
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Must at least 8 characters long",
                },
                pattern: {
                  value: /^(?=.*[A-Z])(?=.*[!@#$%^&*])/,
                  message:
                    "Must contain at least one uppercase letter (A-Z) and one special character (e.g. !@#$%^&*)",
                },
              }}
              error={errors.password}
              readOnly={false}
            />
            <a
              className="text-sm text-end text-indigo-600 font-semibold"
              href="/forgot-password"
            >
              Forgot Password?
            </a>
            <Button
              label="Login"
              type="submit"
              className="primary-button"
              onClick={null}
              isDirty={true}
            />
          </form>
        </div>
      </div>
      <Toaster />
    </main>
  );
}
