import { QuoteIcon } from "lucide-react";
export function Testimonials() {
  return (
    <section className="py-24 bg-stone-900 text-stone-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Trusted by both sides of care
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-stone-800/50 border border-stone-700 p-8 rounded-3xl relative">
            <QuoteIcon className="absolute top-8 right-8 text-stone-700 w-12 h-12 opacity-50" />
            <div className="mb-8">
              <div className="inline-block px-3 py-1 rounded-full bg-brand-900/50 text-brand-300 text-xs font-semibold uppercase tracking-wider mb-6 border border-brand-800">
                Patient Perspective
              </div>
              <p className="text-xl leading-relaxed text-stone-300 font-medium">
                "I used to dread calling the doctor's office to make an
                appointment or get a refill. With Medix, I can message my
                doctor directly and see all my lab results the moment they're
                ready. It's completely changed how I manage my health."
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-stone-700 flex items-center justify-center text-xl font-bold text-stone-400">
                E
              </div>
              <div>
                <h4 className="font-semibold text-white">Elena Rodriguez</h4>
                <p className="text-sm text-stone-400">Patient since 2023</p>
              </div>
            </div>
          </div>

          <div className="bg-stone-800/50 border border-stone-700 p-8 rounded-3xl relative">
            <QuoteIcon className="absolute top-8 right-8 text-stone-700 w-12 h-12 opacity-50" />
            <div className="mb-8">
              <div className="inline-block px-3 py-1 rounded-full bg-teal-900/50 text-teal-300 text-xs font-semibold uppercase tracking-wider mb-6 border border-teal-800">
                Provider Perspective
              </div>
              <p className="text-xl leading-relaxed text-stone-300 font-medium">
                "Medix has reduced our administrative overhead by 40%. The
                smart scheduling means fewer no-shows, and having the complete
                patient history at my fingertips allows me to spend more time
                actually talking to my patients rather than looking at a
                screen."
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-stone-700 flex items-center justify-center text-xl font-bold text-stone-400">
                D
              </div>
              <div>
                <h4 className="font-semibold text-white">Dr. James Chen</h4>
                <p className="text-sm text-stone-400">
                  Family Medicine Practitioner
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}