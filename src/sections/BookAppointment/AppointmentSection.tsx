import { useState } from "react";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import type { AppointmentSectionProps, TSlot } from "../../types";
import ConsultationTypeButton from "../../components/ConsultationTypeButton";
import { fullMonths } from "../../constants/Constant";
import api from "../../lib/axios/api";

export function AppointmentSection({ availability, isAvailabilityLoading, user, doctorId , doctorName}: AppointmentSectionProps) {
  const navigate = useNavigate();
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<TSlot | null>(null);
  const [consultType, setConsultType] = useState<"INPERSON" | "MEET">("INPERSON");
  const [notes, setNotes] = useState("");

  const months = availability ? Object.keys(availability) : [];
  const activeMonth = selectedMonth ?? months[0] ?? null;
  const daysInMonth = activeMonth && availability ? Object.entries(availability[activeMonth]) : [];
  const slotsForDay: TSlot[] = selectedDay && activeMonth && availability ? availability[activeMonth][selectedDay] : [];

  const formatDateToDay = (date: string) =>
    new Date(date).toLocaleString("en-US", { weekday: "short" });

  const handleMonthChange = (month: string) => {
    setSelectedMonth(month);
    setSelectedDay(null);
    setSelectedSlot(null);
  };

  const handleDayChange = (day: string) => {
    setSelectedDay(day);
    setSelectedSlot(null);
  };

  const handleSlotChange = (slot: TSlot) => setSelectedSlot(slot);

  const { mutate: bookAppointment, isPending } = useMutation({
    mutationFn: async (body: object) => {
      const res = await api.post('/appointments', body);
      return res.data;
    },
    onSuccess: () => {
      toast.success('Appointment booked');
      navigate('/appointments');
    },
    onError: () => toast.error('Failed to book appointment'),
  });

  const handleConfirm = () => {
    if (!selectedDay || !selectedSlot) return;
    bookAppointment({
      doctorId,
      doctorName,
      patientId: user?.id,
      patientName: `${user?.firstName} ${user?.lastName}`,
      appointmentDate: selectedDay,
      startTime: selectedSlot.start,
      endTime: selectedSlot.end,
      type: consultType,
      notes,
    });
  };

  if (isAvailabilityLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-7 h-7 border-2 border-brand-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!availability || Object.keys(availability).length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <h2 className="text-xl font-jakarta font-bold text-stone-900 mb-3">
          Doctor unavailable
        </h2>
        <p className="text-stone-500">
          This doctor has no available slots at the moment.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="mb-8">
        <h3 className="text-sm font-bold text-stone-900 mb-4">
          1. Select Month
        </h3>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide -mx-2 px-2">
          {months.map((month) => (
            <button
              key={month}
              onClick={() => handleMonthChange(month)}
              className={`flex flex-col items-center justify-center min-w-[80px] p-3 rounded-xl border transition-all ${activeMonth === month ? "border-brand-600 bg-brand-50 ring-1 ring-brand-600" : "border-stone-200 bg-white hover:border-brand-300"}`}
            >
              <span
                className={`text-xs font-medium mb-1 ${activeMonth === month ? "text-brand-700" : "text-stone-500"}`}
              >
                {fullMonths[month.split("-")[1]]}
              </span>
              <span
                className={`text-sm font-bold ${activeMonth === month ? "text-brand-900" : "text-stone-900"}`}
              >
                {month}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-sm font-bold text-stone-900 mb-4">
          2. Select Date
        </h3>
        {!activeMonth ? (
          <p className="text-sm text-stone-500 italic bg-stone-50 p-4 rounded-lg border border-stone-100">
            No availability data yet.
          </p>
        ) : daysInMonth.length === 0 ? (
          <p className="text-sm text-stone-500 italic bg-stone-50 p-4 rounded-lg border border-stone-100">
            No available days this month.
          </p>
        ) : (
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide -mx-2 px-2">
            {daysInMonth.map(([day]) => (
              <button
                key={day}
                onClick={() => handleDayChange(day)}
                className={`flex flex-col items-center justify-center min-w-[80px] p-3 rounded-xl border transition-all ${selectedDay === day ? "border-brand-600 bg-brand-50 ring-1 ring-brand-600" : "border-stone-200 bg-white hover:border-brand-300"}`}
              >
                <span className={`text-xs font-medium mb-1 ${selectedDay === day ? "text-brand-700" : "text-stone-500"}`}>
                  {day}
                </span>
                <span className={`text-sm font-bold ${selectedDay === day ? "text-brand-900" : "text-stone-900"}`}>
                  {formatDateToDay(day)}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="mb-8">
        <h3 className="text-sm font-bold text-stone-900 mb-4">
          3. Select Time
        </h3>
        {!selectedDay ? (
          <p className="text-sm text-stone-500 italic bg-stone-50 p-4 rounded-lg border border-stone-100">
            Please select a date first.
          </p>
        ) : slotsForDay.length === 0 ? (
          <p className="text-sm text-stone-500 italic bg-stone-50 p-4 rounded-lg border border-stone-100">
            No slots available for this day.
          </p>
        ) : (
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
            {slotsForDay.map((time) => (
              <button
                key={time.start}
                onClick={() => handleSlotChange(time)}
                className={`py-2.5 px-3 rounded-lg text-sm font-medium transition-all border ${time.start === selectedSlot?.start ? "bg-brand-600 border-brand-600 text-white shadow-sm" : "bg-white border-stone-200 text-stone-700 hover:border-brand-300 hover:bg-brand-50"}`}
              >
                {time.start} – {time.end}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="mb-8">
        <h3 className="text-sm font-bold text-stone-900 mb-4">
          4. Consultation Type
        </h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <ConsultationTypeButton handleClick={setConsultType} consultType="INPERSON" isSelected={consultType === "INPERSON"} />
          <ConsultationTypeButton handleClick={setConsultType} consultType="MEET" isSelected={consultType === "MEET"} />
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-sm font-bold text-stone-900 mb-4">
          5. Reason for visit (Optional)
        </h3>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Briefly describe your symptoms or reason for the appointment..."
          className="w-full p-3 bg-white border border-stone-200 rounded-lg text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all resize-none h-24"
        />
      </div>

      <div className="pt-6 border-t border-stone-100">
        <button
          onClick={handleConfirm}
          disabled={!selectedDay || !selectedSlot || isPending}
          className={`w-full py-3.5 rounded-lg text-sm font-bold transition-all shadow-sm ${selectedDay && selectedSlot ? "bg-brand-600 text-white hover:bg-brand-700 active:scale-[0.98]" : "bg-stone-100 text-stone-400 cursor-not-allowed"} ${isPending ? "opacity-70 cursor-not-allowed" : ""}`}
        >
          {isPending ? "Booking..." : "Confirm Booking"}
        </button>
        <p className="text-center text-xs text-stone-500 mt-3">
          Free cancellation up to 24 hours before your appointment.
        </p>
      </div>
    </>
  );
}
