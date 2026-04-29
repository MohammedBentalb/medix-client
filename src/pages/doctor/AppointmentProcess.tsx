import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { ChevronRightIcon } from "lucide-react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { z } from "zod";
import useAuth from "../../hooks/useAuth";
import api from "../../lib/axios/api";
import type { TVisitFormDiagnosis, TVisitFormPrescriptionItem, TAppointment } from "../../types";
import { VisitAssessmentSection } from "../../sections/AppointmentProcess/VisitAssessmentSection";
import { DiagnosesSection } from "../../sections/AppointmentProcess/DiagnosesSection";
import { PrescriptionSection } from "../../sections/AppointmentProcess/PrescriptionSection";

const visitSchema = z.object({
  chief_complaint: z.string().min(1, "Chief complaint is required"),
  clinical_notes:  z.string().min(1, "Clinical notes are required"),
  diagnoses: z.array(
    z.object({
      name:     z.string().min(1, "Condition name is required"),
      type:     z.enum(["PRIMARY", "SECONDARY", "DIFFERENTIAL"]),
      severity: z.enum(["MILD", "MODERATE", "SEVERE"]),
      notes:    z.string().optional(),
    })
  ).min(1, "At least one diagnosis is required"),
  prescription: z.object({
    notes: z.string().nullable().optional(),
    items: z.array(
      z.object({
        medicine_name: z.string().min(1, "Medicine is required"),
        dosage:        z.string().min(1, "Dosage is required"),
        frequency:     z.string().min(1, "Frequency is required"),
        duration:      z.number().min(1, "Duration must be at least 1 day"),
        route:         z.enum(["ORAL", "TROPICAL", "INHALATION", "SUBLINGUAL"]),
        instructions:  z.string().optional(),
      })
    ),
  }).nullable(),
});

function newDiagnosis(): TVisitFormDiagnosis {
  return { id: Math.random().toString(36).slice(2), name: "", type: "PRIMARY", severity: "MILD", notes: "" };
}

function newPrescriptionItem(): TVisitFormPrescriptionItem {
  return { id: Math.random().toString(36).slice(2), medicine: "", dosage: "", frequency: "", duration: "", route: "ORAL", instructions: "" };
}

export function AppointmentProcess() {
  const { id: appointmentId } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();

  const { data: appointment } = useQuery<TAppointment>({
    queryKey: ["appointment", appointmentId],
    queryFn: async () => {
      const res = await api.get(`/appointments/${appointmentId}`);
      return res.data.data;
    },
    enabled: !!appointmentId,
  });

  const [chiefComplaint, setChiefComplaint] = useState("");
  const [clinicalNotes, setClinicalNotes] = useState("");
  const [diagnoses, setDiagnoses] = useState<TVisitFormDiagnosis[]>([newDiagnosis()]);
  const [prescriptionNotes, setPrescriptionNotes] = useState("");
  const [prescriptionItems, setPrescriptionItems] = useState<TVisitFormPrescriptionItem[]>([]);
  const [errors, setErrors] = useState<Record<string, string[] | undefined>>({});

  const updateDiagnosis = (id: string, field: keyof TVisitFormDiagnosis, value: string) => {
    setDiagnoses(diagnoses.map((diagnosis) => (diagnosis.id === id ? { ...diagnosis, [field]: value } : diagnosis)));
  };

  const updatePrescriptionItem = (id: string, field: keyof TVisitFormPrescriptionItem, value: string) => {
    setPrescriptionItems(prescriptionItems.map((item) => (item.id === id ? { ...item, [field]: value } : item)));
  };

  const { mutate: submitVisit, isPending } = useMutation({
    mutationFn: async (payload: ReturnType<typeof buildPayload>) => {
      await api.post("/visits", payload);
      await api.patch(`/appointments/${appointmentId}/complete`);
    },
    onSuccess: () => navigate("/appointments"),
  });

  const buildPayload = () => ({
    appointment_id: appointmentId,
    patient_id: appointment?.patientId ?? null,
    doctor_id: user?.id,
    chief_complaint: chiefComplaint,
    clinical_notes: clinicalNotes,
    diagnoses: diagnoses.map(({ name, type, severity, notes }) => ({ name, type, severity, notes })),
    prescription: prescriptionItems.length === 0 && !prescriptionNotes ? null : {
      notes: prescriptionNotes || null,
      items: prescriptionItems.map(({ medicine, dosage, frequency, duration, route, instructions }) => ({
        medicine_name: medicine,
        dosage,
        frequency,
        duration: Number(duration),
        route,
        instructions,
      })),
    },
  });

  const handleComplete = () => {
    if (!appointment) return;
    const result = visitSchema.safeParse(buildPayload());
    if (!result.success) {
      const errorMap: Record<string, string[]> = {};
      console.log(result.error.issues);
      // db khass njme3 l path       
      for (const issue of result.error.issues) {
        const key = issue.path.join('.');
        if (!errorMap[key]) errorMap[key] = [];
        errorMap[key].push(issue.message);
      }
      setErrors(errorMap);
      return;
    }
    setErrors({});
    submitVisit(buildPayload());
  };

  return (
    <div className="min-h-screen bg-stone-50 pb-24 pt-20">
      <div className="max-w-4xl mx-auto px-6 pt-10">
        <div className="space-y-12">
          <VisitAssessmentSection chiefComplaint={chiefComplaint} clinicalNotes={clinicalNotes} onChiefComplaintChange={setChiefComplaint} onClinicalNotesChange={setClinicalNotes} errors={errors}/>
          <hr className="border-stone-200" />
          <DiagnosesSection diagnoses={diagnoses} onAdd={() => setDiagnoses([...diagnoses, newDiagnosis()])} onRemove={(id) => setDiagnoses(diagnoses.filter((other) => other.id !== id))} onUpdate={updateDiagnosis} errors={errors}/>
          <hr className="border-stone-200" />
          <PrescriptionSection prescriptionNotes={prescriptionNotes} prescriptionItems={prescriptionItems} onNotesChange={setPrescriptionNotes} onAdd={() => setPrescriptionItems([...prescriptionItems, newPrescriptionItem()])} onRemove={(id) => setPrescriptionItems(prescriptionItems.filter((other) => other.id !== id))} onUpdate={updatePrescriptionItem} errors={errors}/>
        </div>

        <div className="mt-16 pt-10 border-t border-stone-200 flex items-center justify-end">
          <button
            onClick={handleComplete}
            disabled={!appointment || isPending}
            className="flex items-center justify-center gap-3 px-12 bg-stone-900 hover:bg-black text-white font-bold py-4 rounded-2xl transition-all shadow-xl shadow-stone-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Complete Visit & Sync
            <ChevronRightIcon size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
