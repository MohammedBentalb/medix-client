import { Outlet, useLocation } from "react-router";
import { Loader2 } from "lucide-react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../sections/home/Footer";
import { darkBannerPrefixes } from "../constants/Constant";
import useAuth from "../hooks/useAuth";

export function MainLayout() {
  const location = useLocation();
  const { loading } = useAuth();
  const isDarkBannerPage = darkBannerPrefixes.some(prefix => location.pathname.startsWith(prefix));

  if (loading && location.pathname !== "/") return (
    <div className="flex items-center justify-center w-screen h-screen">
      <Loader2 className="animate-spin" />
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen selection:bg-brand-200 selection:text-brand-900">
      <Navbar transparentTheme={isDarkBannerPage ? "light" : "dark"} />
      <main className="grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
