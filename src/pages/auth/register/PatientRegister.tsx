import { useState } from "react";
import { UserIcon, ArrowLeftIcon, CameraIcon, EyeIcon, EyeOffIcon, Loader2 } from "lucide-react";
import { Link, replace, useNavigate } from "react-router";
import { SignUpTemplete } from "../../../components/auth/SignUpTemplete";
import { FieldWrapper, inputCls, SectionLabel } from "../../../components/auth/authUtils";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { patientRegisterSchema, type TPatientRegisterSchema } from "../../../lib/zod/zod";
import { useMutation } from "@tanstack/react-query";
import api, { setAccessToken } from "../../../lib/axios/api";
import useAuth from "../../../hooks/useAuth";

export function PatientRegister() {
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const { setToken, setUser } = useAuth();
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: TPatientRegisterSchema) => {
      const formData = new FormData();
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("password_confirmation", data.password_confirm);
      formData.append("firstName", data.firstName);
      formData.append("lastName", data.lastName);
      formData.append("dateOfBirth", data.dateOfBirth);
      formData.append("gender", data.gender);
      if (data.bloodType)             formData.append("bloodType", data.bloodType);
      if (data.nationalId)            formData.append("nationalId", data.nationalId);
      if (data.phone)                 formData.append("phone", data.phone);
      if (data.address)               formData.append("address", data.address);
      if (data.emergencyContactName)  formData.append("emergencyContactName", data.emergencyContactName);
      if (data.emergencyContactPhone) formData.append("emergencyContactPhone", data.emergencyContactPhone);
      if (imageFile)                  formData.append("image", imageFile);
      const res = await api.post("/auth/register/patient", formData);
      return res.data;
    },
    onSuccess(data) {
      setUser(data.data.user);
      setToken(data.data.accessToken);
      setAccessToken(data.data.accessToken);
      navigate('/', {replace: true});
    },
    onError(error: any) {
      const details = error.response?.data?.errors?.details;
      if (details) {
        details.forEach((d: { field: string; message: string }) => {
          setError(d.field as keyof TPatientRegisterSchema, { message: d.message });
        });
      }
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setImageFile(file);
    } else {
      setImage(null);
      setImageFile(null);
    }
  };

  const { register, handleSubmit, formState: { errors }, setError } = useForm<TPatientRegisterSchema>({
    resolver: zodResolver(patientRegisterSchema),
  });

  const onSubmit: SubmitHandler<TPatientRegisterSchema> = (data) => {
    mutate(data);
  };

  return (
    <SignUpTemplete
      icon={<UserIcon size={32} className="text-white" />}
      title="Take control of your health."
      subtitle="Book appointments, access your records, and connect with your care team — all in one place."
      gradientFrom="from-brand-600"
      gradientTo="to-brand-800"
    >
      <Link
        to="/auth/sign-up/roles"
        className="inline-flex items-center gap-2 text-sm font-medium text-stone-500 hover:text-stone-800 transition-colors mb-8"
      >
        <ArrowLeftIcon size={16} />
        Back to role selection
      </Link>

      <div className="mb-8">
        <h2 className="text-3xl font-jakarta font-bold text-stone-900 mb-2">
          Create your account
        </h2>
        <p className="text-stone-500 text-sm">
          Registering as a{" "}
          <span className="font-semibold text-stone-700">Patient</span>. Fill in
          your details below.
        </p>
      </div>

      <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
        <FieldWrapper id="avatar" label="Profile Photo" optional>
          <div className="flex items-center gap-5">
            <div className="relative shrink-0">
              <img
                src={image ?? "https://placehold.co/400"}
                alt="Avatar preview"
                className="w-20 h-20 rounded-full object-cover border-2 border-stone-200 shadow-sm"
              />
              <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-brand-600 flex items-center justify-center shadow-md">
                <CameraIcon size={13} className="text-white" />
              </div>
            </div>
            <div>
              <label
                htmlFor="avatar"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-stone-200 bg-stone-50 text-sm font-medium text-stone-700 hover:bg-stone-100 cursor-pointer transition-all"
              >
                <CameraIcon size={14} />
                Upload photo
              </label>
              <input
                type="file"
                id="avatar"
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
              />
              <p className="text-xs text-stone-400 mt-1.5">
                JPG, PNG or WEBP · max 2 MB
              </p>
            </div>
          </div>
        </FieldWrapper>

        <SectionLabel>Account</SectionLabel>

        <FieldWrapper
          id="email"
          label="Email address"
          error={errors.email?.message}
          required
        >
          <input
            {...register("email")}
            id="email"
            type="email"
            placeholder="you@example.com"
            className={inputCls()}
          />
        </FieldWrapper>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <FieldWrapper
            id="password"
            label="Password"
            error={errors.password?.message}
            required
          >
            <div className="relative">
              <input
                {...register("password")}
                id="password"
                type={showPass ? "text" : "password"}
                placeholder="••••••••"
                className={`${inputCls()} pr-11`}
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 p-1"
              >
                {showPass ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
              </button>
            </div>
          </FieldWrapper>

          <FieldWrapper
            id="password_confirmation"
            label="Confirm password"
            error={errors.password_confirm?.message}
            required
          >
            <div className="relative">
              <input
                {...register("password_confirm")}
                id="password_confirmation"
                type={showConfirm ? "text" : "password"}
                placeholder="••••••••"
                className={`${inputCls()} pr-11`}
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 p-1"
              >
                {showConfirm ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
              </button>
            </div>
          </FieldWrapper>
        </div>

        <SectionLabel>Personal Information</SectionLabel>

        <div className="grid grid-cols-2 gap-4">
          <FieldWrapper
            id="firstName"
            label="First name"
            error={errors.firstName?.message}
            required
          >
            <input
              {...register("firstName")}
              id="firstName"
              placeholder="Jane"
              className={inputCls()}
            />
          </FieldWrapper>
          <FieldWrapper
            id="lastName"
            label="Last name"
            error={errors.lastName?.message}
            required
          >
            <input
              {...register("lastName")}
              id="lastName"
              placeholder="Smith"
              className={inputCls()}
            />
          </FieldWrapper>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FieldWrapper
            id="dateOfBirth"
            label="Date of birth"
            error={errors.dateOfBirth?.message}
            required
          >
            <input
              {...register("dateOfBirth")}
              id="dateOfBirth"
              type="date"
              className={inputCls()}
            />
          </FieldWrapper>
          <FieldWrapper
            id="gender"
            label="Gender"
            error={errors.gender?.message}
            required
          >
            <select {...register("gender")} id="gender" className={inputCls()}>
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </FieldWrapper>
        </div>

        <FieldWrapper
          id="bloodType"
          label="Blood type"
          error={errors.bloodType?.message}
          optional
        >
          <select
            {...register("bloodType")}
            id="bloodType"
            className={inputCls()}
          >
            <option value="">Select blood type</option>
            {["A+", "A−", "B+", "B−", "AB+", "AB−", "O+", "O−"].map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </FieldWrapper>

        <SectionLabel>Contact & Identity</SectionLabel>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FieldWrapper
            id="nationalId"
            label="National ID"
            error={errors.nationalId?.message}
            optional
            hint="Must be unique"
          >
            <input
              {...register("nationalId")}
              id="nationalId"
              placeholder="ID number"
              className={inputCls()}
            />
          </FieldWrapper>
          <FieldWrapper
            id="phone"
            label="Phone"
            error={errors.phone?.message}
            optional
          >
            <input
              {...register("phone")}
              id="phone"
              type="tel"
              placeholder="+1 555 000 000"
              className={inputCls()}
            />
          </FieldWrapper>
        </div>

        <FieldWrapper
          id="address"
          label="Address"
          error={errors.address?.message}
          optional
        >
          <input
            {...register("address")}
            id="address"
            placeholder="123 Main St, City, Country"
            className={inputCls()}
          />
        </FieldWrapper>

        <SectionLabel>Emergency Contact</SectionLabel>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FieldWrapper
            id="emergencyContactName"
            label="Contact name"
            error={errors.emergencyContactName?.message}
            optional
          >
            <input
              {...register("emergencyContactName")}
              id="emergencyContactName"
              placeholder="Full name"
              className={inputCls()}
            />
          </FieldWrapper>
          <FieldWrapper
            id="emergencyContactPhone"
            label="Contact phone"
            error={errors.emergencyContactPhone?.message}
            optional
          >
            <input
              {...register("emergencyContactPhone")}
              id="emergencyContactPhone"
              type="tel"
              placeholder="+1 555 000 000"
              className={inputCls()}
            />
          </FieldWrapper>
        </div>

        <div className="pt-6 border-t border-stone-100">
          <button
            type="submit"
            disabled={isPending}
            className={`w-full flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-medium py-3.5 rounded-xl shadow-sm hover:shadow-md transition-all active:scale-[0.98] ${isPending ? "opacity-75" : ""}`}
          >
            {isPending ? <Loader2 className="animate-spin" /> : ""}
            {isPending ? "Creating..." : "Create Account"}
          </button>
          <p className="mt-5 text-center text-sm text-stone-600">
            Already have an account?{" "}
            <Link
              to="/auth/sign-in/patient"
              className="font-medium text-brand-600 hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </form>
    </SignUpTemplete>
  );
}
