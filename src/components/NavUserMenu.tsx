import { useEffect, useRef, useState } from "react";
import { LogOutIcon } from "lucide-react";
import useAuth from "../hooks/useAuth";
import api from "../lib/axios/api";

export function NavUserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { user, setUser, setToken } = useAuth();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await api.post("/auth/logout", {});
      setUser(null);
      setToken('');
  };

  if (!user) return null;

  const initials = `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-9 h-9 rounded-full bg-brand-600 text-white text-sm font-bold flex items-center justify-center shadow-sm hover:bg-brand-700 transition-colors"
      >
        {initials}
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-44 bg-white rounded-xl shadow-lg border border-stone-100 py-1 overflow-hidden">
          <div className="px-4 py-2.5 border-b border-stone-100">
            <p className="text-sm font-semibold text-stone-900 truncate">{user.firstName} {user.lastName}</p>
            <p className="text-xs text-stone-400 truncate">{user.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOutIcon size={15} /> Sign out
          </button>
        </div>
      )}
    </div>
  );
}
