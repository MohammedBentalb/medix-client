import { Outlet, useLocation } from "react-router";
import { Navbar } from "../components/Navbar";
import { Footer } from "../sections/home/Footer";
import { darkBannerPrefixes } from "../constants/Constant";

export function MainLayout() {
  const location = useLocation();
  const isDarkBannerPage = darkBannerPrefixes.some(prefix => location.pathname.startsWith(prefix));

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
