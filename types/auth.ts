export type UserRole = 'farmer' | 'attendant' | 'operator';

export type SyncStatus = 'local_only' | 'synced';

export interface User {
    id: string;
    fullName: string;
    phoneNumber: string;
    email: string;
    role: UserRole;
    isVerified: boolean;
    syncStatus: SyncStatus;
    createdAt: string;
    updatedAt: string;
}

export interface SignUpPayload {
    fullName: string;
    phoneNumber: string;
    email: string;
    password: string;
    role: UserRole;
}

export interface SignInPayload {
    email: string;
    password: string;
}

export interface AuthSession {
    user: User;
    token: string;
    expiresAt: string;
}

export interface IAuthService {
    signUp: (payload: SignUpPayload) => Promise<{ user: User; devOtp?: string }>;
    verifyOtp: (email: string, code: string) => Promise<AuthSession>;
    resendOtp: (email: string) => Promise<{ devOtp?: string }>;
    signIn: (payload: SignInPayload) => Promise<AuthSession>;
    signOut: () => Promise<void>;
    getCurrentSession: () => Promise<AuthSession | null>;
}