


import * as Crypto from 'expo-crypto';
import { getDatabase } from '@/services/database';
import {AuthSession, IAuthService, SignInPayload, SignUpPayload, SyncStatus, User, UserRole} from '@/types/auth';

interface UserRow {
    id: string;
    full_name: string;
    phone_number: string;
    email: string;
    password_hash: string;
    role: UserRole;
    is_verified: number;
    otp_code: string | null;
    sync_status: SyncStatus;
    created_at: string;
    updated_at: string;
}

interface SessionJoinedRow extends UserRow {
    token: string;
    expires_at: string;
}

const SESSION_DURATION_MS = 30 * 24 * 60 * 60 * 1000; // 30 days

const hashPassword = async (password: string): Promise<string> => {
    return Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        password.trim(),
    );
};

const generateOtpCode = (): string => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

const mapRowToUser = (row: UserRow): User => ({
    id: row.id,
    fullName: row.full_name,
    phoneNumber: row.phone_number,
    email: row.email,
    role: row.role,
    isVerified: row.is_verified === 1,
    syncStatus: row.sync_status,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
});

const createSessionForUser = async (user: User): Promise<AuthSession> => {
    const db = await getDatabase();
    const token = `local_${Crypto.randomUUID()}`;
    const expiresAt = new Date(Date.now() + SESSION_DURATION_MS).toISOString();

    await db.runAsync(
        `INSERT OR REPLACE INTO session (id, user_id, token, expires_at)
     VALUES (1, ?, ?, ?)`,
        [user.id, token, expiresAt],
    );

    return {
        user,
        token,
        expiresAt,
    };
};

export const localAuthService: IAuthService = {
    signUp: async (payload: SignUpPayload) => {
        const db = await getDatabase();
        const normalizedEmail = payload.email.trim().toLowerCase();
        const now = new Date().toISOString();
        const passwordHash = await hashPassword(payload.password);
        const otpCode = generateOtpCode();

        const existing = await db.getFirstAsync<UserRow>(
            'SELECT * FROM users WHERE email = ?',
            [normalizedEmail],
        );

        if (existing && existing.is_verified === 1) {
            throw new Error('An account with this email already exists.');
        }

        if (existing && existing.is_verified === 0) {
            await db.runAsync(
                `UPDATE users
         SET full_name = ?, phone_number = ?, password_hash = ?, role = ?, otp_code = ?, updated_at = ?
         WHERE id = ?`,
                [
                    payload.fullName.trim(),
                    payload.phoneNumber.trim(),
                    passwordHash,
                    payload.role,
                    otpCode,
                    now,
                    existing.id,
                ],
            );

            const updated = await db.getFirstAsync<UserRow>(
                'SELECT * FROM users WHERE id = ?',
                [existing.id],
            );

            if (!updated) {
                throw new Error('Failed to update unverified user record.');
            }

            console.log(`[IceVault Dev OTP for ${normalizedEmail}]: ${otpCode}`);
            return { user: mapRowToUser(updated), devOtp: otpCode };
        }

        const id = Crypto.randomUUID();

        await db.runAsync(
            `INSERT INTO users (
        id, full_name, phone_number, email, password_hash, role, is_verified, otp_code, sync_status, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, 0, ?, 'local_only', ?, ?)`,
            [
                id,
                payload.fullName.trim(),
                payload.phoneNumber.trim(),
                normalizedEmail,
                passwordHash,
                payload.role,
                otpCode,
                now,
                now,
            ],
        );

        const created = await db.getFirstAsync<UserRow>(
            'SELECT * FROM users WHERE id = ?',
            [id],
        );

        if (!created) {
            throw new Error('Failed to create user account.');
        }

        console.log(`[IceVault Dev OTP for ${normalizedEmail}]: ${otpCode}`);
        return { user: mapRowToUser(created), devOtp: otpCode };
    },

    verifyOtp: async (email: string, code: string) => {
        const db = await getDatabase();
        const normalizedEmail = email.trim().toLowerCase();
        const row = await db.getFirstAsync<UserRow>(
            'SELECT * FROM users WHERE email = ?',
            [normalizedEmail],
        );

        if (!row) {
            throw new Error('Account not found.');
        }

        if (row.otp_code !== code.trim()) {
            throw new Error('Invalid verification code. Please try again.');
        }

        const now = new Date().toISOString();

        await db.runAsync(
            `UPDATE users
       SET is_verified = 1, otp_code = NULL, updated_at = ?
       WHERE id = ?`,
            [now, row.id],
        );

        const verifiedUser: User = {
            ...mapRowToUser(row),
            isVerified: true,
            updatedAt: now,
        };

        return createSessionForUser(verifiedUser);
    },

    resendOtp: async (email: string) => {
        const db = await getDatabase();
        const normalizedEmail = email.trim().toLowerCase();
        const row = await db.getFirstAsync<UserRow>(
            'SELECT * FROM users WHERE email = ?',
            [normalizedEmail],
        );

        if (!row) {
            throw new Error('Account not found.');
        }

        const otpCode = generateOtpCode();
        const now = new Date().toISOString();

        await db.runAsync(
            'UPDATE users SET otp_code = ?, updated_at = ? WHERE id = ?',
            [otpCode, now, row.id],
        );

        console.log(`[IceVault Dev OTP Resent for ${normalizedEmail}]: ${otpCode}`);
        return { devOtp: otpCode };
    },

    signIn: async ({ email, password }: SignInPayload) => {
        const db = await getDatabase();
        const normalizedEmail = email.trim().toLowerCase();
        const row = await db.getFirstAsync<UserRow>(
            'SELECT * FROM users WHERE email = ?',
            [normalizedEmail],
        );

        if (!row) {
            throw new Error('Invalid email or password.');
        }

        const incomingHash = await hashPassword(password);

        if (row.password_hash !== incomingHash) {
            throw new Error('Invalid email or password.');
        }

        if (row.is_verified === 0) {
            throw new Error('Please verify your account before signing in.');
        }

        return createSessionForUser(mapRowToUser(row));
    },

    signOut: async () => {
        const db = await getDatabase();
        await db.runAsync('DELETE FROM session WHERE id = 1');
    },

    getCurrentSession: async () => {
        const db = await getDatabase();
        const row = await db.getFirstAsync<SessionJoinedRow>(
            `SELECT u.*, s.token, s.expires_at
       FROM session s
       INNER JOIN users u ON u.id = s.user_id
       WHERE s.id = 1`,
        );

        if (!row) {
            return null;
        }

        if (new Date(row.expires_at) <= new Date()) {
            await db.runAsync('DELETE FROM session WHERE id = 1');
            return null;
        }

        return {
            user: mapRowToUser(row),
            token: row.token,
            expiresAt: row.expires_at,
        };
    },
};