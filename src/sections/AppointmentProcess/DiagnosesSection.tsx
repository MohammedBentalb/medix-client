import { StethoscopeIcon, PlusIcon, Trash2Icon } from "lucide-react";
import { FieldWrapper, inputCls } from "../../components/auth/authUtils";
import type { TVisitFormDiagnosis } from "../../types";

type Props = {
  diagnoses: TVisitFormDiagnosis[];
  onAdd: () => void;
  onRemove: (id: string) => void;
  onUpdate: (id: string, field: keyof TVisitFormDiagnosis, value: string) => void;
  errors: Record<string, string[] | undefined>;
};

export function DiagnosesSection({ diagnoses, onAdd, onRemove, onUpdate, errors }: Props) {
  return (
    <section>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-600/10 flex items-center justify-center text-emerald-600 shadow-sm border border-emerald-500/10">
            <StethoscopeIcon size={20} />
          </div>
          <h2 className="text-2xl font-jakarta font-bold text-stone-900 tracking-tight">Clinical Diagnoses</h2>
        </div>
        <button
          onClick={onAdd}
          className="flex items-center gap-2 text-sm font-bold text-brand-600 hover:text-brand-700 transition-colors"
        >
          <PlusIcon size={16} /> Add Diagnosis
        </button>
      </div>

      {errors.diagnoses && <p className="text-xs text-red-500 mb-4">{errors.diagnoses[0]}</p>}

      <div className="space-y-6">
        {diagnoses.map((diagnosis, index) => (
          <div key={diagnosis.id} className="p-6 bg-white rounded-3xl border border-stone-200 shadow-sm relative group">
            {diagnoses.length > 1 && (
              <button
                onClick={() => onRemove(diagnosis.id)}
                className="absolute top-4 right-4 p-1.5 text-stone-300 hover:text-red-500 transition-colors opacity-100 md:opacity-0 group-hover:opacity-100"
              >
                <Trash2Icon size={16} />
              </button>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <FieldWrapper id={`diagnosis_name_${diagnosis.id}`} label="Condition" error={errors[`diagnoses.${index}.name`]?.[0]}>
                <input
                  id={`diagnosis_name_${diagnosis.id}`}
                  value={diagnosis.name}
                  onChange={(e) => onUpdate(diagnosis.id, "name", e.target.value)}
                  placeholder="Search condition catalogue..."
                  className={inputCls()}
                />
              </FieldWrapper>
              <div className="grid grid-cols-2 gap-3">
                <FieldWrapper id={`diagnosis_type_${diagnosis.id}`} label="Type">
                  <select
                    id={`diagnosis_type_${diagnosis.id}`}
                    value={diagnosis.type}
                    onChange={(e) => onUpdate(diagnosis.id, "type", e.target.value)}
                    className={inputCls()}
                  >
                    <option value="PRIMARY">Primary</option>
                    <option value="SECONDARY">Secondary</option>
                    <option value="DIFFERENTIAL">Differential</option>
                  </select>
                </FieldWrapper>
                <FieldWrapper id={`diagnosis_severity_${diagnosis.id}`} label="Severity">
                  <select
                    id={`diagnosis_severity_${diagnosis.id}`}
                    value={diagnosis.severity}
                    onChange={(e) => onUpdate(diagnosis.id, "severity", e.target.value)}
                    className={inputCls()}
                  >
                    <option value="MILD">Mild</option>
                    <option value="MODERATE">Moderate</option>
                    <option value="SEVERE">Severe</option>
                  </select>
                </FieldWrapper>
              </div>
            </div>

            <FieldWrapper id={`diagnosis_notes_${diagnosis.id}`} label="Management Notes" optional>
              <input
                id={`diagnosis_notes_${diagnosis.id}`}
                value={diagnosis.notes}
                onChange={(e) => onUpdate(diagnosis.id, "notes", e.target.value)}
                placeholder="Additional details regarding this diagnosis..."
                className={inputCls()}
              />
            </FieldWrapper>
          </div>
        ))}
      </div>
    </section>
  );
}
