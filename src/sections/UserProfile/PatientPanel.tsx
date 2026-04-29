import { CalendarIcon, HeartPulseIcon, ShieldAlertIcon, UserRoundIcon } from "lucide-react";
import type { TPatientProfile } from "../../types";
import { formatDate } from "./helpers";
import { InfoRow } from "../../components/InfoRow";
import { StatCard } from "../../components/StatCard";

export function PatientPanel({ profile }: { profile: TPatientProfile }) {
  const age = profile.dateOfBirth ? Math.floor( (new Date().getTime() - new Date(profile.dateOfBirth).getTime()) / (1000 * 60 * 60 * 24 * 365.25) ) : null;

  return (
    <>
      <div className="mb-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {age !== null && (
            <StatCard
              icon={<CalendarIcon size={18} className="text-brand-600" />}
              label="Age"
              value={`${age} years old`}
              accent="bg-brand-600/10"
            />
          )}
          <StatCard
            icon={<UserRoundIcon size={18} className="text-brand-600" />}
            label="Gender"
            value={profile.gender}
            accent="bg-brand-600/10"
          />
          {profile.bloodType && (
            <StatCard
              icon={<HeartPulseIcon size={18} className="text-brand-600" />}
              label="Blood Type"
              value={profile.bloodType}
              accent="bg-brand-600/10"
            />
          )}
        </div>
      </div>

      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-xl bg-brand-600/10 flex items-center justify-center text-brand-600 border border-brand-500/10">
            <UserRoundIcon size={16} />
          </div>
          <h2 className="text-lg font-jakarta font-bold text-stone-900">Personal Information</h2>
        </div>
        <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden px-5 py-1">
          <InfoRow label="Date of Birth" value={profile.dateOfBirth ? formatDate(profile.dateOfBirth) : null} />
          <InfoRow label="Gender" value={profile.gender} />
          <InfoRow label="Blood Type" value={profile.bloodType} />
          <InfoRow label="Address" value={profile.address} />
        </div>
      </div>

      {(profile.emergencyContactName || profile.emergencyContactPhone) && (
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-xl bg-brand-600/10 flex items-center justify-center text-brand-600 border border-brand-500/10">
              <ShieldAlertIcon size={16} />
            </div>
            <h2 className="text-lg font-jakarta font-bold text-stone-900">Emergency Contact</h2>
          </div>
          <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden px-5 py-1">
            <InfoRow label="Contact Name" value={profile.emergencyContactName} />
            <InfoRow label="Contact Phone" value={profile.emergencyContactPhone} />
          </div>
        </div>
      )}
    </>
  );
}
