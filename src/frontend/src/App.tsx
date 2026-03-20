import AboutMeSection from "./components/AboutMeSection";
import AvailabilitySection from "./components/AvailabilitySection";
import ContactIcons from "./components/ContactIcons";
import CustomAuthWrapper from "./components/CustomAuthWrapper";
import ExperienceSection from "./components/ExperienceSection";
import Footer from "./components/Footer";
import ProfileHeader from "./components/ProfileHeader";
import ScrollRevealSection from "./components/ScrollRevealSection";
import SkillsSection from "./components/SkillsSection";
import { AuthProvider } from "./context/AuthContext";

function Portfolio() {
  return (
    <>
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Profile Header */}
        <ProfileHeader />

        {/* Contact Icons */}
        <ScrollRevealSection>
          <ContactIcons />
        </ScrollRevealSection>

        {/* About Me Section */}
        <ScrollRevealSection delay={100}>
          <AboutMeSection />
        </ScrollRevealSection>

        {/* Experience and Skills Grid */}
        <ScrollRevealSection delay={200}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <ExperienceSection />
            <SkillsSection />
          </div>
        </ScrollRevealSection>

        {/* Availability Section */}
        <ScrollRevealSection delay={300}>
          <AvailabilitySection />
        </ScrollRevealSection>
      </div>

      {/* Footer */}
      <ScrollRevealSection delay={400}>
        <Footer />
      </ScrollRevealSection>
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <CustomAuthWrapper>
        <Portfolio />
      </CustomAuthWrapper>
    </AuthProvider>
  );
}

export default App;
