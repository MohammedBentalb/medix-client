import { CalendarDaysIcon } from "lucide-react";
import { Link } from "react-router";

export const AppointmentsLoader = () => {
  return (
    <div className="py-24 flex flex-col items-center justify-center text-center">
      <div className="w-12 h-12 rounded-full border-4 border-stone-200 border-t-brand-600 animate-spin mb-4" />
      <p className="text-stone-500 font-medium">Loading appointments...</p>
    </div>
  );
};

export const NoAppointmentsPatient = () => {
  return (
    <div className="py-24 flex flex-col items-center justify-center text-center">
      <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm">
        <CalendarDaysIcon size={32} className="text-stone-400" />
      </div>
      <h3 className="text-xl font-jakarta font-bold text-stone-900 mb-2">
        No Appointments Yet
      </h3>
      <p className="text-stone-500 max-w-sm mb-8 leading-relaxed">
        You haven't booked any medical consultations yet. Browse our doctors and
        schedule your first visit.
      </p>
      <Link
        to="/doctors"
        className="inline-flex items-center justify-center h-12 px-8 rounded-xl bg-brand-600 text-white font-bold hover:bg-brand-700 transition-colors shadow-lg shadow-brand-500/25"
      >
        Find a Doctor
      </Link>
    </div>
  );
};

export const NoAppointmentsStaff = () => {
  return (
    <div className="py-24 flex flex-col items-center justify-center text-center">
      <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm">
        <CalendarDaysIcon size={32} className="text-stone-400" />
      </div>
      <h3 className="text-xl font-jakarta font-bold text-stone-900 mb-2">
        No Appointments Found
      </h3>
      <p className="text-stone-500 max-w-sm leading-relaxed">
        There are no appointments scheduled at the moment. New bookings will
        appear here once patients start scheduling.
      </p>
    </div>
  );
};
