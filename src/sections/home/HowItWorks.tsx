import { steps } from "../../constants/Constant";

export function HowItWorks() {

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4">
            How Medix works
          </h2>
          <p className="text-lg text-stone-600">
            Getting started is simple, whether you're a patient looking for care
            or a provider managing a clinic.
          </p>
        </div>

        <div className="relative">
          <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-0.5 bg-stone-100 z-0" />
          
          <div className="grid md:grid-cols-3 gap-12" >
            {steps.map((step, index) => (
              <div
                key={index}
                className="relative z-10 flex flex-col items-center text-center"
              >
                <div className="w-24 h-24 rounded-full bg-white border-8 border-stone-50 shadow-sm flex items-center justify-center mb-6">
                  <span className="font-jakarta text-2xl font-bold text-brand-600">
                    {step.number}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-stone-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-stone-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
