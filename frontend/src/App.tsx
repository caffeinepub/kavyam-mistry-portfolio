import { AuthProvider } from './context/AuthContext';
import CustomAuthWrapper from './components/CustomAuthWrapper';
import AboutMeSection from './components/AboutMeSection';
import ExperienceSection from './components/ExperienceSection';
import SkillsSection from './components/SkillsSection';
import AvailabilitySection from './components/AvailabilitySection';
import ContactIcons from './components/ContactIcons';
import Footer from './components/Footer';
import ProfileHeader from './components/ProfileHeader';

function Portfolio() {
  return (
    <>
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Profile Header */}
        <ProfileHeader />

        {/* Contact Icons */}
        <ContactIcons />

        {/* About Me Section */}
        <AboutMeSection />

        {/* Experience and Skills Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <ExperienceSection />
          <SkillsSection />
        </div>

        {/* Availability Section */}
        <AvailabilitySection />
      </div>

      {/* Footer */}
      <Footer />
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
