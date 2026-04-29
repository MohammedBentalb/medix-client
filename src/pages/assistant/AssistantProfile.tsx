import { Link } from "react-router-dom";
import { ArrowLeftIcon, MapPinIcon, StarIcon, PhoneIcon, BadgeCheckIcon, UserPlusIcon } from "lucide-react";
import { DarkBanner } from "../../components/DarkBanner";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import api from "../../lib/axios/api";
import type { TAssistantProfile, TUser } from "../../types";
import useAuth from "../../hooks/useAuth";

export function AssistantProfile() {
  const { id } = useParams<{ id: string }>();
  const {user} = useAuth()

  const { data: assistant, isLoading } = useQuery<TUser>({
    queryFn: async () => {
      const res = await api.get(`/users/${id}`);
      return res.data.data;
    },
    queryKey: ["assistants", id],
  });

  const profile = assistant?.profile as TAssistantProfile | null;
  const isAssigned = profile?.doctorId !== null && profile?.doctorId !== undefined;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!assistant) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center pt-20">
        <h2 className="text-2xl font-jakarta font-bold text-stone-900 mb-4">Assistant not found</h2>
        <Link to="/nurses" className="text-indigo-600 hover:underline font-medium">
          Return to directory
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pb-20">
      <DarkBanner className="h-80" accent="indigo">
        <div className="pt-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10 w-full">
          <Link to="/nurses" className="inline-flex items-center gap-2 text-sm font-medium text-stone-400 hover:text-white transition-colors mb-8">
            <ArrowLeftIcon size={16} />
            Back to assistants
          </Link>

          <div className="flex items-center gap-6 mt-2">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center shrink-0 border-2 border-indigo-500 shadow-xl bg-indigo-50 relative z-20 overflow-hidden">
              {assistant.image ? (
                <img src={assistant.image} alt={assistant.firstName} className="w-full h-full object-cover" />
              ) : (
                <span className="text-2xl md:text-3xl font-jakarta font-bold text-indigo-600">
                  {assistant.firstName[0]}{assistant.lastName[0]}
                </span>
              )}
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest font-bold text-indigo-400 mb-1">
                Medical Assistant
              </p>
              <h1 className="text-3xl md:text-4xl font-jakarta font-bold text-white mb-2">
                {assistant.firstName} {assistant.lastName}
              </h1>
              <div className="flex items-center gap-2 text-stone-300 text-sm">
                <MapPinIcon size={14} className="text-stone-400" />
                <span>City Medical Center</span>
                <span className="text-stone-600">•</span>
                <span className={assistant.status === "ACTIVE" ? "text-emerald-400" : "text-stone-400"}>
                  {assistant.status}
                </span>
              </div>
            </div>
          </div>
        </div>
      </DarkBanner>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        <div className="mb-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-10 border-b border-stone-100">
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-1.5 bg-stone-50 px-3 py-1.5 rounded-lg border border-stone-100">
                <StarIcon size={14} className="fill-amber-400 text-amber-400" />
                <span className="text-sm font-bold text-stone-900">4.5</span>
                <span className="text-sm text-stone-500">(12 reviews)</span>
              </div>
              <div className="flex items-center gap-1.5 bg-stone-50 px-3 py-1.5 rounded-lg border border-stone-100">
                <span className={`w-2 h-2 rounded-full ${isAssigned ? "bg-stone-400" : "bg-emerald-500"}`} />
                <span className="text-sm font-medium text-stone-700">
                  {isAssigned ? "Already assigned" : "Available"}
                </span>
              </div>
            </div>

            {user?.type  === "ROLE_DOCTOR" && !isAssigned && assistant.status !== "SUSPENDED" && (
              <button className="px-8 py-3 rounded-full bg-indigo-600 text-white font-bold text-sm hover:bg-indigo-700 transition-all shadow-md active:scale-[0.98] flex items-center gap-2">
                <UserPlusIcon size={16} />
                Add to Staff
              </button>
            )}
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-xl font-jakarta font-bold text-stone-900 mb-6">Contact & Identity</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-100">
              <PhoneIcon size={20} className="text-stone-400 mb-3" />
              <p className="text-xs text-stone-500 font-medium mb-1">Phone</p>
              <p className="text-sm font-semibold text-stone-900">{assistant.phone ?? "Not provided"}</p>
            </div>
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-100">
              <BadgeCheckIcon size={20} className="text-stone-400 mb-3" />
              <p className="text-xs text-stone-500 font-medium mb-1">National ID</p>
              <p className="text-sm font-semibold text-stone-900">{assistant.nationalId ?? "Not provided"}</p>
            </div>
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-100">
              <MapPinIcon size={20} className="text-stone-400 mb-3" />
              <p className="text-xs text-stone-500 font-medium mb-1">Assignment</p>
              <p className="text-sm font-semibold text-stone-900">
                {isAssigned ? "Assigned to a doctor" : "Unassigned"}
              </p>
            </div>
          </div>
        </div>

        <div className="h-px w-full bg-stone-100 mb-10" />

        <div className="mb-12">
          <h2 className="text-xl font-jakarta font-bold text-stone-900 mb-4">About</h2>
          <p className="text-stone-600 leading-relaxed">
            Experienced medical assistant with a strong background in patient triage, vital signs monitoring,
            and clinical coordination. Dedicated to supporting healthcare providers and ensuring smooth patient flow.
          </p>
        </div>

        <div className="h-px w-full bg-stone-100 mb-10" />

        <div>
          <h2 className="text-xl font-jakarta font-bold text-stone-900 mb-4">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {["Vital Signs", "Patient Triage", "IV Insertion", "Electronic Health Records", "Patient Education", "Wound Care"].map((skill) => (
              <span key={skill} className="px-3 py-1.5 rounded-lg bg-stone-50 border border-stone-200 text-sm font-medium text-stone-700">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
