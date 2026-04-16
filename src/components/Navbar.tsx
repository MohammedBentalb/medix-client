import { useEffect, useState } from "react";
import { ActivityIcon, MenuIcon, XIcon, LogOutIcon } from "lucide-react";
import { Link } from "react-router";
import { navLinks, authNavLinks } from "../constants/Constant";
import useAuth from "../hooks/useAuth";
import api from "../lib/axios/api";
import { NavUserMenu } from "./NavUserMenu";

export function Navbar({ transparentTheme = 'dark' }: { transparentTheme?: 'dark' | 'light' }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, setUser, setToken } = useAuth();

  useEffect(() => {
    const handleScroll = () => { setIsScrolled(window.scrollY > 20); };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
    } finally {
      setUser(null);
      setToken('');
    }
  };

  const isTransparent = !isScrolled;
  const textColor = isTransparent ? (transparentTheme === 'light' ? "text-white" : "text-stone-900") : "text-stone-900";
  const linkColor = isTransparent ? (transparentTheme === 'light' ? "text-stone-200 hover:text-white" : "text-stone-600 hover:text-brand-600") : "text-stone-600 hover:text-brand-600";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white/80 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-5"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link to={'/'} className="flex items-center gap-2">
            <div className="bg-brand-600 p-1.5 rounded-lg text-white">
              <ActivityIcon size={24} strokeWidth={2.5} />
            </div>
            <span className={`font-jakarta font-bold text-xl tracking-tight transition-colors duration-300 ${textColor}`}>
              MedFlow
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {(user ? authNavLinks[user.type] : navLinks).map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`text-sm font-medium transition-colors duration-300 ${linkColor}`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {user ? (
            <div className="hidden md:flex">
              <NavUserMenu />
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-4">
              <Link to={'/auth/sign-in/roles'} className={`text-sm font-medium transition-colors duration-300 px-4 py-2 ${isTransparent ? (transparentTheme === 'light' ? "text-white hover:text-brand-300" : "text-stone-700 hover:text-brand-600") : "text-stone-700 hover:text-brand-600"}`}>
                Sign In
              </Link>
              <Link to={'/auth/sign-up/roles'} className="text-sm font-medium bg-brand-600 text-white px-5 py-2.5 rounded-full hover:bg-brand-700 transition-all shadow-sm hover:shadow-md active:scale-95">
                Get Started
              </Link>
            </div>
          )}

          <button
            className={`md:hidden p-2 transition-colors duration-300 ${isTransparent ? "text-white" : "text-stone-600"}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <nav>
          <div className="px-4 pt-2 pb-6 space-y-4 flex flex-col bg-white border-b border-stone-100">
            {(user ? authNavLinks[user.type] : navLinks).map((link) => (
              <Link
                to={link.href}
                key={link.name}
                className="block px-3 py-2 text-base font-medium text-stone-700 hover:text-brand-600 hover:bg-stone-50 rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            {user ? (
              <div className="pt-4 border-t border-stone-100 px-3">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 text-base font-medium text-red-600 hover:bg-red-50 py-2.5 px-3 rounded-lg transition-colors"
                >
                  <LogOutIcon size={16} /> Sign out
                </button>
              </div>
            ) : (
              <div className="pt-4 flex flex-col gap-3 px-3">
                <Link to={'/auth/sign-in/roles'} className="w-full text-center text-base font-medium text-stone-700 border border-stone-200 py-2.5 rounded-lg hover:bg-stone-50">
                  Sign In
                </Link>
                <Link to={'/auth/sign-up/roles'} className="w-full text-center text-base font-medium bg-brand-600 text-white py-2.5 rounded-lg hover:bg-brand-700">
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}
