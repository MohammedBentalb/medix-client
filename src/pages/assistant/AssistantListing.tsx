import { useState } from "react";
import { SearchIcon } from "lucide-react";
import { DarkBanner } from "../../components/DarkBanner";
import useAuth from "../../hooks/useAuth";
import type { TPaginatedResponse, TUser } from "../../types";
import { useQuery } from "@tanstack/react-query";
import api from "../../lib/axios/api";
import { useDebounce } from "../../hooks/useDebounce";
import { AssistantCard } from "../../components/AssistantCard";
import { Pagination } from "../../components/Pagination";

export function AssistantListing() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);

  const debouncedSearch = useDebounce(searchQuery);

  const { data, isLoading, isError } = useQuery<TPaginatedResponse<TUser>>({
    queryFn: async () => {
      const res = await api.get(`/users/all/assistants?perPage=6&page=${page}&search=${debouncedSearch}`);
      return res.data;
    },
    queryKey: ["assistants", debouncedSearch, page],
  });

  const assistants = data?.data.users ?? [];
  const pagination = data?.data.pagination;

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col">
      <DarkBanner className="pt-40 pb-24 px-4 sm:px-6 lg:px-8" accent="indigo">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold tracking-wide uppercase mb-6">
              <span className="flex h-2 w-2 rounded-full bg-indigo-400 animate-pulse" />
              Clinical Staff Directory
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-jakarta font-bold text-white mb-6 tracking-tight leading-[1.1]">
              Find your next <br />
              <span className="text-indigo-400">care assistant.</span>
            </h1>

            <p className="text-lg text-stone-400 mb-10 max-w-xl leading-relaxed">
              Browse available medical assistants. Add the right staff to your
              team and coordinate patient care more efficiently.
            </p>

            <div className="flex flex-col sm:flex-row gap-2 p-2 bg-stone-800/50 backdrop-blur-xl border border-stone-700/50 rounded-2xl w-full max-w-2xl shadow-2xl">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-stone-400">
                  <SearchIcon size={18} />
                </div>
                <input
                  type="text"
                  placeholder="Search by name..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="w-full h-12 pl-11 pr-4 bg-stone-900/50 hover:bg-stone-900/80 border border-transparent hover:border-stone-600 rounded-xl text-sm text-white placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium"
                />
              </div>
              <button className="h-12 px-8 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-500 transition-all shrink-0 shadow-lg active:scale-95">
                Search
              </button>
            </div>
          </div>
        </div>
      </DarkBanner>

      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
        {isLoading && (
          <div className="flex items-center justify-center py-32">
            <div className="w-8 h-8 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {isError && (
          <div className="flex flex-col items-center justify-center py-32 gap-2">
            <p className="text-stone-900 font-medium">Failed to load assistants.</p>
            <p className="text-stone-500 text-sm">Please try again later.</p>
          </div>
        )}

        {!isLoading && !isError && assistants.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <SearchIcon size={48} className="text-stone-300 mb-4" strokeWidth={1.5} />
            <h3 className="text-lg font-medium text-stone-900 mb-1">No assistants match your search</h3>
            <p className="text-stone-500 mb-6">Try a different name.</p>
            <button onClick={() => handleSearch("")} className="text-sm font-medium text-stone-900 hover:underline">
              Clear search
            </button>
          </div>
        )}

        {!isLoading && !isError && assistants.length > 0 && (
          <>
            <div className="mb-8">
              <p className="text-sm font-medium text-stone-500">
                Showing {assistants.length} {assistants.length === 1 ? "assistant" : "assistants"}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {assistants.map((assistant: TUser) => (
                <AssistantCard
                  key={assistant.id}
                  assistant={assistant}
                  isDoctor={user?.type === "ROLE_DOCTOR"}
                />
              ))}
            </div>
            {pagination  && (
              <div className="mt-10">
                <Pagination
                  currentPage={pagination.currentPage}
                  lastPage={pagination.lastPage}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
