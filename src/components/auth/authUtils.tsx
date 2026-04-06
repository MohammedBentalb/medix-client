export const inputCls = () => 'w-full px-4 py-3 rounded-xl border border-stone-200 bg-stone-50 text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:bg-white transition-all text-sm';

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="pt-4 pb-1 border-t border-stone-100">
      <p className="text-[10px] font-semibold text-stone-400 uppercase tracking-widest">{children}</p>
    </div>
  );
}

export function FieldWrapper({ id, label, required, optional, hint, error, children}: {
  id: string;
  label: string;
  required?: boolean;
  optional?: boolean;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-stone-700 mb-1.5">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
        {optional && <span className="text-stone-400 text-xs font-normal ml-1">(optional)</span>}
      </label>
      {children}
      {error  && <p className="text-xs text-red-500 mt-1">{error}</p>}
      {!error && hint && <p className="text-xs text-stone-400 mt-1">{hint}</p>}
    </div>
  );
}
