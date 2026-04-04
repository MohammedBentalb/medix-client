import { Outlet, useLocation } from "react-router";
import { Navbar } from "../components/Navbar";
import { Footer } from "../sections/home/Footer";

export function MainLayout() {
  const location = useLocation();
  const isDarkBannerPage = location.pathname.startsWith("/doctors");

  return (
    <div className="flex flex-col min-h-screen selection:bg-brand-200 selection:text-brand-900">
      <Navbar transparentTheme={isDarkBannerPage ? "light" : "dark"} />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
