import { StethoscopeIcon } from "lucide-react";
import { SignInForm } from "../../../components/auth/SignInFrom";

export function DoctorSignIn() {
  return (
    <SignInForm
      role="ROLE_DOCTOR"
      title="Streamline your practice."
      subtitle="View patient histories, manage your schedule, and write clinical notes efficiently."
      icon={<StethoscopeIcon size={32} className="text-white" />}
      colorTheme={{
        primary: "bg-indigo-600",
        primaryHover: "hover:bg-indigo-700",
        light: "bg-indigo-50",
        text: "text-indigo-600",
        borderFocus: "focus:border-indigo-500",
        ringFocus: "focus:ring-indigo-500/20",
        gradientFrom: "from-indigo-600",
        gradientTo: "to-indigo-900",
      }}
    />
  );
}
