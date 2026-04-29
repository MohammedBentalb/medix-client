import { useState } from "react";
import { Link } from "react-router";
import { DarkBanner } from "../../components/DarkBanner";
import { CalendarDaysIcon, ClockIcon, VideoIcon, MapPinIcon, UserRoundIcon, FileTextIcon, PhoneIcon, SearchIcon } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../lib/axios/api";
import useAuth from "../../hooks/useAuth";
import { useDebounce } from "../../hooks/useDebounce";
import type { TAssistantProfile, TAppointment, AppointmentType, AppointmentStatus, TPagination } from "../../types";
import { Pagination } from "../../components/Pagination";
import { appointmentStatusColors, appointmentStatuses } from "../../constants/Constant";
import { AppointmentsLoader, NoAppointmentsPatient, NoAppointmentsStaff } from "../../sections/appointments/helpers";
import { AppointmentActions } from "../../components/AppointmentActions";


function formatDateDisplay(isoDateString: string) {
  return new Date(isoDateString).toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

const TYPE_CONFIG: Record<AppointmentType, { icon: React.ReactNode; label: string }> = {
  INPERSON: { icon: <MapPinIcon size={16} />, label: "In Clinic Visit" },
  MEET: { icon: <VideoIcon size={16} />,  label: "Video Consultation" },
  CALL: { icon: <PhoneIcon size={16} />,  label: "Phone Call" },
};

export function MyAppointments() {
  const { user } = useAuth();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<AppointmentStatus | "ALL">("ALL");
  const [page, setPage] = useState(1);
  const debouncedSearch = useDebounce(search);

  const appointmentsUrl = (() => {
    if (!user) return null;
    if (user.type === "ROLE_PATIENT") return `/patients/${user.id}/appointments`;
    if (user.type === "ROLE_DOCTOR") return `/doctors/${user.id}/appointments`;
    if (user.type === "ROLE_ASSISTANT") {
      const doctorId = (user.profile as TAssistantProfile)?.doctorId;
      return doctorId ? `/doctors/${doctorId}/appointments` : null;
    }
    return null;
  })();

  const queryClient = useQueryClient();

  const { mutate: confirmAppointment, isPending: isConfirming, variables: confirmingId } = useMutation({
    mutationFn: async (appointmentId: string) => {
      const res = await api.patch(`/appointments/${appointmentId}/confirm`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments", user?.id] });
    },
  });

  const { mutate: cancelAppointment, isPending: isCanceling, variables: cancelingId } = useMutation({
    mutationFn: async (appointmentId: string) => {
      const res = await api.patch(`/appointments/${appointmentId}/cancel`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments", user?.id] });
    },
  });

  const { data, isLoading } = useQuery<{ appointments: TAppointment[]; pagination: TPagination }>({
    queryKey: ["appointments", user?.id, debouncedSearch, statusFilter, page],
    queryFn: async () => {
      const res = await api.get(`${appointmentsUrl}?page=${page}&perPage=6&search=${debouncedSearch}&status=${statusFilter === "ALL" ? "" : statusFilter}`);
      return res.data.data;
    },
    enabled: !!appointmentsUrl,
    staleTime: 60 * 1000,
  });

  const appointments = data?.appointments ?? [];
  const pagination = data?.pagination;

  return (
    <div className="min-h-screen bg-stone-50 pb-20">
      <DarkBanner className="pt-28 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto relative z-10">
          <h1 className="text-3xl md:text-5xl font-jakarta font-bold text-white tracking-tight">
            My Appointments
          </h1>
          <p className="text-stone-400 mt-3 text-lg max-w-xl">
            View and manage your upcoming bookings, medical consultations, and past visits.
          </p>
        </div>
      </DarkBanner>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <div className="relative flex-1">
            <SearchIcon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              placeholder="Search by doctor or patient name..."
              className="w-full pl-9 pr-4 py-2.5 text-sm border border-stone-200 rounded-lg bg-white text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {appointmentStatuses.map((s) => (
              <button
                key={s}
                onClick={() => { setStatusFilter(s); setPage(1); }}
                className={`px-3 py-2 rounded-lg text-xs font-bold border transition-all ${statusFilter === s ? "bg-stone-900 text-white border-stone-900" : "bg-white text-stone-600 border-stone-200 hover:border-stone-400"}`}
              >
                {s === "ALL" ? "All" : s.charAt(0) + s.slice(1).toLowerCase()}
              </button>
            ))}
          </div>
        </div>

        {isLoading ? <AppointmentsLoader /> : appointments.length === 0 ? (
          user?.type === "ROLE_PATIENT" ? <NoAppointmentsPatient /> : <NoAppointmentsStaff />
        ) : (
          <div className="border-t border-b border-stone-200">
            <div className="divide-y divide-stone-200">
              {appointments.map((appt) => {
                const statusConfig = appointmentStatusColors[appt.status];
                const typeConfig = TYPE_CONFIG[appt.type];
                const isPast = new Date(appt.appointmentDate) < new Date();

                const isProcessing = (isConfirming && confirmingId === appt.id) || (isCanceling && cancelingId === appt.id);

                return (
                  <div
                    key={appt.id}
                    className={`py-8 px-2 flex flex-col sm:flex-row sm:items-center gap-6 hover:bg-stone-100 transition-colors ${isPast ? "opacity-75 grayscale-[0.3]" : ""} ${isProcessing ? "opacity-50 pointer-events-none" : ""}`}
                  >
                    <div className="shrink-0 sm:w-48">
                      <div className="flex items-center gap-2 mb-2">
                        <CalendarDaysIcon size={16} className={isPast ? "text-stone-400" : "text-brand-600"} />
                        <span className="text-sm font-semibold text-stone-900">
                          {formatDateDisplay(appt.appointmentDate)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-stone-500 text-sm">
                        <ClockIcon size={16} />
                        <span>{appt.startTime} — {appt.endTime}</span>
                      </div>
                    </div>

                    <div className="grow min-w-0">
                      <Link to={`/doctors/${appt.doctorId}`} className="text-lg font-jakarta font-bold text-stone-900 mb-1 truncate capitalize">
                        Dr. {appt.doctorName}
                      </Link>
                      <div className="flex flex-wrap items-center gap-3 text-sm text-stone-600 mb-3">
                        <div className="flex items-center gap-1.5">
                          <UserRoundIcon size={14} className="text-stone-400" />
                          <span>Patient: {appt.patientName}</span>
                        </div>
                        <span className="w-1 h-1 rounded-full bg-stone-300 hidden sm:block" />
                        <div className="flex items-center gap-1.5">
                          <span className="text-stone-400">{typeConfig.icon}</span>
                          <span>{typeConfig.label}</span>
                        </div>
                      </div>

                      {appt.notes && (
                        <div className="flex items-start gap-2 bg-stone-50 border border-stone-100 rounded-xl p-3 text-sm text-stone-600">
                          <FileTextIcon size={14} className="shrink-0 mt-0.5 text-stone-400" />
                          <p className="line-clamp-2">{appt.notes}</p>
                        </div>
                      )}
                    </div>

                    <div className="shrink-0 flex items-start sm:items-center justify-between sm:flex-col gap-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border ${statusConfig.bg} ${statusConfig.text} ${statusConfig.border}`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${statusConfig.dot}`} />
                        {appt.status}
                      </span>
                      <AppointmentActions appointmentId={appt.id} status={appt.status} userType={user!.type} isProcessing={isProcessing} onCancel={cancelAppointment} onConfirm={confirmAppointment}/>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {pagination  && (
          <div className="mt-8">
            <Pagination currentPage={pagination.currentPage} lastPage={pagination.lastPage} onPageChange={setPage}/>
          </div>
        )}
      </div>
    </div>
  );
}
