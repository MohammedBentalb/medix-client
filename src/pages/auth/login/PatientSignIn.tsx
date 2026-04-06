import { UserIcon } from "lucide-react";
import { SignInForm } from "../../../components/auth/SignInFrom";

export function PatientSignIn() {
  return (
    <SignInForm
      role="ROLE_PATIENT"
      title="Manage your health journey."
      subtitle="Access your medical records, book appointments, and message your care team securely."
      icon={<UserIcon size={32} className="text-white" />}
      colorTheme={{
        primary: "bg-brand-600",
        primaryHover: "hover:bg-brand-700",
        light: "bg-brand-50",
        text: "text-brand-600",
        borderFocus: "focus:border-brand-500",
        ringFocus: "focus:ring-brand-500/20",
        gradientFrom: "from-brand-600",
        gradientTo: "to-brand-800",
      }}
    />
  );
}
