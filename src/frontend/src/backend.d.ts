export interface backendInterface {
  logVisit(): Promise<void>;
  getVisits(): Promise<bigint[]>;
  getMaintenanceMode(): Promise<boolean>;
  toggleMaintenanceMode(): Promise<void>;
}
