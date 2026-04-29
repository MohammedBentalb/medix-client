
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeftIcon, MapPinIcon, StarIcon, GraduationCapIcon, BriefcaseIcon, GlobeIcon, CalendarIcon, BadgeCheckIcon } from "lucide-react";
import { DarkBanner } from "../../components/DarkBanner";
import { useQuery } from "@tanstack/react-query";
import api from "../../lib/axios/api";
import type { TDoctorProfile, TUser } from "../../types";
import useAuth from "../../hooks/useAuth";


export function DoctorProfile() {
  const { id } = useParams<{id: string}>();
  const navigate = useNavigate();
  const { user } = useAuth();

  const { data: doctor, isLoading } = useQuery<TUser>({
    queryFn: async () => {
      const res = await api.get(`/users/${id}`);
      console.log(res.data.data)
      return res.data.data;
    },
    queryKey: ["doctors", id],
  });

  const profile = doctor?.profile as TDoctorProfile | null;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-brand-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center pt-20">
        <h2 className="text-2xl font-jakarta font-bold text-stone-900 mb-4">Doctor not found</h2>
        <Link to="/doctors" className="text-brand-600 hover:underline font-medium">
          Return to directory
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pb-20">
      <DarkBanner className="h-80">
        <div className="pt-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10 w-full">
          <Link to="/doctors" className="inline-flex items-center gap-2 text-sm font-medium text-stone-400 hover:text-white transition-colors mb-8">
            <ArrowLeftIcon size={16} />
            Back to doctors
          </Link>

          <div className="flex items-center gap-6 mt-2">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center shrink-0 border-2 border-brand-500 shadow-xl bg-brand-50 relative z-20 overflow-hidden">
              {doctor.image ? (
                <img src={doctor.image} alt={doctor.firstName} className="w-full h-full object-cover" />
              ) : (
                <span className="text-2xl md:text-3xl font-jakarta font-bold text-brand-600">
                  {doctor.firstName[0]}{doctor.lastName[0]}
                </span>
              )}
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest font-bold text-brand-400 mb-1">
                {profile?.speciality ?? "—"}
              </p>
              <h1 className="text-3xl md:text-4xl font-jakarta font-bold text-white mb-2">
                Dr. {doctor.firstName} {doctor.lastName}
              </h1>
              <div className="flex items-center gap-2 text-stone-300 text-sm">
                <MapPinIcon size={14} className="text-stone-400" />
                <span>City Medical Center</span>
                <span className="text-stone-600">•</span>
                <span>{doctor.status}</span>
              </div>
            </div>
          </div>
        </div>
      </DarkBanner>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">

        <div className="mb-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-10 border-b border-stone-100 mb-10">
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-1.5 bg-stone-50 px-3 py-1.5 rounded-lg border border-stone-100">
                <StarIcon size={14} className="fill-amber-400 text-amber-400" />
                <span className="text-sm font-bold text-stone-900">4.2</span>
                <span className="text-sm text-stone-500">(24 reviews)</span>
              </div>
              <div className="flex items-center gap-1.5 bg-stone-50 px-3 py-1.5 rounded-lg border border-stone-100">
                <BadgeCheckIcon size={14} className="text-brand-500" />
                <span className="text-sm font-medium text-stone-700">{profile?.licenseNumber ?? "—"}</span>
              </div>
              {profile?.consultationFee != null && (
                <div className="text-sm font-semibold text-stone-900">
                  {profile.consultationFee.toLocaleString()} MAD <span className="font-normal text-stone-500">/ visit</span>
                </div>
              )}
            </div>

            {user?.type === "ROLE_PATIENT" && user.id !== doctor.id && doctor.status !== "SUSPENDED" && (
              <Link
                to={`/doctors/${doctor.id}/book`}
                className="px-8 py-3 rounded-full bg-brand-600 text-white font-bold text-sm hover:bg-brand-700 transition-all shadow-md shadow-brand-600/20 active:scale-[0.98]"
              >
                Book Appointment Now
              </Link>
            )}
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-xl font-jakarta font-bold text-stone-900 mb-4">About</h2>
          <p className="text-stone-600 leading-relaxed mb-8">
            {profile?.bio ?? "No bio available."}
          </p>

          <div className="grid sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-100">
              <BriefcaseIcon size={20} className="text-stone-400 mb-3" />
              <p className="text-xs text-stone-500 font-medium mb-1">Experience</p>
              <p className="text-sm font-semibold text-stone-900">
                {profile?.yearsExperience}
              </p>
            </div>
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-100">
              <GraduationCapIcon size={20} className="text-stone-400 mb-3" />
              <p className="text-xs text-stone-500 font-medium mb-1">Education</p>
              <p className="text-sm font-semibold text-stone-900 leading-tight">Not specified</p>
            </div>
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-100">
              <GlobeIcon size={20} className="text-stone-400 mb-3" />
              <p className="text-xs text-stone-500 font-medium mb-1">Languages</p>
              <p className="text-sm font-semibold text-stone-900">English</p>
            </div>
          </div>
        </div>

        <div className="h-px w-full bg-stone-100 mb-10"></div>

        <div className="mb-12">
          <h2 className="text-xl font-jakarta font-bold text-stone-900 mb-4">Accepted Insurance</h2>
          <div className="flex flex-wrap gap-2">
            {["BlueCross", "Aetna", "Cigna", "UnitedHealth"].map((ins) => (
              <span key={ins} className="px-3 py-1.5 rounded-lg bg-stone-50 border border-stone-200 text-sm font-medium text-stone-700">
                {ins}
              </span>
            ))}
          </div>
        </div>

        <div className="h-px w-full bg-stone-100 mb-10"></div>

        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-jakarta font-bold text-stone-900">Upcoming Availability</h2>
            <button
              onClick={() => navigate(`/doctors/${doctor.id}/book`)}
              className="text-sm font-medium text-brand-600 hover:text-brand-700 hover:underline"
            >
              See all availability
            </button>
          </div>

          <div className="space-y-4">
            {[
              { date: "Tomorrow", slots: ["9:00 AM", "10:30 AM", "2:00 PM"] },
              { date: "Wed, Apr 9", slots: ["11:00 AM", "3:30 PM"] },
            ].map((day, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 rounded-xl border border-stone-200">
                <div className="flex items-center gap-2 sm:w-32 shrink-0">
                  <CalendarIcon size={16} className="text-stone-400" />
                  <span className="text-sm font-semibold text-stone-900">{day.date}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {day.slots.map((slot) => (
                    <button
                      key={slot}
                      onClick={() => navigate(`/doctors/${doctor.id}/book`)}
                      className="px-3 py-1.5 rounded-md bg-brand-50 text-brand-700 text-sm font-medium hover:bg-brand-100 transition-colors"
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
