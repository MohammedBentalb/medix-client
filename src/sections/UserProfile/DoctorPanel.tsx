import { StethoscopeIcon, BadgeCheckIcon, BriefcaseIcon, DollarSignIcon, AlignLeftIcon } from "lucide-react";
import type { TDoctorProfile } from "../../types";
import { InfoRow } from "../../components/InfoRow";
import { StatCard } from "../../components/StatCard";

export function DoctorPanel({ profile }: { profile: TDoctorProfile }) {
  return (
    <>
      <div className="mb-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <StatCard
            icon={<BriefcaseIcon size={18} className="text-brand-600" />}
            label="Experience"
            value={`${profile.yearsExperience} years`}
            accent="bg-brand-600/10"
          />
          <StatCard
            icon={<DollarSignIcon size={18} className="text-brand-600" />}
            label="Consultation Fee"
            value={`${profile.consultationFee.toLocaleString()} MAD`}
            accent="bg-brand-600/10"
          />
          <StatCard
            icon={<BadgeCheckIcon size={18} className="text-brand-600" />}
            label="License No."
            value={profile.licenseNumber}
            accent="bg-brand-600/10"
          />
        </div>
      </div>

      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-xl bg-brand-600/10 flex items-center justify-center text-brand-600 border border-brand-500/10">
            <AlignLeftIcon size={16} />
          </div>
          <h2 className="text-lg font-jakarta font-bold text-stone-900">Biography</h2>
        </div>
        <p className="text-stone-600 leading-relaxed text-sm bg-stone-50 p-5 rounded-2xl border border-stone-100">
          {profile.bio}
        </p>
      </div>

      <div>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-xl bg-brand-600/10 flex items-center justify-center text-brand-600 border border-brand-500/10">
            <StethoscopeIcon size={16} />
          </div>
          <h2 className="text-lg font-jakarta font-bold text-stone-900">Professional Details</h2>
        </div>
        <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden px-5 py-1">
          <InfoRow label="Speciality" value={profile.speciality} />
          <InfoRow label="License Number" value={profile.licenseNumber} />
          <InfoRow label="Years of Experience" value={`${profile.yearsExperience} years`} />
          <InfoRow label="Consultation Fee" value={`${profile.consultationFee.toLocaleString()} MAD / visit`} />
        </div>
      </div>
    </>
  );
}
