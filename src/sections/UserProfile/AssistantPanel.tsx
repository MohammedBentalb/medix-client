import { ClockIcon, CheckCircle2Icon, LinkIcon, ShieldAlertIcon } from "lucide-react";
import type { TAssistantProfile, TUser } from "../../types";
import { formatDate } from "./helpers";
import { InfoRow } from "../../components/InfoRow";
import { StatCard } from "../../components/StatCard";

export function AssistantPanel({ profile, user }: { profile: TAssistantProfile; user: TUser }) {
  return (
    <>
      <div className="mb-8">
        <div className="grid grid-cols-2 gap-4">
          <StatCard
            icon={<CheckCircle2Icon size={18} className="text-brand-600" />}
            label="Account Status"
            value={user.status === "ACTIVE" ? "Active" : user.status}
            accent="bg-brand-600/10"
          />
          <StatCard
            icon={<ClockIcon size={18} className="text-brand-600" />}
            label="Member Since"
            value={formatDate(user.createdAt)}
            accent="bg-brand-600/10"
          />
        </div>
      </div>

      <div>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-xl bg-brand-600/10 flex items-center justify-center text-brand-600 border border-brand-500/10">
            <LinkIcon size={16} />
          </div>
          <h2 className="text-lg font-jakarta font-bold text-stone-900">Assignment</h2>
        </div>
        {profile.doctorId ? (
          <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden px-5 py-1">
            <InfoRow label="Assigned Doctor ID" value={profile.doctorId} />
          </div>
        ) : (
          <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 text-sm text-stone-700 font-medium flex items-center gap-3">
            <ShieldAlertIcon size={18} className="text-brand-500 shrink-0" />
            This assistant is not yet assigned to a doctor.
          </div>
        )}
      </div>
    </>
  );
}
