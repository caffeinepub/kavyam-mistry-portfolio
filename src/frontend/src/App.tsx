import { useEffect, useRef, useState } from "react";
import AboutMeSection from "./components/AboutMeSection";
import AvailabilitySection from "./components/AvailabilitySection";
import ContactIcons from "./components/ContactIcons";
import ExperienceSection from "./components/ExperienceSection";
import Footer from "./components/Footer";
import HerobrineStormBackground from "./components/HerobrineStormBackground";
import MaintenanceScreen from "./components/MaintenanceScreen";
import ProfileHeader from "./components/ProfileHeader";
import ScrollRevealSection from "./components/ScrollRevealSection";
import SkillsSection from "./components/SkillsSection";
import { useGetMaintenanceMode, useLogVisit } from "./hooks/useQueries";
import Owner from "./pages/Owner";
import OwnerLogin from "./pages/OwnerLogin";
import PricingPage from "./pages/PricingPage";

function Portfolio() {
  const logVisit = useLogVisit();
  const logVisitRef = useRef(logVisit.mutate);
  logVisitRef.current = logVisit.mutate;

  useEffect(() => {
    logVisitRef.current();
  }, []);

  return (
    <div className="relative min-h-screen text-cyan-400">
      <HerobrineStormBackground />

      <div className="relative z-10">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <ScrollRevealSection>
            <ProfileHeader />
          </ScrollRevealSection>

          <ScrollRevealSection delay={50}>
            <ContactIcons />
          </ScrollRevealSection>

          <ScrollRevealSection delay={100}>
            <AboutMeSection />
          </ScrollRevealSection>

          <ScrollRevealSection delay={200}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <ExperienceSection />
              <SkillsSection />
            </div>
          </ScrollRevealSection>

          <ScrollRevealSection delay={300}>
            <AvailabilitySection />
          </ScrollRevealSection>
        </div>

        <ScrollRevealSection delay={400}>
          <Footer />
        </ScrollRevealSection>
      </div>
    </div>
  );
}

function isOwnerLoginRoute(): boolean {
  const hash = window.location.hash;
  const pathname = window.location.pathname;
  return (
    hash === "#/owner/login" ||
    hash.startsWith("#/owner/login") ||
    pathname === "/owner/login" ||
    pathname.endsWith("/owner/login")
  );
}

function isPricingRoute(): boolean {
  const hash = window.location.hash;
  const pathname = window.location.pathname;
  return (
    hash === "#/pricing" ||
    hash.startsWith("#/pricing") ||
    pathname === "/pricing" ||
    pathname.endsWith("/pricing")
  );
}

function AppContent() {
  const [showOwnerLogin, setShowOwnerLogin] = useState(() =>
    isOwnerLoginRoute(),
  );
  const [isOwner, setIsOwner] = useState(
    () => sessionStorage.getItem("owner_session") === "true",
  );
  const [showPricing, setShowPricing] = useState(() => isPricingRoute());

  const { data: maintenanceMode = false } = useGetMaintenanceMode();

  useEffect(() => {
    const handler = () => {
      setShowOwnerLogin(isOwnerLoginRoute());
      setShowPricing(isPricingRoute());
    };
    window.addEventListener("hashchange", handler);
    window.addEventListener("popstate", handler);
    return () => {
      window.removeEventListener("hashchange", handler);
      window.removeEventListener("popstate", handler);
    };
  }, []);

  const handleLoginSuccess = () => {
    sessionStorage.setItem("owner_session", "true");
    setIsOwner(true);
    setShowOwnerLogin(false);
    window.location.hash = "";
  };

  if (isOwner) {
    return (
      <Owner
        onLogout={() => {
          sessionStorage.removeItem("owner_session");
          setIsOwner(false);
          setShowOwnerLogin(false);
          window.location.hash = "";
        }}
      />
    );
  }

  if (showOwnerLogin) {
    return <OwnerLogin onLoginSuccess={handleLoginSuccess} />;
  }

  if (showPricing) {
    return (
      <PricingPage
        onBack={() => {
          setShowPricing(false);
          window.location.hash = "";
        }}
      />
    );
  }

  if (maintenanceMode) {
    return <MaintenanceScreen />;
  }

  return <Portfolio />;
}

export default function App() {
  return <AppContent />;
}
