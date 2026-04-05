import { UserIcon, StethoscopeIcon, HeartPulseIcon, ArrowLeftIcon, ChevronRightIcon, ActivityIcon } from "lucide-react";
import { Link } from "react-router";

export function RoleSelection() {

  const roles = [
    {
      id: "patient",
      title: "Patient",
      subtitle: "Access records & book appointments",
      icon: <UserIcon size={20} />,
      iconBg: "bg-brand-50",
      iconColor: "text-brand-600",
      hoverBg: "hover:bg-brand-50/50",
      hoverBorder: "hover:border-brand-200",
      path: "/auth/sign-in/patient",
    },
    {
      id: "doctor",
      title: "Doctor",
      subtitle: "Manage schedule & patient care",
      icon: <StethoscopeIcon size={20} />,
      iconBg: "bg-indigo-50",
      iconColor: "text-indigo-600",
      hoverBg: "hover:bg-indigo-50/50",
      hoverBorder: "hover:border-indigo-200",
      path: "/auth/sign-in/doctor",
    },
    {
      id: "assistant",
      title: "Assistant",
      subtitle: "Coordinate care & update vitals",
      icon: <HeartPulseIcon size={20} />,
      iconBg: "bg-rose-50",
      iconColor: "text-rose-600",
      hoverBg: "hover:bg-rose-50/50",
      hoverBorder: "hover:border-rose-200",
      path: "/auth/sign-in/assistant",
    },
  ];

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-105 mx-auto">
        <div className="text-center mb-10">
          <div className="flex flex-col items-center">
            <div className="bg-brand-600 p-2 rounded-xl text-white mb-6 shadow-sm">
              <ActivityIcon size={28} strokeWidth={2.5} />
            </div>
            <h1 className="text-3xl font-jakarta font-bold text-stone-900 mb-2 tracking-tight">
              Welcome back
            </h1>
            <p className="text-stone-500 text-sm">
              Select your role to continue to your dashboard
            </p>
          </div>
        </div>

        <div className="space-y-3 mb-10">
          {roles.map((role) => (
            <div key={role.id}>
              <Link to={role.path} className={`w-full flex items-center p-4 bg-white rounded-2xl border border-stone-200 shadow-sm transition-all duration-200 group ${role.hoverBg} ${role.hoverBorder}`}>
                <div className={`w-12 h-12 rounded-xl ${role.iconBg} ${role.iconColor} flex items-center justify-center shrink-0 mr-4 transition-colors`}>
                  {role.icon}
                </div>
                <div className="flex-1 text-left">
                  <h2 className="text-base font-semibold text-stone-900 mb-0.5">
                    {role.title}
                  </h2>
                  <p className="text-xs text-stone-500 font-medium">
                    {role.subtitle}
                  </p>
                </div>
                <div className="text-stone-300 group-hover:text-stone-600 transition-all duration-200 group-hover:translate-x-1">
                  <ChevronRightIcon size={20} />
                </div>
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-stone-400 hover:text-stone-700 transition-colors"
          >
            <ArrowLeftIcon size={14} />
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
