import { ArrowRightIcon } from "lucide-react";

export function CTA() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">

      <div className="absolute inset-0 bg-brand-50/50" />
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-brand-100/50 to-transparent" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div>
          <h2 className="text-4xl md:text-5xl font-bold text-stone-900 mb-6 tracking-tight">
            Ready to transform your healthcare experience?
          </h2>
          <p className="text-xl text-stone-600 mb-10 max-w-2xl mx-auto">
            Join thousands of patients and providers who are already using
            MedFlow to simplify their healthcare journey.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="group flex items-center justify-center gap-2 bg-brand-600 text-white px-8 py-4 rounded-full font-medium text-lg hover:bg-brand-700 transition-all shadow-lg shadow-brand-600/20 active:scale-95">
              Get Started as a Patient
              <ArrowRightIcon
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
            <button className="group flex items-center justify-center gap-2 bg-white text-stone-800 border-2 border-stone-200 px-8 py-4 rounded-full font-medium text-lg hover:bg-stone-50 hover:border-stone-300 transition-all active:scale-95">
              Register Practice
            </button>
          </div>

          <p className="mt-6 text-sm text-stone-500">
            No credit card required for patient accounts. 14-day free trial for
            providers.
          </p>
        </div>
      </div>
    </section>
  );
}
