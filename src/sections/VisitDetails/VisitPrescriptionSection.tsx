import { PillIcon } from "lucide-react";
import type { TPrescription } from "../../types";

export function VisitPrescriptionSection({ prescription }: {prescription: TPrescription | null}) {
  return (
    <section>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-stone-200 flex items-center justify-center text-stone-700 border border-stone-300">
          <PillIcon size={20} />
        </div>
        <h2 className="text-2xl font-jakarta font-bold text-stone-900 tracking-tight">Prescription</h2>
      </div>

      {prescription ? (
        <div className="space-y-6">
          {prescription.notes && (
            <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm">
              <h3 className="text-sm font-bold text-stone-900 mb-2 uppercase tracking-wide">Prescription Notes</h3>
              <p className="text-stone-700 leading-relaxed">{prescription.notes}</p>
            </div>
          )}

          {prescription.items.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {prescription.items.map((item) => (
                <div key={item.id} className="bg-white border border-stone-200 rounded-2xl p-5 shadow-sm">
                  <h4 className="font-bold text-stone-900 text-lg mb-3 pb-3 border-b border-stone-100 flex items-center justify-between">
                    {item.medicineName}
                    <span className="text-xs font-medium bg-stone-100 text-stone-600 px-2.5 py-1 rounded-full">
                      {item.duration} days
                    </span>
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-stone-500">Dosage:</span>
                      <span className="font-medium text-stone-900">{item.dosage}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-500">Frequency:</span>
                      <span className="font-medium text-stone-900">{item.frequency}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-500">Route:</span>
                      <span className="font-medium text-stone-900">{item.route}</span>
                    </div>
                  </div>
                  {item.instructions && (
                    <div className="mt-4 pt-4 border-t border-stone-100 text-sm text-stone-600 bg-stone-50 p-3 rounded-xl">
                      <span className="font-bold text-stone-900 block mb-1">Instructions:</span>
                      {item.instructions}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-stone-50 border border-stone-200 border-dashed rounded-2xl p-6 text-center text-stone-500">
              No prescription items issued.
            </div>
          )}
        </div>
      ) : (
        <div className="bg-stone-50 border border-stone-200 border-dashed rounded-2xl p-6 text-center text-stone-500">
          No prescription recorded for this visit.
        </div>
      )}
    </section>
  );
}
