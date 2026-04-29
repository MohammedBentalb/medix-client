import { useParams, useNavigate, Link } from "react-router";
import { CalendarDaysIcon, ChevronLeftIcon, ClockIcon, ActivityIcon } from "lucide-react";
import { DarkBanner } from "../../components/DarkBanner";
import { useQuery } from "@tanstack/react-query";
import api from "../../lib/axios/api";
import type { TVisit } from "../../types";
import { VisitAssessmentSection } from "../../sections/VisitDetails/VisitAssessmentSection";
import { VisitDiagnosesSection } from "../../sections/VisitDetails/VisitDiagnosesSection";
import { VisitPrescriptionSection } from "../../sections/VisitDetails/VisitPrescriptionSection";

function formatDateDisplay(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
}

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
}

export function VisitDetails() {
  const { visitId } = useParams<{ visitId: string }>();
  const navigate = useNavigate();

  const { data: visit, isLoading } = useQuery<TVisit>({
    queryKey: ["visit", visitId],
    queryFn: async () => {
      const res = await api.get(`/visits/${visitId}`);
      return res.data.data;
    },
    enabled: !!visitId,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-stone-50 pt-32 pb-20 flex flex-col items-center">
        <div className="w-12 h-12 rounded-full border-4 border-stone-200 border-t-stone-800 animate-spin mb-4" />
        <p className="text-stone-500 font-medium">Loading visit details...</p>
      </div>
    );
  }

  if (!visit) {
    return (
      <div className="min-h-screen bg-stone-50 pt-32 pb-20 flex flex-col items-center gap-4">
        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm">
          <ActivityIcon size={32} className="text-stone-400" />
        </div>
        <h2 className="text-2xl font-bold text-stone-900">Visit Not Found</h2>
        <button onClick={() => navigate(-1)} className="text-stone-700 font-semibold hover:underline">
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 pb-20">
      <DarkBanner className="pt-28 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto relative z-10">
          <Link
            to={`/patients/history/${visit.patientId}`}
            className="inline-flex items-center gap-2 text-stone-400 hover:text-white transition-colors mb-6 font-medium text-sm"
          >
            <ChevronLeftIcon size={16} /> Back to History
          </Link>

          <h1 className="text-3xl md:text-5xl font-jakarta font-bold text-white tracking-tight mb-3">
            Visit Details
          </h1>
          <div className="flex flex-wrap items-center gap-3">
            <span className="flex items-center gap-1.5 bg-stone-800 px-3 py-1.5 rounded-lg border border-stone-700 text-stone-300 text-sm">
              <CalendarDaysIcon size={14} /> {formatDateDisplay(visit.visitedAt)}
            </span>
            <span className="flex items-center gap-1.5 bg-stone-800 px-3 py-1.5 rounded-lg border border-stone-700 text-stone-300 text-sm">
              <ClockIcon size={14} /> {formatTime(visit.visitedAt)}
            </span>
          </div>
        </div>
      </DarkBanner>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        <VisitAssessmentSection chiefComplaint={visit.chiefComplaint} clinicalNotes={visit.clinicalNotes} />
        <VisitDiagnosesSection diagnoses={visit.diagnoses} />
        <VisitPrescriptionSection prescription={visit.prescription} />
      </div>
    </div>
  );
}
