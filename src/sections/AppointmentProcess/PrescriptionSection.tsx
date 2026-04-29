import { PillIcon, PlusIcon, Trash2Icon, InfoIcon } from "lucide-react";
import { FieldWrapper, inputCls } from "../../components/auth/authUtils";
import type { TVisitFormPrescriptionItem } from "../../types";

type Props = {
  prescriptionNotes: string;
  prescriptionItems: TVisitFormPrescriptionItem[];
  onNotesChange: (value: string) => void;
  onAdd: () => void;
  onRemove: (id: string) => void;
  onUpdate: (id: string, field: keyof TVisitFormPrescriptionItem, value: string) => void;
  errors: Record<string, string[] | undefined>;
};

export function PrescriptionSection({ prescriptionNotes, prescriptionItems, onNotesChange, onAdd, onRemove, onUpdate, errors }: Props) {
  return (
    <section>
      <div className="mb-8 border-b border-stone-100 pb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/10 flex items-center justify-center text-indigo-600 shadow-sm border border-indigo-500/10">
              <PillIcon size={20} />
            </div>
            <h2 className="text-2xl font-jakarta font-bold text-stone-900 tracking-tight">Digital Prescription</h2>
          </div>
          <button
            onClick={onAdd}
            className="flex items-center gap-2 text-sm font-bold text-indigo-600 hover:text-indigo-700 transition-colors"
          >
            <PlusIcon size={16} /> Add Medicine
          </button>
        </div>

        <FieldWrapper id="presc_notes" label="Prescription Notes" optional>
          <input
            id="presc_notes"
            value={prescriptionNotes}
            onChange={(e) => onNotesChange(e.target.value)}
            placeholder="General pharmacy instructions..."
            className={`${inputCls()} bg-white border-stone-200 shadow-sm`}
          />
        </FieldWrapper>
      </div>

      <div className="space-y-6">
        {prescriptionItems.map((item, index) => (
          <div key={item.id} className="p-8 bg-white border border-stone-200 rounded-3xl shadow-sm hover:shadow-md transition-all group relative">
            <button
              onClick={() => onRemove(item.id)}
              className="absolute top-4 right-4 p-1.5 text-stone-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
            >
              <Trash2Icon size={16} />
            </button>

            <div className="flex items-center gap-2 text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-4">
              <span>Medicine Item #{index + 1}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="md:col-span-1">
                <FieldWrapper id={`med_${item.id}`} label="Medicine" error={errors[`prescription.items.${index}.medicine_name`]?.[0]}>
                  <input
                    value={item.medicine}
                    onChange={(e) => onUpdate(item.id, "medicine", e.target.value)}
                    placeholder="e.g. Paracetamol 500mg"
                    className={inputCls()}
                  />
                </FieldWrapper>
              </div>
              <FieldWrapper id={`dosage_${item.id}`} label="Dosage" error={errors[`prescription.items.${index}.dosage`]?.[0]}>
                <input
                  id={`dosage_${item.id}`}
                  value={item.dosage}
                  onChange={(e) => onUpdate(item.id, "dosage", e.target.value)}
                  placeholder="e.g. 500mg"
                  className={inputCls()}
                />
              </FieldWrapper>
              <FieldWrapper id={`freq_${item.id}`} label="Frequency" error={errors[`prescription.items.${index}.frequency`]?.[0]}>
                <input
                  id={`freq_${item.id}`}
                  value={item.frequency}
                  onChange={(e) => onUpdate(item.id, "frequency", e.target.value)}
                  placeholder="e.g. 2x Daily"
                  className={inputCls()}
                />
              </FieldWrapper>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <FieldWrapper id={`duration_${item.id}`} label="Duration (Days)" error={errors[`prescription.items.${index}.duration`]?.[0]}>
                <input
                  type="number"
                  id={`duration_${item.id}`}
                  value={item.duration}
                  onChange={(e) => onUpdate(item.id, "duration", e.target.value)}
                  placeholder="7"
                  className={inputCls()}
                />
              </FieldWrapper>
              <FieldWrapper id={`route_${item.id}`} label="Route">
                <select
                  id={`route_${item.id}`}
                  value={item.route}
                  onChange={(e) => onUpdate(item.id, "route", e.target.value)}
                  className={inputCls()}
                >
                  <option value="ORAL">Oral</option>
                  <option value="TROPICAL">Topical</option>
                  <option value="INHALATION">Inhalation</option>
                  <option value="SUBLINGUAL">Sublingual</option>
                </select>
              </FieldWrapper>
              <div className="flex items-end">
                <div className="w-full bg-indigo-50 border border-indigo-100 rounded-xl px-4 py-2 flex items-center gap-2 h-[46px]">
                  <InfoIcon size={14} className="text-indigo-400 shrink-0" />
                  <p className="text-[11px] text-indigo-700 font-medium leading-tight">
                    Patient will be receiving an email with the corresponding medicine info
                  </p>
                </div>
              </div>
            </div>

            <FieldWrapper id={`inst_${item.id}`} label="Instructions" optional>
              <input
                id={`inst_${item.id}`}
                value={item.instructions}
                onChange={(e) => onUpdate(item.id, "instructions", e.target.value)}
                placeholder="e.g. Take after meals, avoid alcohol..."
                className={inputCls()}
              />
            </FieldWrapper>
          </div>
        ))}
      </div>
    </section>
  );
}
