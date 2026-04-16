import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { SearchIcon, ClockIcon, StarIcon, ArrowRightIcon} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { DarkBanner } from "../../components/DarkBanner";
import { useQuery } from "@tanstack/react-query";
import api from "../../lib/axios/api";
import type { TDoctorProfile, TPaginatedResponse, TUser } from "../../types";
import { Pagination } from "../../components/Pagination";
import { useDebounce } from "../../hooks/useDebounce";

export function DoctorsListing() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);

  const debouncedSearch = useDebounce(searchQuery);

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setPage(1);
  };

  const {data, isLoading} = useQuery<TPaginatedResponse<TUser>>({
    queryFn: async () =>{
      const data = await api.get(`/users/all/doctors?perPage=6&page=${page}&search=${debouncedSearch}`);
      console.log(data);  
      return data.data
    }, 
    queryKey: ['doctors', page, debouncedSearch],
  })

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col">
      <DarkBanner className="pt-40 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-3xl">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-300 text-xs font-semibold tracking-wide uppercase mb-6">
                <span className="flex h-2 w-2 rounded-full bg-brand-400 animate-pulse"></span>
                Top Regional Providers
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-jakarta font-bold text-white mb-6 tracking-tight leading-[1.1]">
                Find the right care, <br />
                <span className="text-brand-400">right now.</span>
              </h1>

              <p className="text-lg text-stone-400 mb-10 max-w-xl leading-relaxed">
                Connect with highly-rated specialists in your area. Book
                appointments instantly and manage your healthcare journey in one
                secure platform.
              </p>

              <div className="flex flex-col sm:flex-row gap-2 p-2 bg-stone-800/50 backdrop-blur-xl border border-stone-700/50 rounded-2xl w-full max-w-4xl shadow-2xl">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-stone-400">
                    <SearchIcon size={18} />
                  </div>
                  <input
                    type="text"
                    placeholder="Search by doctor name or specialty..."
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="w-full h-12 pl-11 pr-4 bg-stone-900/50 hover:bg-stone-900/80 border border-transparent hover:border-stone-600 rounded-xl text-sm md:text-base text-white placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all font-medium"
                  />
                </div>

                <button className="h-12 px-8 rounded-xl bg-brand-600 text-white font-semibold hover:bg-brand-500 transition-all shrink-0 shadow-lg shadow-brand-600/20 active:scale-95">
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </DarkBanner>

      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8 flex items-center justify-between">
          <p className="text-sm font-medium text-stone-500">
            Showing {data?.data.pagination.total ?? 0} {"doctors"}
          </p>
        </div>
        {isLoading && (
          <div className="min-h-100 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-brand-600 border-t-transparent rounded-full animate-spin" />
          </div>
        )}
        {data && data.data.users.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {data.data.users.map((doctor) => (
              <div className="bg-white rounded-2xl border border-stone-200 p-6 hover:border-stone-300 transition-colors flex flex-col">
                <div className="flex items-start gap-4 mb-5">
                  <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center shrink-0">
                    <span className="text-xl font-jakarta font-bold text-stone-600">
                      {`${doctor.firstName[0]}${doctor.lastName[0]}`}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] uppercase tracking-widest font-bold text-stone-500 mb-1">
                      {(doctor.profile as TDoctorProfile).speciality}
                    </p>
                    <h3 className="text-lg font-jakarta font-bold text-stone-900 truncate mb-1">
                      {doctor.firstName}
                    </h3>
                    <p className="text-sm text-stone-600 truncate">
                      No Clinic
                      <span className="mx-1.5 text-stone-300">•</span> unknown
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-5">
                  <span
                    className={`w-2 h-2 rounded-full ${doctor.status === "ACTIVE" ? "bg-emerald-500" : "bg-stone-300"}`}
                  ></span>
                  <span className="text-sm font-medium text-stone-700 capitalize">
                    {doctor.status.toLocaleLowerCase()}
                  </span>
                </div>

                <div className="h-px w-full bg-stone-100 mb-5"></div>

                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5 text-sm text-stone-600">
                      <ClockIcon size={14} className="text-stone-400" />
                      <span>20 min</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-sm font-medium text-stone-900">
                      <StarIcon
                        size={14}
                        className="fill-stone-900 text-stone-900"
                      />
                      <span>4.2</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-6 pt-2">
                  <button
                    onClick={() => navigate(`/doctors/${doctor.id}`)}
                    className="text-sm font-medium text-stone-500 hover:text-stone-900 transition-colors flex items-center gap-1 group"
                  >
                    View Profile
                    <ArrowRightIcon
                      size={14}
                      className="group-hover:translate-x-0.5 transition-transform"
                    />
                  </button>
                  {user?.type === "ROLE_PATIENT" && doctor.status !== "SUSPENDED" && (
                    <Link
                      to={`/doctors/${doctor.id}/book`}
                      className="px-4 py-2 rounded-lg bg-brand-600 text-white text-sm font-medium hover:bg-brand-700 transition-colors active:scale-[0.98]"
                    >
                      Book Appointment
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {data && data.data.users.length > 0 && (
          <Pagination
            currentPage={page}
            lastPage={data?.data.pagination.lastPage ?? 1}
            onPageChange={setPage}
          />
        )}

        {!isLoading && data?.data.users.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <SearchIcon
              size={48}
              className="text-stone-300 mb-4"
              strokeWidth={1.5}
            />
            <h3 className="text-lg font-medium text-stone-900 mb-1">
              No doctors match your search
            </h3>
            <p className="text-stone-500 mb-6">
              Try adjusting your filters or searching for a different specialty.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
