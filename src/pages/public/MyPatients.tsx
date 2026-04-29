import { useState } from "react";
import { Link } from "react-router";
import { UsersIcon, CalendarDaysIcon, DropletIcon, UserRoundIcon, PhoneIcon, MapPinIcon, SearchIcon } from "lucide-react";
import { DarkBanner } from "../../components/DarkBanner";
import { useQuery } from "@tanstack/react-query";
import api from "../../lib/axios/api";
import type { TUser, TPatientProfile, TPaginatedResponse } from "../../types";
import { Pagination } from "../../components/Pagination";
import { useDebounce } from "../../hooks/useDebounce";

function calcAge(dob: string) {
  return Math.floor(
    (new Date().getTime() - new Date(dob).getTime()) / (1000 * 60 * 60 * 24 * 365.25)
  );
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function getInitials(firstName: string, lastName: string) {
  return `${firstName[0] ?? ""}${lastName[0] ?? ""}`.toUpperCase();
}

export function MyPatients() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);

  const { data, isLoading } = useQuery<TPaginatedResponse<TUser>>({
    queryKey: ["my-patients", page, debouncedSearch],
    queryFn: async () => {
      const res = await api.get(`/doctor/patients?page=${page}&perPage=6&search=${debouncedSearch}`);
      return res.data;
    },
    staleTime: 60 * 1000,
  });

  const patients = data?.data.users ?? [];
  const pagination = data?.data.pagination;

  return (
    <div className="min-h-screen bg-stone-50 pb-20">
      <DarkBanner className="pt-28 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto relative z-10">
          <h1 className="text-3xl md:text-5xl font-jakarta font-bold text-white tracking-tight">
            My Patients
          </h1>
          <p className="text-stone-400 mt-3 text-lg max-w-xl">
            Browse and manage your registered patients and their medical records.
          </p>
        </div>
      </DarkBanner>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="relative mb-8">
          <SearchIcon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            placeholder="Search by patient name..."
            className="w-full pl-9 pr-4 py-2.5 text-sm border border-stone-200 rounded-lg bg-white text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
          />
        </div>

        {isLoading ? (
          <div className="py-24 flex flex-col items-center justify-center text-center">
            <div className="w-12 h-12 rounded-full border-4 border-stone-200 border-t-brand-600 animate-spin mb-4" />
            <p className="text-stone-500 font-medium">Loading patients...</p>
          </div>
        ) : patients.length === 0 ? (
          <div className="py-24 flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm">
              <UsersIcon size={32} className="text-stone-400" />
            </div>
            <h3 className="text-xl font-jakarta font-bold text-stone-900 mb-2">No Patients Yet</h3>
            <p className="text-stone-500 max-w-sm mb-8 leading-relaxed">
              You don't have any registered patients yet. Patients will appear here once they book a consultation with you.
            </p>
            <Link
              to="/doctors/availability"
              className="inline-flex items-center justify-center h-12 px-8 rounded-xl bg-brand-600 text-white font-bold hover:bg-brand-700 transition-colors shadow-lg shadow-brand-500/25"
            >
              Manage Availability
            </Link>
          </div>
        ) : (
          <div className="border-t border-b border-stone-200">
            <div className="divide-y divide-stone-200">
              {patients.map((patient) => {
                const profile = patient.profile as TPatientProfile | null;
                const fullName = `${patient.firstName} ${patient.lastName}`;
                const initials = getInitials(patient.firstName, patient.lastName);

                return (
                  <div
                    key={patient.id}
                    className="py-8 px-2 flex flex-col sm:flex-row sm:items-center gap-6 hover:bg-stone-100 transition-colors"
                  >
                    <div className="shrink-0">
                      <div className="w-14 h-14 rounded-full bg-brand-50 border-2 border-brand-200 flex items-center justify-center overflow-hidden">
                        {patient.image ? (
                          <img src={patient.image} alt={fullName} className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-lg font-jakarta font-bold text-brand-600">{initials}</span>
                        )}
                      </div>
                    </div>

                    <div className="grow min-w-0">
                      <h3 className="text-lg font-jakarta font-bold text-stone-900 mb-1">{fullName}</h3>

                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-stone-500 mb-3">
                        {profile?.gender && profile?.dateOfBirth && (
                          <div className="flex items-center gap-1.5">
                            <UserRoundIcon size={14} className="text-stone-400" />
                            <span>{profile.gender}, {calcAge(profile.dateOfBirth)} yrs</span>
                          </div>
                        )}
                        {profile?.bloodType && (
                          <div className="flex items-center gap-1.5">
                            <DropletIcon size={14} className="text-stone-400" />
                            <span>{profile.bloodType}</span>
                          </div>
                        )}
                        {patient.phone && (
                          <div className="flex items-center gap-1.5">
                            <PhoneIcon size={14} className="text-stone-400" />
                            <span>{patient.phone}</span>
                          </div>
                        )}
                        {profile?.address && (
                          <div className="flex items-center gap-1.5">
                            <MapPinIcon size={14} className="text-stone-400" />
                            <span className="truncate max-w-[200px]">{profile.address}</span>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-1.5 text-xs text-stone-400">
                        <CalendarDaysIcon size={13} />
                        <span>Member since {formatDate(patient.createdAt)}</span>
                      </div>
                    </div>

                    <div className="shrink-0 flex flex-col items-start sm:items-end gap-3 mt-4 sm:mt-0">
                      {profile?.dateOfBirth && (
                        <span className="text-xs text-stone-400 font-medium">
                          DOB: {formatDate(profile.dateOfBirth)}
                        </span>
                      )}
                      <div className="flex items-center gap-4">
                        <Link
                          to={`/patients/history/${patient.id}`}
                          className="text-sm font-semibold text-white bg-brand-600 px-4 py-2 rounded-xl hover:bg-brand-700 transition-colors shadow-sm shadow-brand-500/20"
                        >
                          Medical History
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {pagination && pagination.lastPage > 1 && (
          <div className="mt-8">
            <Pagination currentPage={pagination.currentPage} lastPage={pagination.lastPage} onPageChange={setPage} />
          </div>
        )}
      </div>
    </div>
  );
}
