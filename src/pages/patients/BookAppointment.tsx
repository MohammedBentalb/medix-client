import { useParams, Link } from 'react-router-dom'
import { ArrowLeftIcon } from 'lucide-react'
import { DarkBanner } from '../../components/DarkBanner'
import { useQuery } from '@tanstack/react-query';
import api from '../../lib/axios/api';
import useAuth from '../../hooks/useAuth';
import type { TDoctorProfile, TUser } from '../../types';
import { AppointmentSection } from '../../sections/BookAppointment/AppointmentSection';

type TSlot = { start: string; end: string };
type TAvailability = Record<string, Record<string, TSlot[]>>;


function BookingLoader() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-brand-600 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

function DoctorNotFound() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center pt-20">
      <h2 className="text-2xl font-jakarta font-bold text-stone-900 mb-4">Doctor not found</h2>
      <Link to="/doctors" className="text-brand-600 hover:underline font-medium">
        Return to directory
      </Link>
    </div>
  );
}

function DoctorSuspended({ doctorId }: { doctorId: string }) {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center pt-20 px-4">
      <div className="max-w-md w-full text-center">
        <h2 className="text-2xl font-jakarta font-bold text-stone-900 mb-3">Doctor unavailable</h2>
        <p className="text-stone-500 mb-6">
          This doctor's account is currently suspended and cannot accept new appointments.
        </p>
        <Link
          to={`/doctors/${doctorId}`}
          className="text-brand-600 hover:underline font-medium"
        >
          Return to profile
        </Link>
      </div>
    </div>
  );
}


export function BookAppointment() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();

  const { data: doctorData, isLoading: isDoctorLoading } = useQuery<TUser>({
    queryKey: ['doctor', id],
    queryFn: async () => {
      const res = await api.get(`/users/${id}`);
      return res.data.data;
    }
  });

  const { data: availability, isLoading: isAvailabilityLoading } = useQuery<TAvailability>({
    queryKey: ['availability', id],
    queryFn: async () => {
      const res = await api.get(`/doctors/${id}/availability`);
      return res.data.data;
    },
    enabled: doctorData !== undefined && doctorData.status !== 'SUSPENDED',
  });

  if (isDoctorLoading) return <BookingLoader />;
  if (!doctorData) return <DoctorNotFound />;
  if (doctorData.status === 'SUSPENDED') return <DoctorSuspended doctorId={id!} />;

  return (
    <div className="min-h-screen bg-white pb-20">
      <DarkBanner className="h-80">
        <div className="pt-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10 w-full">
          <div className="flex flex-col items-start gap-4">
            <Link to={`/doctors/${id}`} className="inline-flex items-center gap-2 text-sm font-medium text-stone-400 hover:text-white transition-colors w-fit">
              <ArrowLeftIcon size={16} />
              Back to Dr. {doctorData.lastName}'s profile
            </Link>
            <div className="flex items-center gap-4 mt-2">
              <div className="w-16 h-16 rounded-full bg-brand-50 flex items-center justify-center shrink-0 border-2 border-brand-500 shadow-md">
                <span className="text-xl font-jakarta font-bold text-brand-600">{doctorData.firstName[0]}{doctorData.lastName[0]}</span>
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-jakarta font-bold text-white mb-1">Book with Dr. {doctorData.firstName} {doctorData.lastName}</h1>
                <div className="flex flex-wrap items-center gap-2 text-stone-300 text-sm">
                  <span className="font-semibold text-brand-400">{(doctorData.profile as TDoctorProfile)?.speciality}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DarkBanner>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="w-full">
          <div className="mb-10 pb-6 border-b border-stone-100">
            <h2 className="text-xl md:text-2xl font-jakarta font-bold text-stone-900">Schedule Appointment</h2>
          </div>
          <AppointmentSection availability={availability} isAvailabilityLoading={isAvailabilityLoading} user={user} doctorId={id!} doctorName={`${doctorData.firstName} ${doctorData.lastName}`}/>
        </div>
      </div>
    </div>
  );
}
