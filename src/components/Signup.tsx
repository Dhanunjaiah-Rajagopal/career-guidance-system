import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { login } from "../store/authSlice";
import { Label } from "./ui/label";
import { Button, Input } from "@nextui-org/react";

interface SignupFormInputs {
  name: string;
  email: string;
  password: string;
}

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm<SignupFormInputs>();

  const create = async (data: SignupFormInputs) => {
    setError("");
    try {
      const userAccount = await authService.createAccount(data);
      if (userAccount) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(login({ userData }));
        navigate("/");
      }
    } catch (err: any) {
      setError(err.message || "An error occurred during signup.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen ">
      <div className="mx-auto w-full max-w-lg bg-card p-10 rounded-lg border border-foreground shadow-md">
        <h2 className="text-center text-2xl font-bold text-foreground">Sign up to create an account</h2>
        <p className="mt-2 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-primary font-medium hover:underline"
          >
            Sign in
          </Link>
        </p>
        {error && (
          <p className="text-destructive text-center mt-4">
            {error}
          </p>
        )}
        <form onSubmit={handleSubmit(create)} className="mt-6">
          <div className="space-y-6">
            <div>
              <Label htmlFor="name" className="text-foreground">
                Full Name
              </Label>
              <Input
                {...register("name", { required: true })}
                placeholder="Full Name"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="email" className="text-foreground">
                Email Address
              </Label>
              <Input
                {...register("email", { required: true })}
                placeholder="Email Address"
                type="email"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="password" className="text-foreground">
                Password
              </Label>
              <Input
                {...register("password", { required: true })}
                type="password"
                placeholder="Password"
                className="mt-1"
              />
            </div>
            <Button type="submit" className="w-full bg-primary text-foreground">
              Create Account
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
