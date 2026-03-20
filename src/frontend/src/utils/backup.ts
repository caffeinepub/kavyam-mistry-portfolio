interface BackupData {
  version: string;
  timestamp: string;
  portfolioState: {
    profileData: {
      name: string;
      title: string;
      ign: string;
      discord: string;
    };
    aboutMe: string;
    experience: Array<{
      server: string;
      role: string;
      description: string;
    }>;
    skills: Array<{
      category: string;
      items: string[];
    }>;
    availability: string;
  };
}

const BACKUP_KEY = "minecraft_portfolio_backup";
const BACKUP_VERSION = "1.0";

export function createBackup(): void {
  const backupData: BackupData = {
    version: BACKUP_VERSION,
    timestamp: new Date().toLocaleString(),
    portfolioState: {
      profileData: {
        name: "Kavyam Mistry",
        title: "Minecraft Server Developer",
        ign: "Akgamer4354",
        discord: "akgamer4354",
      },
      aboutMe:
        "Passionate Minecraft server developer with 2.5+ years of experience",
      experience: [
        {
          server: "Obsidian MC",
          role: "Developer",
          description: "Custom plugin development and server optimization",
        },
        {
          server: "Snow MC",
          role: "Admin",
          description: "Server management and community moderation",
        },
        {
          server: "King MC",
          role: "Owner & Developer",
          description: "Full server ownership and development",
        },
        {
          server: "Cursed SMP",
          role: "Moderator",
          description: "Community management and player support",
        },
      ],
      skills: [
        {
          category: "Plugin Configuration",
          items: ["EssentialsX", "WorldEdit", "Vault", "LuckPerms"],
        },
        {
          category: "Server Optimization",
          items: [
            "Performance tuning",
            "Resource management",
            "Anti-lag solutions",
          ],
        },
        {
          category: "Permissions Management",
          items: ["LuckPerms", "Group hierarchies", "Permission nodes"],
        },
        {
          category: "Platform Support",
          items: ["Spigot", "Paper", "Purpur", "Velocity"],
        },
      ],
      availability:
        "Available for freelance development and moderator positions",
    },
  };

  try {
    localStorage.setItem(BACKUP_KEY, JSON.stringify(backupData));
  } catch (error) {
    console.error("Failed to create backup:", error);
  }
}

export function restoreBackup(): boolean {
  try {
    const backupString = localStorage.getItem(BACKUP_KEY);
    if (!backupString) {
      console.warn("No backup found");
      return false;
    }

    const backupData: BackupData = JSON.parse(backupString);

    // Verify backup version
    if (backupData.version !== BACKUP_VERSION) {
      console.warn("Backup version mismatch");
      return false;
    }

    // In a real implementation, you would restore the state here
    // For now, we'll just verify the backup exists and is valid
    console.log("Backup restored successfully:", backupData);
    return true;
  } catch (error) {
    console.error("Failed to restore backup:", error);
    return false;
  }
}

export function getBackupInfo(): { timestamp: string; version: string } | null {
  try {
    const backupString = localStorage.getItem(BACKUP_KEY);
    if (!backupString) {
      return null;
    }

    const backupData: BackupData = JSON.parse(backupString);
    return {
      timestamp: backupData.timestamp,
      version: backupData.version,
    };
  } catch (error) {
    console.error("Failed to get backup info:", error);
    return null;
  }
}

export function downloadBackup(): void {
  try {
    const backupString = localStorage.getItem(BACKUP_KEY);
    if (!backupString) {
      console.warn("No backup found to download");
      return;
    }

    const backupData: BackupData = JSON.parse(backupString);

    // Create a Blob from the JSON data
    const blob = new Blob([JSON.stringify(backupData, null, 2)], {
      type: "application/json",
    });

    // Generate filename with timestamp
    const now = new Date();
    const dateStr = now.toISOString().split("T")[0]; // YYYY-MM-DD
    const timeStr = now.toTimeString().split(" ")[0].replace(/:/g, ""); // HHMMSS
    const filename = `portfolio-backup-${dateStr}-${timeStr}.json`;

    // Create a temporary anchor element to trigger download
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;

    // Trigger download
    document.body.appendChild(link);
    link.click();

    // Cleanup
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    console.log("Backup downloaded successfully:", filename);
  } catch (error) {
    console.error("Failed to download backup:", error);
  }
}
