export function StatCard({ icon, label, value, accent }: { icon: React.ReactNode; label: string; value: string | number; accent: string }) {
  return (
    <div className="p-5 rounded-2xl bg-stone-50 border border-stone-100 flex flex-col gap-3">
      <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${accent}`}>
        {icon}
      </div>
      <div>
        <p className="text-xs text-stone-500 font-medium mb-0.5">{label}</p>
        <p className="text-sm font-bold text-stone-900">{value}</p>
      </div>
    </div>
  );
}
