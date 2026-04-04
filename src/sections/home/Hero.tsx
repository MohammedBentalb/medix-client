import {ArrowRightIcon, CalendarIcon, UserIcon, FileTextIcon, HeartPulseIcon} from "lucide-react";

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-stone-50">
      
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
        <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-brand-100/50 rounded-full blur-3xl opacity-60 mix-blend-multiply" />
        <div className="absolute bottom-0 left-10 w-[400px] h-[400px] bg-teal-100/40 rounded-full blur-3xl opacity-60 mix-blend-multiply" />
      </div>

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
        <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-brand-100/50 rounded-full blur-3xl opacity-60 mix-blend-multiply" />
        <div className="absolute bottom-0 left-10 w-[400px] h-[400px] bg-teal-100/40 rounded-full blur-3xl opacity-60 mix-blend-multiply" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-100 text-brand-700 text-sm font-medium mb-6">
              <span className="flex h-2 w-2 rounded-full bg-brand-500 animate-pulse"></span>
              The new standard in healthcare
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-stone-900 leading-[1.1] mb-6">
              Connecting <span className="text-brand-600">patients</span> and{" "}
              <span className="text-brand-600">providers</span> seamlessly.
            </h1>

            <p className="text-lg sm:text-xl text-stone-600 mb-8 leading-relaxed max-w-lg">
              MedFlow simplifies healthcare management for everyone. Book
              appointments, access records, and manage your practice all in one
              secure platform.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="group flex items-center justify-center gap-2 bg-brand-600 text-white px-6 py-3.5 rounded-full font-medium hover:bg-brand-700 transition-all shadow-lg shadow-brand-600/20 active:scale-95">
                I'm a Patient
                <ArrowRightIcon
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>
              <button className="group flex items-center justify-center gap-2 bg-white text-stone-800 border border-stone-200 px-6 py-3.5 rounded-full font-medium hover:bg-stone-50 hover:border-stone-300 transition-all active:scale-95">
                I'm a Doctor
              </button>
            </div>

            <div className="mt-10 flex items-center gap-4 text-sm text-stone-500">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-white bg-stone-200 flex items-center justify-center overflow-hidden"
                  >
                    <UserIcon size={14} className="text-stone-400 mt-2" />
                  </div>
                ))}
              </div>
              <p>Join 50,000+ users today</p>
            </div>
          </div>

          <div className="relative lg:h-[500px] flex items-center justify-center">
            {/* Main Dashboard Card */}
            <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl shadow-stone-200/50 border border-stone-100 p-6 z-20">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-jakarta font-semibold text-stone-900">
                    Dr. Sarah Jenkins
                  </h3>
                  <p className="text-sm text-stone-500">
                    Cardiologist • Today's Schedule
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center text-brand-600">
                  <HeartPulseIcon size={20} />
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-xl border border-stone-100 bg-stone-50 flex items-center justify-between group hover:border-brand-200 hover:bg-brand-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-stone-400">
                      <UserIcon size={18} />
                    </div>
                    <div>
                      <h4 className="font-medium text-stone-900 text-sm">
                        Michael R.
                      </h4>
                      <p className="text-xs text-stone-500">Annual Checkup</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-medium text-brand-600">
                      09:00 AM
                    </span>
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-brand-200 bg-brand-50 flex items-center justify-between relative overflow-hidden">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-500"></div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-stone-400">
                      <UserIcon size={18} />
                    </div>
                    <div>
                      <h4 className="font-medium text-stone-900 text-sm">
                        Emma T.
                      </h4>
                      <p className="text-xs text-stone-500">Follow-up</p>
                    </div>
                  </div>
                  <div className="text-right flex flex-col items-end">
                    <span className="text-sm font-medium text-brand-600">
                      10:30 AM
                    </span>
                    <span className="text-[10px] uppercase tracking-wider font-bold text-brand-500 mt-1 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse"></span>
                      In Progress
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -right-6 top-10 bg-white p-4 rounded-xl shadow-xl shadow-stone-200/40 border border-stone-100 z-30 hidden sm:block">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600">
                  <CalendarIcon size={16} />
                </div>
                <div>
                  <p className="text-xs font-medium text-stone-900">
                    Appointment Confirmed
                  </p>
                  <p className="text-[10px] text-stone-500">
                    Tomorrow at 2:00 PM
                  </p>
                </div>
              </div>
            </div>

            <div className="absolute -left-8 bottom-20 bg-white p-4 rounded-xl shadow-xl shadow-stone-200/40 border border-stone-100 z-30 hidden sm:block">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                  <FileTextIcon size={16} />
                </div>
                <div>
                  <p className="text-xs font-medium text-stone-900">
                    Lab Results Ready
                  </p>
                  <p className="text-[10px] text-stone-500">
                    View your recent bloodwork
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
