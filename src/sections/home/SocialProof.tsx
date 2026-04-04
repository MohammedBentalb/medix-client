import { partners } from "../../constants/Constant";

export function SocialProof() {

  return (
    <section className="py-10 bg-white border-y border-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm font-medium text-stone-500 mb-6">
          Trusted by 500+ clinics and 50,000+ patients nationwide
        </p>

        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
          {partners.map((partner) => (
            <div
              key={partner}
              className="flex items-center"
            >
              <span className="font-jakarta font-bold text-xl text-stone-800 tracking-tight">
                {partner}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
