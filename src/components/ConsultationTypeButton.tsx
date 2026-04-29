import { UserIcon, VideoIcon } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";

export default function ConsultationTypeButton({handleClick, consultType, isSelected } : { handleClick: Dispatch<SetStateAction<"INPERSON" | "MEET">>, consultType: "INPERSON" | "MEET", isSelected: boolean}) {
  return (
    <button
        onClick={() => handleClick(consultType)}
        className={`flex items-start gap-3 p-4 rounded-xl border transition-all text-left ${isSelected ? "border-brand-600 bg-brand-50 ring-1 ring-brand-600" : "border-stone-200 bg-white hover:border-brand-300"}`} >
      <div className={`mt-0.5 ${isSelected ? "text-brand-600" : "text-stone-400"}`}>
        {consultType === "MEET" ? <VideoIcon size={20} /> : <UserIcon size={20} />}
      </div>
      <div>
        <p className={`text-sm font-bold mb-0.5 ${isSelected ? "text-brand-900" : "text-stone-900"}`}>
          {consultType === "MEET" ? 'Video Consultation' : "In-Person Visit"}
        </p>
        <p className={`text-xs ${isSelected ? "text-brand-700" : "text-stone-500"}`}>
          {consultType === "MEET" ? 'Secure online video call from anywhere' : 'Visit the doctor at their clinic location'}.
        </p>
      </div>
    </button>
  );
}
