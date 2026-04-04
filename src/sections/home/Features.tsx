import { useState } from "react";
import { CalendarIcon, ShieldCheckIcon, MessageSquareIcon, PillIcon, ClockIcon, UsersIcon, FileTextIcon, BarChart3Icon } from "lucide-react";

export function Features() {
  const [activeTab, setActiveTab] = useState<"patients" | "doctors">("patients");
  const patientFeatures = [
    {
      icon: <CalendarIcon size={24} />,
      title: "Easy appointment booking",
      description:
        "Find available times and book appointments instantly without waiting on hold.",
    },
    {
      icon: <ShieldCheckIcon size={24} />,
      title: "Secure medical records",
      description:
        "Access your complete health history, test results, and visit summaries anytime.",
    },
    {
      icon: <MessageSquareIcon size={24} />,
      title: "Direct messaging",
      description:
        "Communicate securely with your care team for non-urgent questions and follow-ups.",
    },
    {
      icon: <PillIcon size={24} />,
      title: "Prescription management",
      description:
        "Request refills with one click and get reminders for your daily medications.",
    },
  ];

  const doctorFeatures = [
    {
      icon: <ClockIcon size={24} />,
      title: "Smart scheduling",
      description:
        "Optimize your calendar with automated booking, reminders, and waitlist management.",
    },
    {
      icon: <UsersIcon size={24} />,
      title: "Complete patient history",
      description:
        "Get a comprehensive view of patient health before they even step into the room.",
    },
    {
      icon: <FileTextIcon size={24} />,
      title: "Clinical documentation",
      description:
        "Write notes faster with smart templates and integrated voice-to-text capabilities.",
    },
    {
      icon: <BarChart3Icon size={24} />,
      title: "Practice insights",
      description:
        "Track key metrics, patient outcomes, and practice revenue with built-in analytics.",
    },
  ];

  const activeFeatures = activeTab === "patients" ? patientFeatures : doctorFeatures;
 
  return (
    <section id="features" className="py-24 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4">
            Everything you need, tailored for you
          </h2>
          <p className="text-lg text-stone-600">
            Whether you're managing your own health or running a busy practice,
            MedFlow provides the tools to make it effortless.
          </p>
        </div>

        <div className="flex justify-center mb-16">
          <div className="bg-stone-200/50 p-1.5 rounded-full inline-flex relative">
            <button
              onClick={() => setActiveTab("patients")}
              className={`relative z-10 px-8 py-3 rounded-full text-sm font-semibold transition-colors ${activeTab === "patients" ? "text-brand-700" : "text-stone-600 hover:text-stone-900"}`}
            >
              For Patients
            </button>
            <button
              onClick={() => setActiveTab("doctors")}
              className={`relative z-10 px-8 py-3 rounded-full text-sm font-semibold transition-colors ${activeTab === "doctors" ? "text-brand-700" : "text-stone-600 hover:text-stone-900"}`}
            >
              For Doctors
            </button>

            <div className={`absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] bg-white rounded-full shadow-sm transition-all duration-300 ease-out ${activeTab === "patients" ? "left-1.5" : "left-[calc(50%+1.5px)]"}`}/>
          </div>
        </div>

        <div className="min-h-100">
            <div className="grid md:grid-cols-2 gap-8">
              {activeFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white p-8 rounded-2xl border border-stone-100 shadow-sm hover:shadow-md transition-shadow group h-full flex flex-col"
                >
                  <div className="w-12 h-12 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-stone-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-stone-600 leading-relaxed flex-grow">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
        </div>
      </div>
    </section>
  );
}
