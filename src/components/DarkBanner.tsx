type Props = {
  children?: React.ReactNode;
  className?: string;
  accent?: "brand" | "indigo";
};

const glows = {
  brand: {
    top: "bg-brand-500/20",
    bottom: "bg-teal-500/10",
  },
  indigo: {
    top: "bg-indigo-500/20",
    bottom: "bg-violet-500/10",
  },
};

export function DarkBanner({ children, className = "", accent = "brand" }: Props) {
  const glow = glows[accent];

  return (
    <div className={`bg-stone-900 border-b border-stone-800 relative overflow-hidden ${className}`}>
      <div
        className="absolute inset-0 opacity-10"
        style={{ backgroundImage: "radial-gradient(#ffffff 1.5px, transparent 1.5px)", backgroundSize: "32px 32px" }}
      />
      <div className={`absolute top-0 right-0 w-[500px] h-[500px] ${glow.top} rounded-full blur-[100px] pointer-events-none translate-x-1/3 -translate-y-1/3`} />
      <div className={`absolute bottom-0 left-0 w-[400px] h-[400px] ${glow.bottom} rounded-full blur-[80px] pointer-events-none -translate-x-1/2 translate-y-1/2`} />
      {children}
    </div>
  );
}
