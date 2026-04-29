import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router";
import { DarkBanner } from "../../components/DarkBanner";
import { CalendarDaysIcon, ChevronLeftIcon, FileTextIcon, ActivityIcon, PillIcon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import api from "../../lib/axios/api";
import type { TVisit, TDiagnosis } from "../../types";
import { Pagination } from "../../components/Pagination";

function formatDateDisplay(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {weekday: "long", day: "numeric", month: "long", year: "numeric"});
}

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
}

function primaryDiagnosis(diagnoses: TDiagnosis[]) {
  return diagnoses.find((d) => d.type === "PRIMARY") ?? null;
}

export function PatientHistory() {
  const { id: patientId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [date, setDate] = useState("");

  const { data, isLoading } = useQuery<{ visits: TVisit[]; pagination: { total: number; perPage: number; currentPage: number; lastPage: number } }>({
    queryKey: ["patient-history", patientId, page],
    queryFn: async () => {
      const res = await api.get(`/patients/${patientId}/records?page=${page}&perPage=6`);
      return res.data.data;
    },
    enabled: !!patientId,
    staleTime: 60 * 1000,
  });

  const visits = data?.visits ?? [];
  const pagination = data?.pagination;

  return (
    <div className="min-h-screen bg-stone-50 pb-20">
      <DarkBanner className="pt-28 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto relative z-10">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-stone-400 hover:text-white transition-colors mb-6 font-medium text-sm"
          >
            <ChevronLeftIcon size={16} /> Back
          </button>

          <h1 className="text-3xl md:text-5xl font-jakarta font-bold text-white tracking-tight">
            Medical History
          </h1>
          <p className="text-stone-400 mt-3 text-lg max-w-xl">
            Complete timeline of past visits, diagnoses, and medical interactions.
          </p>

          <div className="mt-6">
            <input
              type="date"
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
                console.log(e.target.value);
              }}
              className="px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white text-sm placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-white/30"
            />
          </div>
        </div>
      </DarkBanner>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {isLoading ? (
          <div className="py-24 flex flex-col items-center justify-center text-center">
            <div className="w-12 h-12 rounded-full border-4 border-stone-200 border-t-brand-600 animate-spin mb-4" />
            <p className="text-stone-500 font-medium">Loading history...</p>
          </div>
        ) : visits.length === 0 ? (
          <div className="py-24 flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm">
              <ActivityIcon size={32} className="text-stone-400" />
            </div>
            <h3 className="text-xl font-jakarta font-bold text-stone-900 mb-2">No Past Visits</h3>
            <p className="text-stone-500 max-w-sm leading-relaxed">
              This patient does not have any recorded medical history yet.
            </p>
          </div>
        ) : (
          <>
            <div className="border-t border-b border-stone-200">
              <div className="divide-y divide-stone-200">
                {visits.map((visit) => {
                  const primary = primaryDiagnosis(visit.diagnoses);
                  const prescriptionCount = visit.prescription?.items.length ?? 0;

                  return (
                    <div
                      key={visit.id}
                      className="py-8 px-2 flex flex-col sm:flex-row gap-6 hover:bg-stone-100 transition-colors"
                    >
                      <div className="shrink-0 sm:w-52">
                        <div className="flex items-center gap-2 mb-1">
                          <CalendarDaysIcon size={15} className="text-brand-600 shrink-0" />
                          <span className="text-sm font-semibold text-stone-900">
                            {formatDateDisplay(visit.visitedAt)}
                          </span>
                        </div>
                        <p className="text-xs text-stone-400 pl-5">{formatTime(visit.visitedAt)}</p>
                      </div>


                      <div className="grow min-w-0">
                        <h3 className="text-base font-jakarta font-bold text-stone-900 mb-3">
                          {visit.chiefComplaint}
                        </h3>

                        <div className="flex flex-col gap-2">
                          {primary && (
                            <div className="flex items-start gap-2 bg-stone-50 border border-stone-100 rounded-xl p-3 text-sm">
                              <FileTextIcon size={14} className="shrink-0 mt-0.5 text-brand-600" />
                              <p>
                                <span className="font-semibold text-stone-800">Primary Diagnosis: </span>
                                <span className="text-stone-600">{primary.name}</span>
                                <span className="ml-2 text-xs text-stone-400">({primary.severity})</span>
                              </p>
                            </div>
                          )}

                          {prescriptionCount > 0 && (
                            <div className="flex items-center gap-2 text-xs text-stone-500 pl-1">
                              <PillIcon size={13} className="text-stone-400" />
                              <span>{prescriptionCount} medication{prescriptionCount !== 1 ? "s" : ""} prescribed</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="shrink-0 flex items-start sm:items-center">
                        <Link
                          to={`/visits/${visit.id}`}
                          className="inline-flex items-center justify-center px-5 py-2 text-sm font-semibold bg-white border border-stone-200 text-stone-700 rounded-xl hover:bg-stone-50 hover:text-brand-600 transition-colors shadow-sm"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {pagination && pagination.lastPage > 1 && (
              <div className="mt-8">
                <Pagination currentPage={pagination.currentPage} lastPage={pagination.lastPage} onPageChange={setPage} />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
