import { HeartPulseIcon } from "lucide-react";
import { SignInForm } from "../../../components/auth/SignInFrom";

export function AssistantSignIn() {
  return (
    <SignInForm
      role="ROLE_ASSISTANT"
      title="Coordinate patient care."
      subtitle="Update vitals, manage triage, and assist providers with seamless workflows."
      icon={<HeartPulseIcon size={32} className="text-white" />}
      colorTheme={{
        primary: "bg-rose-600",
        primaryHover: "hover:bg-rose-700",
        light: "bg-rose-50",
        text: "text-rose-600",
        borderFocus: "focus:border-rose-500",
        ringFocus: "focus:ring-rose-500/20",
        gradientFrom: "from-rose-600",
        gradientTo: "to-rose-800",
      }}
    />
  );
}
