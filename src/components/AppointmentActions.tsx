import { Link } from "react-router";
import type { AppointmentStatus, userType } from "../types";

type Props = {
  appointmentId: string;
  status: AppointmentStatus;
  userType: userType;
  isProcessing: boolean;
  onCancel: (id: string) => void;
  onConfirm: (id: string) => void;
};

export function AppointmentActions({ appointmentId, status, userType, isProcessing, onCancel, onConfirm }: Props) {
  if (status === "PENDING") {
    return (
      <div className="flex flex-col gap-2">
        <button
          onClick={() => onCancel(appointmentId)}
          disabled={isProcessing}
          className="text-sm font-semibold text-rose-600 hover:text-rose-700 transition-colors disabled:cursor-not-allowed"
        >
          Cancel Appt
        </button>
        {userType !== "ROLE_PATIENT" && (
          <button
            onClick={() => onConfirm(appointmentId)}
            disabled={isProcessing}
            className="text-sm font-semibold text-emerald-600 hover:text-emerald-700 transition-colors disabled:cursor-not-allowed"
          >
            Confirm
          </button>
        )}
      </div>
    );
  }

  if (status === "CONFIRMED" && userType === "ROLE_DOCTOR") {
    return (
      <Link
        to={`/appointments/${appointmentId}`}
        className="text-sm font-semibold text-brand-600 hover:text-brand-700 transition-colors"
      >
        Process
      </Link>
    );
  }

  return null;
}