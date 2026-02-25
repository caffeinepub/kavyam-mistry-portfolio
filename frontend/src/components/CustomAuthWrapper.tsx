import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useGetMaintenanceMode } from '@/hooks/useQueries';
import Login from '@/pages/Login';
import Registration from '@/pages/Registration';
import MaintenanceScreen from '@/components/MaintenanceScreen';
import Owner from '@/pages/Owner';
import { LogOut, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

type AuthView = 'login' | 'register';

interface CustomAuthWrapperProps {
  children: React.ReactNode;
}

export default function CustomAuthWrapper({ children }: CustomAuthWrapperProps) {
  const { isAuthenticated, userRole, logout } = useAuth();
  const [authView, setAuthView] = useState<AuthView>('login');
  const { data: maintenanceMode, isLoading: maintenanceLoading } = useGetMaintenanceMode();

  // Not authenticated — show login or register
  if (!isAuthenticated) {
    if (authView === 'register') {
      return (
        <Registration
          onNavigateToLogin={() => setAuthView('login')}
        />
      );
    }
    return (
      <Login
        onNavigateToRegister={() => setAuthView('register')}
      />
    );
  }

  // Authenticated as owner (exact role check) — show owner page
  if (userRole === 'owner') {
    return (
      <div className="min-h-screen bg-black text-cyan-400">
        <Owner onLogout={logout} />
      </div>
    );
  }

  // Any authenticated non-owner user is a visitor — block owner page access entirely
  // (userRole must be 'visitor' to reach here)
  if (userRole !== 'visitor') {
    // Unknown role — force logout for safety
    logout();
    return null;
  }

  // Visitor: check maintenance mode
  if (maintenanceLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-cyan-400 animate-spin mx-auto mb-4" />
          <p className="text-cyan-300 minecraft-text text-xl">Loading...</p>
        </div>
      </div>
    );
  }

  if (maintenanceMode) {
    return (
      <div className="min-h-screen bg-black text-cyan-400">
        {/* Logout button */}
        <div className="fixed top-4 left-4 z-50">
          <Button onClick={logout} variant="outline" size="sm" className="backup-button">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
        <MaintenanceScreen />
      </div>
    );
  }

  // Normal visitor view — show portfolio only
  return (
    <div className="min-h-screen bg-black text-cyan-400">
      {/* Logout button */}
      <div className="fixed top-4 left-4 z-50">
        <Button onClick={logout} variant="outline" size="sm" className="backup-button">
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </div>
      {children}
    </div>
  );
}
