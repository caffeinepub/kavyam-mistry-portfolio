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
  createBackup,
  downloadBackup,
  getBackupInfo,
  restoreBackup,
} from "@/utils/backup";
import { AlertCircle, Download, Save, Upload } from "lucide-react";
import { useState } from "react";

export default function BackupControl() {
  const [backupInfo, setBackupInfo] = useState(getBackupInfo());
  const [showSuccess, setShowSuccess] = useState(false);

  const handleCreateBackup = () => {
    createBackup();
    setBackupInfo(getBackupInfo());
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
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
    <div className="flex flex-col gap-2">
      {showSuccess && (
        <div className="backup-success-message">
          <AlertCircle className="w-4 h-4" />
          <span>Backup created successfully!</span>
        </div>
      )}

      <div className="backup-control-container">
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
              <Button variant="outline" size="sm" className="backup-button">
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
                  This will restore your portfolio to the backed up version from{" "}
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

        {backupInfo && (
          <div className="backup-info">
            <span className="text-xs text-gray-500">
              Last backup: {backupInfo.timestamp}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
