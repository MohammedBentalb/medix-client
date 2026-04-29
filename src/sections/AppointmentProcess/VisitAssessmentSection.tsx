import { ClipboardListIcon } from "lucide-react";
import { FieldWrapper, inputCls } from "../../components/auth/authUtils";

type Props = {
  chiefComplaint: string;
  clinicalNotes: string;
  onChiefComplaintChange: (value: string) => void;
  onClinicalNotesChange: (value: string) => void;
  errors: Record<string, string[] | undefined>;
};

export function VisitAssessmentSection({ chiefComplaint, clinicalNotes, onChiefComplaintChange, onClinicalNotesChange, errors }: Props) {
  return (
    <section>
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-brand-600/10 flex items-center justify-center text-brand-600 shadow-sm border border-brand-500/10">
          <ClipboardListIcon size={20} />
        </div>
        <h2 className="text-2xl font-jakarta font-bold text-stone-900 tracking-tight">Visit Assessment</h2>
      </div>

      <div className="space-y-8">
        <FieldWrapper id="chief_complaint" label="Chief Complaint" required hint="What the patient came for today." error={errors.chief_complaint?.[0]}>
          <textarea
            id="chief_complaint"
            value={chiefComplaint}
            onChange={(e) => onChiefComplaintChange(e.target.value)}
            className={`${inputCls()} min-h-25 bg-white border-stone-200 resize-none h-auto shadow-sm`}
            placeholder="e.g. Persistent dry cough and mild fever for 3 days..."
          />
        </FieldWrapper>

        <FieldWrapper id="clinical_notes" label="Clinical Notes" required hint="Doctor's observations and exam results." error={errors.clinical_notes?.[0]}>
          <textarea
            id="clinical_notes"
            value={clinicalNotes}
            onChange={(e) => onClinicalNotesChange(e.target.value)}
            className={`${inputCls()} min-h-35 bg-white border-stone-200 resize-none h-auto shadow-sm`}
            placeholder="Physical exam reveals clear lungs, slightly inflamed throat..."
          />
        </FieldWrapper>
      </div>
    </section>
  );
}
