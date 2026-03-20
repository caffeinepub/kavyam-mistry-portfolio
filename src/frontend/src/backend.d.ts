import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type RegisterResult = {
    __kind__: "error";
    error: string;
} | {
    __kind__: "success";
    success: string;
};
export interface UserProfile {
    username: string;
}
export enum AuthRole {
    owner = "owner",
    visitor = "visitor"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    authenticate(username: string, password: string): Promise<AuthRole>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getMaintenanceMode(): Promise<boolean>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    isUsernameTaken(username: string): Promise<boolean>;
    passwordNeedsHash(): Promise<boolean>;
    registerUser(username: string, password: string): Promise<RegisterResult>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    toggleMaintenanceMode(): Promise<void>;
}
