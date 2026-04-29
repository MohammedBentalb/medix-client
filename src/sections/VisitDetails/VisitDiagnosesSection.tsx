import { StethoscopeIcon } from "lucide-react";
import type { TDiagnosis } from "../../types";


function getSeverityBadgeStyles(severity: string) {
  if (severity === "SEVERE")   return "bg-stone-800 text-stone-100 border-stone-800";
  if (severity === "MODERATE") return "bg-stone-200 text-stone-800 border-stone-300";
  return "bg-stone-100 text-stone-600 border-stone-200";
}

function getTypeBadgeStyles(type: string) {
  if (type === "PRIMARY")   return "bg-brand-100 text-brand-700 border-brand-200";
  if (type === "SECONDARY") return "bg-stone-100 text-stone-700 border-stone-200";
  return "bg-stone-50 text-stone-500 border-stone-200";
}

export function VisitDiagnosesSection({ diagnoses }: { diagnoses: TDiagnosis[] }) {
  return (
    <section>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-stone-200 flex items-center justify-center text-stone-700 border border-stone-300">
          <StethoscopeIcon size={20} />
        </div>
        <h2 className="text-2xl font-jakarta font-bold text-stone-900 tracking-tight">Clinical Diagnoses</h2>
      </div>

      {diagnoses.length > 0 ? (
        <div className="border-t border-b border-stone-200 divide-y divide-stone-200">
          {diagnoses.map((diagnosis) => (
            <div key={diagnosis.id} className="py-5 flex flex-col md:flex-row md:items-start gap-4 hover:bg-stone-50 transition-colors">
              <div className="md:w-1/3">
                <h4 className="font-bold text-stone-900 text-lg">{diagnosis.name}</h4>
                <div className="flex items-center gap-2 mt-2">
                  <span className={`text-xs font-semibold px-2.5 py-1 border rounded-md ${getTypeBadgeStyles(diagnosis.type)}`}>
                    {diagnosis.type}
                  </span>
                  <span className={`text-xs font-semibold px-2.5 py-1 border rounded-md ${getSeverityBadgeStyles(diagnosis.severity)}`}>
                    {diagnosis.severity}
                  </span>
                </div>
              </div>
              <div className="md:w-2/3 text-stone-600 text-sm bg-white p-4 rounded-xl border border-stone-100 shadow-sm">
                <span className="font-semibold text-stone-900 block mb-1">Notes:</span>
                {diagnosis.notes || "No notes provided."}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-stone-50 border border-stone-200 border-dashed rounded-2xl p-6 text-center text-stone-500">
          No clinical diagnoses recorded for this visit.
        </div>
      )}
    </section>
  );
}
