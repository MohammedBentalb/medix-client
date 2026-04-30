import {  EyeIcon, EyeOffIcon, ArrowLeftIcon, ActivityIcon, Loader2 } from "lucide-react";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router";
import type { SignInFormProps, TApiError, userType } from "../../types";
import { useMutation } from "@tanstack/react-query";
import { useForm, type SubmitHandler } from "react-hook-form";
import api, { setAccessToken } from "../../lib/axios/api";
import useAuth from "../../hooks/useAuth";
import { loginSchema, type TLoginData } from "../../lib/zod/zod";

export function SignInForm({ role, title, subtitle, icon, colorTheme }: SignInFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [globalError, setGlobalError] = useState("");
  const { setUser, setToken} = useAuth();
  const navigate = useNavigate();

  const castUserType = (role: userType) => {
    switch (role) {
      case "ROLE_PATIENT":
        return "Patient";

      case "ROLE_ASSISTANT":
        return "Assistant";

      case "ROLE_DOCTOR":
        return "Doctor";

      default:
        return null;
    }
  };

  const signUpRoute = (role: userType) => {
    switch (role) {
      case "ROLE_DOCTOR":
        return "/auth/sign-up/doctor";
      case "ROLE_PATIENT":
        return "/auth/sign-up/patient";
      case "ROLE_ASSISTANT":
        return "/auth/sign-up/assistant";
    }
  };


  const {register, formState: { errors }, handleSubmit, setError } = useForm<TLoginData>({resolver: zodResolver(loginSchema)});

  const { isPending, mutate } = useMutation({
    mutationFn: async (LoginData: Object) => {
      setGlobalError("");
      const res = await api.post(`/auth/login`, LoginData);
      console.log(res.data)
      return res.data;
    },
    onSuccess: async (data) => {
      console.log(data);
      setUser(data.data.user);
      setToken(data.data.accessToken);
      setAccessToken(data.data.accessToken);
      navigate('/')
    },
    retry: 0,
    onError: async (err: any) => {
      const apiError: TApiError = err.response?.data;

      if (apiError?.errors.details.length > 0) {
        err.response?.data.errors.details.forEach(
          ({ field, message }: { field: string; message: string }) => {
            setError(field as keyof TLoginData, { message });
          },
        );
      } else {
        setGlobalError(apiError?.errors?.message);
      }
      setToken('')
      setUser(null)
      setAccessToken(null)
    },
  });

  const onSubmit: SubmitHandler<TLoginData> = (data: TLoginData) => {
    mutate({ ...data, type: role });
  };

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col md:flex-row">
      <div
        className={`hidden md:flex md:w-1/2 lg:w-5/12 relative overflow-hidden bg-gradient-to-br ${colorTheme.gradientFrom} ${colorTheme.gradientTo} p-12 flex-col justify-between text-white`}
      >
        <div className="absolute inset-0 opacity-10">
          <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="grid-pattern"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M0 40L40 0H20L0 20M40 40V20L20 40"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-pattern)" />
          </svg>
        </div>

        <div className="relative z-10">
          <Link
            to="/"
            className="flex items-center gap-2 text-white/90 hover:text-white transition-colors w-fit mb-16"
          >
            <div className="bg-white/20 p-1.5 rounded-lg backdrop-blur-sm">
              <ActivityIcon size={24} strokeWidth={2.5} />
            </div>
            <span className="font-jakarta font-bold text-xl tracking-tight">
              Medix
            </span>
          </Link>

          <div>
            <div
              className={`w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center mb-8 border border-white/20`}
            >
              {icon}
            </div>
            <h1 className="text-4xl lg:text-5xl font-jakarta font-bold mb-6 leading-tight">
              {title}
            </h1>
            <p className="text-lg text-white/80 max-w-md leading-relaxed">
              {subtitle}
            </p>
          </div>
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-4 text-sm text-white/60">
            <span>Secure</span>
            <span className="w-1 h-1 rounded-full bg-white/40" />
            <span>Encrypted</span>
            <span className="w-1 h-1 rounded-full bg-white/40" />
            <span>HIPAA Compliant</span>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-20 py-12 bg-white">
        <div className="w-full max-w-md mx-auto">
          <Link
            to="/auth/sign-in/roles"
            className="inline-flex items-center gap-2 text-sm font-medium text-stone-500 hover:text-stone-800 transition-colors mb-8"
          >
            <ArrowLeftIcon size={16} />
            Back to role selection
          </Link>

          <div className="mb-10">
            <h2 className="text-3xl font-jakarta font-bold text-stone-900 mb-3">
              Sign in as {castUserType(role)}
            </h2>
            <p className="text-stone-500">
              Welcome back! Please enter your details.
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label
                className="block text-sm font-medium text-stone-700 mb-2"
                htmlFor="email"
              >
                Email address
              </label>
              <input
                {...register("email")}
                id="email"
                type="email"
                placeholder="Enter your email"
                className={`w-full px-4 py-3 rounded-xl border border-stone-200 bg-stone-50 text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 ${colorTheme.ringFocus} ${colorTheme.borderFocus} focus:bg-white transition-all`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm font-medium capitalize text-center mt-2">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label
                className="block text-sm font-medium text-stone-700 mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <div className="relative">
                <input
                  {...register("password")}
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className={`w-full px-4 py-3 rounded-xl border border-stone-200 bg-stone-50 text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 ${colorTheme.ringFocus} ${colorTheme.borderFocus} focus:bg-white transition-all`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 p-1"
                >
                  {showPassword ? (
                    <EyeOffIcon size={20} />
                  ) : (
                    <EyeIcon size={20} />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm font-medium capitalize text-center mt-2">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer group">
                <div className="relative flex items-center justify-center">
                  <input
                    type="checkbox"
                    className={`peer appearance-none w-5 h-5 border border-stone-300 rounded bg-white checked:${colorTheme.primary} checked:border-transparent focus:outline-none focus:ring-2 ${colorTheme.ringFocus} focus:ring-offset-1 transition-all cursor-pointer`}
                  />
                  <svg
                    className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 pointer-events-none"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="3"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <span className="text-sm text-stone-600 group-hover:text-stone-900 transition-colors">
                  Remember me
                </span>
              </label>

              <a
                href="#"
                className={`text-sm font-medium ${colorTheme.text} hover:underline`}
              >
                Forgot password?
              </a>
            </div>

            <p className="text-red-500 text-sm font-medium capitalize text-center mt-2">
              {globalError}
            </p>

            <button
              disabled={isPending}
              type="submit"
              className={`w-full flex items-center justify-center gap-2 ${colorTheme.primary} ${colorTheme.primaryHover} text-white font-medium py-3.5 rounded-xl shadow-sm hover:shadow-md transition-all active:scale-[0.98] ${isPending ? "opacity-75" : ""}`}
            >
              {isPending ? <Loader2 className="animate-spin text-center" /> : ""}
              {isPending ? "signing..." : "Sign In"}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-stone-600">
            Don't have an account?{" "}
            <Link
              to={signUpRoute(role)}
              className={`font-medium ${colorTheme.text} hover:underline`}
            >
              Get Started
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
