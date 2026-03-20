import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  useGetMaintenanceMode,
  useToggleMaintenanceMode,
} from "@/hooks/useQueries";
import {
  createBackup,
  downloadBackup,
  getBackupInfo,
  restoreBackup,
} from "@/utils/backup";
import {
  AlertCircle,
  Download,
  Loader2,
  LogOut,
  RefreshCw,
  Save,
  Upload,
} from "lucide-react";
import { useState } from "react";

interface OwnerProps {
  onLogout: () => void;
}

export default function Owner({ onLogout }: OwnerProps) {
  const { data: maintenanceMode = false, isLoading: maintenanceLoading } =
    useGetMaintenanceMode();
  const toggleMaintenance = useToggleMaintenanceMode();

  const [backupInfo, setBackupInfo] = useState(getBackupInfo());
  const [backupSuccess, setBackupSuccess] = useState(false);

  const handleToggleMaintenance = async () => {
    await toggleMaintenance.mutateAsync();
  };

  const handleCreateBackup = () => {
    createBackup();
    setBackupInfo(getBackupInfo());
    setBackupSuccess(true);
    setTimeout(() => setBackupSuccess(false), 3000);
  };

  const handleRestoreBackup = () => {
    const success = restoreBackup();
    if (success) {
      window.location.reload();
    }
  };

  const handleDownloadBackup = () => {
    downloadBackup();
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="border-b-4 border-cyan-700 bg-black/90 px-6 py-4 flex items-center justify-between sticky top-0 z-40">
        <div>
          <h1 className="text-2xl font-bold minecraft-text">
            <span className="text-minecraft-gold">⚡</span>{" "}
            <span className="text-cyan-300">Owner Dashboard</span>
          </h1>
          <p className="text-gray-500 text-xs minecraft-text mt-0.5">
            AKGamer4354 — Admin Panel
          </p>
        </div>
        <Button
          onClick={onLogout}
          variant="outline"
          size="sm"
          className="backup-button"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-7xl space-y-8">
        {/* ── Maintenance Mode ── */}
        <section>
          <div className="minecraft-box-medium p-6">
            <h2 className="text-xl font-bold text-cyan-300 minecraft-text mb-4 flex items-center gap-2">
              <span className="text-minecraft-gold">⚙</span> Maintenance Mode
            </h2>
            <div className="flex items-center gap-6">
              <div
                className={`px-4 py-2 border-2 font-bold minecraft-text text-lg ${
                  maintenanceMode
                    ? "border-red-500 text-red-400 bg-red-950/30"
                    : "border-green-500 text-green-400 bg-green-950/30"
                }`}
              >
                {maintenanceLoading
                  ? "..."
                  : maintenanceMode
                    ? "🔴 ON"
                    : "🟢 OFF"}
              </div>
              <Button
                onClick={handleToggleMaintenance}
                disabled={toggleMaintenance.isPending || maintenanceLoading}
                className="backup-button"
              >
                {toggleMaintenance.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Toggling...
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2" />
                    {maintenanceMode ? "Turn OFF" : "Turn ON"}
                  </>
                )}
              </Button>
              <p className="text-gray-400 text-sm">
                {maintenanceMode
                  ? "Visitors currently see the maintenance screen."
                  : "Website is live and accessible to visitors."}
              </p>
            </div>
          </div>
        </section>

        {/* ── Backup Controls ── */}
        <section>
          <div className="minecraft-box-medium p-6">
            <h2 className="text-xl font-bold text-cyan-300 minecraft-text mb-4 flex items-center gap-2">
              <span className="text-minecraft-gold">💾</span> Backup Controls
            </h2>

            {backupSuccess && (
              <div className="backup-success-message mb-4">
                <AlertCircle className="w-4 h-4" />
                <span>Backup created successfully!</span>
              </div>
            )}

            <div className="flex flex-wrap gap-3">
              <Button
                onClick={handleCreateBackup}
                variant="outline"
                size="sm"
                className="backup-button"
              >
                <Download className="w-4 h-4 mr-2" />
                Create Backup
              </Button>

              {backupInfo && (
                <Button
                  onClick={handleDownloadBackup}
                  variant="outline"
                  size="sm"
                  className="backup-button"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Download Backup
                </Button>
              )}

              {backupInfo && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="backup-button"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Restore Backup
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="backup-dialog">
                    <AlertDialogHeader>
                      <AlertDialogTitle className="text-cyan-300 minecraft-text">
                        Restore Portfolio Backup?
                      </AlertDialogTitle>
                      <AlertDialogDescription className="text-gray-400">
                        This will restore your portfolio to the backed up
                        version from{" "}
                        <span className="text-minecraft-gold font-semibold">
                          {backupInfo.timestamp}
                        </span>
                        . The page will reload after restoration.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className="backup-dialog-button">
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleRestoreBackup}
                        className="backup-dialog-button-primary"
                      >
                        Restore
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
            </div>

            {backupInfo && (
              <p className="text-xs text-gray-500 mt-3">
                Last backup: {backupInfo.timestamp}
              </p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
