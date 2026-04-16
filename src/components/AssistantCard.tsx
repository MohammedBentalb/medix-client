import { ArrowRightIcon, UserPlusIcon, UserMinusIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { TAssistantProfile, TUser } from "../types";
import api from "../lib/axios/api";
import useAuth from "../hooks/useAuth";

export function AssistantCard({ assistant, isDoctor }: {assistant: TUser, isDoctor: boolean}) {
  const profile = assistant.profile as TAssistantProfile | null;
  const isAssigned = profile?.doctorId !== null && profile?.doctorId !== undefined;
  const { user } = useAuth();
  const isMyAssistant = profile?.doctorId === user?.id;

  const queryClient = useQueryClient();

  const { mutate: assignAssistant, isPending: isAssigning } = useMutation<void>({
    mutationFn: async () => {
      const res = await api.post('/doctor/assistants', { assistantId: assistant.id });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['assistants'] });
    },
  });

  const { mutate: unassignAssistant, isPending: isUnassigning } = useMutation<void>({
    mutationFn: async () => {
      const res = await api.delete(`/doctor/assistants/${assistant.id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['assistants'] });
    },
  });

  const isPending = isAssigning || isUnassigning;

  return (
    <div className="bg-white rounded-2xl border border-stone-200 p-6 hover:border-stone-300 transition-colors flex flex-col">
      <div className="flex items-start gap-4 mb-5">
        <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center shrink-0">
          {assistant.image ? (
            <img
              src={assistant.image}
              alt={assistant.firstName}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <span className="text-xl font-jakarta font-bold text-stone-600">
              {assistant.firstName[0]}
              {assistant.lastName[0]}
            </span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[10px] uppercase tracking-widest font-bold text-stone-500 mb-1">
            Medical Assistant
          </p>
          <h3 className="text-lg font-jakarta font-bold text-stone-900 truncate mb-1">
            {assistant.firstName} {assistant.lastName}
          </h3>
          <p className="text-sm text-stone-500 truncate">
            {assistant.phone ?? "No phone"}
            <span className="mx-1.5 text-stone-300">•</span>
            <span
              className={`font-medium ${
                assistant.status === "ACTIVE"
                  ? "text-emerald-600"
                  : assistant.status === "PENDING"
                    ? "text-amber-600"
                    : "text-red-500"
              }`}
            >
              {assistant.status}
            </span>
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-5">
        <span className={`w-2 h-2 rounded-full ${isAssigned ? "bg-stone-400" : "bg-emerald-500"}`} />
        <span className="text-sm font-medium text-stone-700">
          {isAssigned ? "Already assigned" : "Available"}
        </span>
      </div>

      <div className="h-px w-full bg-stone-100 mb-5" />

      <div className="flex items-center justify-between pt-2">
        <Link
          to={`/assistants/${assistant.id}`}
          className="text-sm font-medium text-stone-500 hover:text-stone-900 transition-colors flex items-center gap-1 group"
        >
          View Profile
          <ArrowRightIcon size={14} className="group-hover:translate-x-0.5 transition-transform" />
        </Link>

        {isDoctor && assistant.status !== "SUSPENDED" && (
          isMyAssistant ? (
            <button
              onClick={() => unassignAssistant()}
              disabled={isPending}
              className={`px-4 py-2 rounded-lg bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition-colors active:scale-[0.98] flex items-center gap-1.5 ${isPending ? "opacity-70 cursor-not-allowed" : ""}`}
            >
              <UserMinusIcon size={14} />
              {isPending ? "Removing..." : "Unassign"}
            </button>
          ) : !isAssigned && (
            <button
              onClick={() => assignAssistant()}
              disabled={isPending}
              className={`px-4 py-2 rounded-lg bg-brand-600 text-white text-sm font-medium hover:bg-brand-700 transition-colors active:scale-[0.98] flex items-center gap-1.5 ${isPending ? "opacity-70 cursor-not-allowed" : ""}`}
            >
              <UserPlusIcon size={14} />
              {isPending ? "Adding..." : "Add to Staff"}
            </button>
          )
        )}
      </div>
    </div>
  );
}
