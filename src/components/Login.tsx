import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { login as authLogin } from "../store/authSlice";
import { Label } from "./ui/label";
import { Button, Input } from "@nextui-org/react";

interface LoginFormInputs {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm<LoginFormInputs>();
  const [error, setError] = useState<string>("");

  const login = async (data: LoginFormInputs) => {
    setError("");
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(authLogin({ userData }));
          setTimeout(() => navigate("/"), 100); // Slight delay to ensure state update
        }
      }
    } catch (err: any) {
      setError(err.message || "An error occurred during login.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen text-foreground">
      <div className="mx-auto w-full max-w-lg bg-card p-10 rounded-lg border border-foreground shadow-md">
        <h2 className="text-center text-2xl font-bold text-foreground">Sign in to your account</h2>
        <p className="mt-2 text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link to="/signup" className="text-primary font-medium hover:underline">
            Sign up
          </Link>
        </p>
        {error && <p className="text-destructive mt-4 text-center">{error}</p>}
        <form onSubmit={handleSubmit(login)} className="mt-6">
          <div className="space-y-6">
            <div>
              <Label htmlFor="email" className="text-foreground">
                Email Address
              </Label>
              <Input
                type="email"
                placeholder="Email Address"
                {...register("email", { required: true })}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="password" className="text-foreground">
                Password
              </Label>
              <Input
                type="password"
                placeholder="Password"
                {...register("password", { required: true })}
                className="mt-1"
              />
            </div>
            <Button type="submit" className="w-full bg-primary text-foreground">
              Sign in
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
