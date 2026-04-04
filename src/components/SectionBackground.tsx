export function SectionBackground(){
    return (
      <>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
          <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-brand-100/50 rounded-full blur-3xl opacity-60 mix-blend-multiply" />
          <div className="absolute bottom-0 left-10 w-[400px] h-[400px] bg-teal-100/40 rounded-full blur-3xl opacity-60 mix-blend-multiply" />
        </div>
      </>
    );
}