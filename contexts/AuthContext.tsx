


import {createContext, useCallback, useContext, useEffect, useMemo, useState} from 'react';
import { localAuthService } from '@/services/auth/localAuthService';
import { initDatabase } from '@/services/database';
import {AuthSession, IAuthService, SignInPayload, SignUpPayload, User} from '@/types/auth';

interface AuthContextValue {
    user: User | null;
    session: AuthSession | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    pendingEmail: string | null;
    setPendingEmail: (email: string | null) => void;
    signUp: (payload: SignUpPayload) => Promise<{ user: User; devOtp?: string }>;
    verifyOtp: (code: string, emailOverride?: string) => Promise<AuthSession>;
    resendOtp: (emailOverride?: string) => Promise<{ devOtp?: string }>;
    signIn: (payload: SignInPayload) => Promise<AuthSession>;
    signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

// TODO: When the Backend guys are ready with their API, we will switch this part to use the backendAuthService instead of the localAuthService.
const authService: IAuthService = localAuthService;

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [session, setSession] = useState<AuthSession | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [pendingEmail, setPendingEmail] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;

        const bootstrapAuth = async () => {
            try {
                await initDatabase();
                const existingSession = await authService.getCurrentSession();

                if (isMounted) {
                    setSession(existingSession);
                }
            } catch (error) {
                console.error('Failed to initialize auth database:', error);
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        };

        bootstrapAuth();

        return () => {
            isMounted = false;
        };
    }, []);

    const signUp = useCallback(async (payload: SignUpPayload) => {
        const result = await authService.signUp(payload);
        setPendingEmail(result.user.email);
        return result;
    }, []);

    const verifyOtp = useCallback(
        async (code: string, emailOverride?: string) => {
            const targetEmail = emailOverride ?? pendingEmail;

            if (!targetEmail) {
                throw new Error('No email address found for verification.');
            }

            const activeSession = await authService.verifyOtp(targetEmail, code);
            setSession(activeSession);
            setPendingEmail(null);
            return activeSession;
        },
        [pendingEmail],
    );

    const resendOtp = useCallback(
        async (emailOverride?: string) => {
            const targetEmail = emailOverride ?? pendingEmail;

            if (!targetEmail) {
                throw new Error('No email address found to resend OTP.');
            }

            return authService.resendOtp(targetEmail);
        },
        [pendingEmail],
    );

    const signIn = useCallback(async (payload: SignInPayload) => {
        const activeSession = await authService.signIn(payload);
        setSession(activeSession);
        setPendingEmail(null);
        return activeSession;
    }, []);

    const signOut = useCallback(async () => {
        await authService.signOut();
        setSession(null);
        setPendingEmail(null);
    }, []);

    const value = useMemo<AuthContextValue>(
        () => ({
            user: session?.user ?? null,
            session,
            isLoading,
            isAuthenticated: Boolean(session?.user),
            pendingEmail,
            setPendingEmail,
            signUp,
            verifyOtp,
            resendOtp,
            signIn,
            signOut,
        }),
        [session, isLoading, pendingEmail, signUp, verifyOtp, resendOtp, signIn, signOut],
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextValue => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider.');
    }

    return context;
};