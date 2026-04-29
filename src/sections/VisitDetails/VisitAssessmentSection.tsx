import { ClipboardListIcon } from "lucide-react";

export function VisitAssessmentSection({ chiefComplaint, clinicalNotes }: { chiefComplaint: string, clinicalNotes: string }) {
  return (
    <section>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-stone-200 flex items-center justify-center text-stone-700 border border-stone-300">
          <ClipboardListIcon size={20} />
        </div>
        <h2 className="text-2xl font-jakarta font-bold text-stone-900 tracking-tight">Visit Assessment</h2>
      </div>
      <div className="bg-white border border-stone-200 rounded-2xl p-6 md:p-8 shadow-sm space-y-6">
        <div>
          <h3 className="text-sm font-bold text-stone-900 mb-2 uppercase tracking-wide">Chief Complaint</h3>
          <p className="text-stone-700 leading-relaxed bg-stone-50 p-4 rounded-xl border border-stone-100">
            {chiefComplaint}
          </p>
        </div>
        <div>
          <h3 className="text-sm font-bold text-stone-900 mb-2 uppercase tracking-wide">Clinical Notes</h3>
          <p className="text-stone-700 leading-relaxed bg-stone-50 p-4 rounded-xl border border-stone-100">
            {clinicalNotes}
          </p>
        </div>
      </div>
    </section>
  );
}
