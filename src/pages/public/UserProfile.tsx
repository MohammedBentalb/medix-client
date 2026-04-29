import { UserIcon } from "lucide-react";
import { DarkBanner } from "../../components/DarkBanner";
import { useQuery } from "@tanstack/react-query";
import api from "../../lib/axios/api";
import type { TDoctorProfile, TPatientProfile, TAssistantProfile, TUser } from "../../types";
import { formatDate } from "../../sections/UserProfile/helpers";
import { InfoRow } from "../../components/InfoRow";
import { DoctorPanel } from "../../sections/UserProfile/DoctorPanel";
import { PatientPanel } from "../../sections/UserProfile/PatientPanel";
import { AssistantPanel } from "../../sections/UserProfile/AssistantPanel";

export function UserProfile() {
  const { data: user, isLoading } = useQuery<TUser>({
    queryKey: ['me'],
    queryFn: async () => {
      const res = await api.get('/users/me');
      return res.data.data.user;
    },
    staleTime: 0,
    gcTime: 0,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-brand-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  const initials = `${user.firstName?.[0] ?? ''}${user.lastName?.[0] ?? ''}`.toUpperCase();
  const fullName = `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim();

  return (
    <div className="min-h-screen bg-white pb-20">
      <DarkBanner className="h-72">
        <div className="pt-28 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto relative z-10 w-full">
          <div className="flex items-end gap-5">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center shrink-0 border-2 border-brand-500 shadow-xl bg-brand-50 overflow-hidden">
              {user.image ? (
                <img src={user.image} alt={fullName} className="w-full h-full object-cover" />
              ) : (
                <span className="text-2xl md:text-3xl font-jakarta font-bold text-brand-600">
                  {initials}
                </span>
              )}
            </div>

            <div className="pb-1">
              <h1 className="text-3xl md:text-4xl font-jakarta font-bold text-white leading-tight">
                {fullName}
              </h1>
              {user.type === "ROLE_DOCTOR" && (
                <p className="text-brand-400 font-semibold text-sm mt-1">
                  {(user.profile as TDoctorProfile).speciality}
                </p>
              )}
            </div>
          </div>
        </div>
      </DarkBanner>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-8 rounded-xl bg-brand-600/10 flex items-center justify-center text-brand-600 border border-brand-500/10">
              <UserIcon size={16} />
            </div>
            <h2 className="text-lg font-jakarta font-bold text-stone-900">Account Information</h2>

            <span
              className={`ml-auto inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${
                user.status === "ACTIVE"
                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                  : "bg-stone-100 text-stone-500 border border-stone-200"
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${user.status === "ACTIVE" ? "bg-emerald-500" : "bg-stone-400"}`} />
              {user.status === "ACTIVE" ? "Active" : user.status}
            </span>
          </div>

          <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden px-5 py-1">
            <InfoRow label="Email Address" value={user.email} />
            <InfoRow label="Phone Number" value={user.phone} />
            <InfoRow label="National ID" value={user.nationalId} />
            <InfoRow label="Member Since" value={formatDate(user.createdAt)} />
          </div>
        </div>

        <div className="h-px w-full bg-stone-100 mb-10" />

        { user.type === "ROLE_DOCTOR" && user.profile &&  <DoctorPanel profile={user.profile as TDoctorProfile} /> }
        { user.type === "ROLE_PATIENT" && user.profile &&  <PatientPanel profile={user.profile as TPatientProfile} /> }
        { user.type === "ROLE_ASSISTANT" && user.profile && <AssistantPanel profile={user.profile as TAssistantProfile} user={user} /> }
      </div>
    </div>
  );
}
