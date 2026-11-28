


import { Colors } from "@/constants/theme";
import { useAuth } from "@/contexts/AuthContext";
import { UserRole } from "@/types/auth";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
    ActivityIndicator,
    Modal,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ROLE_LABELS: Record<UserRole, string> = {
    farmer: "Farmer / Trader",
    attendant: "Facility Attendant",
    operator: "Hub Operator",
};

const getInitials = (name?: string): string => {
    if (!name?.trim()) return "IV";
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) {
        return parts[0].slice(0, 2).toUpperCase();
    }
    return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
};

interface MenuItem {
    id: string;
    label: string;
    subtitle: string;
    icon: React.ComponentProps<typeof Ionicons>["name"];
    onPress?: () => void;
}

const MoreScreen = () => {
    const { user, signOut } = useAuth();
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const initials = getInitials(user?.fullName);
    const roleLabel = user?.role ? ROLE_LABELS[user.role] : "Member";

    const handleConfirmLogout = async () => {
        try {
            setIsLoggingOut(true);
            setShowLogoutModal(false);
            await signOut();
            router.replace("/(auth)/sign-in");
        } catch (error) {
            console.error("Failed to sign out:", error);
        } finally {
            setIsLoggingOut(false);
        }
    };

    const menuItems: MenuItem[] = [
        {
            id: "account",
            label: "Account Information",
            subtitle: user?.phoneNumber || "Manage your personal details",
            icon: "person-outline",
        },
        {
            id: "notifications",
            label: "Notifications",
            subtitle: "Booking alerts and storage updates",
            icon: "notifications-outline",
        },
        {
            id: "support",
            label: "Help & Support",
            subtitle: "Contact hub support or view guides",
            icon: "help-circle-outline",
        },
        {
            id: "privacy",
            label: "Terms & Privacy Policy",
            subtitle: "Review platform terms and data usage",
            icon: "shield-checkmark-outline",
        },
    ];

    return (
        <SafeAreaView edges={["top"]} style={styles.safeArea}>
            <StatusBar style="dark" />
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <Text style={styles.screenTitle}>More</Text>

                {/* Profile Summary Card */}
                <View style={styles.profileCard}>
                    <View style={styles.avatar}>
                        <Text style={styles.avatarText}>{initials}</Text>
                    </View>

                    <View style={styles.profileInfo}>
                        <Text style={styles.userName} numberOfLines={1}>
                            {user?.fullName || "Ice Vault User"}
                        </Text>
                        <Text style={styles.userEmail} numberOfLines={1}>
                            {user?.email || "No email available"}
                        </Text>

                        <View style={styles.badgesRow}>
                            <View style={styles.roleBadge}>
                                <Text style={styles.roleBadgeText}>{roleLabel}</Text>
                            </View>

                            <View style={styles.syncBadge}>
                                <View
                                    style={[
                                        styles.syncDot,
                                        {
                                            backgroundColor:
                                                user?.syncStatus === "synced"
                                                    ? Colors.primary
                                                    : "#d97706",
                                        },
                                    ]}
                                />
                                <Text style={styles.syncText}>
                                    {user?.syncStatus === "synced" ? "Synced" : "Offline Ready"}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Settings & Support List */}
                <View style={styles.menuCard}>
                    {menuItems.map((item, index) => (
                        <Pressable
                            key={item.id}
                            accessibilityRole="button"
                            onPress={item.onPress}
                            style={({ pressed }) => [
                                styles.menuRow,
                                index !== menuItems.length - 1 && styles.menuRowDivider,
                                pressed && styles.pressed,
                            ]}
                        >
                            <View style={styles.menuIconWrap}>
                                <Ionicons name={item.icon} size={20} color={Colors.primary} />
                            </View>

                            <View style={styles.menuTextBlock}>
                                <Text style={styles.menuLabel}>{item.label}</Text>
                                <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
                            </View>

                            <Ionicons
                                name="chevron-forward"
                                size={18}
                                color={Colors.outline}
                            />
                        </Pressable>
                    ))}
                </View>

                {/* Log Out Button */}
                <Pressable
                    accessibilityRole="button"
                    disabled={isLoggingOut}
                    onPress={() => setShowLogoutModal(true)}
                    style={({ pressed }) => [
                        styles.logoutButton,
                        pressed && styles.pressed,
                    ]}
                >
                    {isLoggingOut ? (
                        <ActivityIndicator size="small" color="#dc2626" />
                    ) : (
                        <>
                            <Ionicons name="log-out-outline" size={20} color="#dc2626" />
                            <Text style={styles.logoutText}>Log Out</Text>
                        </>
                    )}
                </Pressable>
            </ScrollView>

            {/* Logout Confirmation Modal */}
            <Modal
                animationType="fade"
                transparent
                visible={showLogoutModal}
                onRequestClose={() => setShowLogoutModal(false)}
            >
                <View style={styles.modalBackdrop}>
                    <View style={styles.modalCard}>
                        <View style={styles.modalIconCircle}>
                            <Ionicons name="log-out-outline" size={26} color="#dc2626" />
                        </View>

                        <Text style={styles.modalTitle}>Log out of Ice Vault?</Text>
                        <Text style={styles.modalMessage}>
                            You will need to sign in again with your email and password to
                            access your account.
                        </Text>

                        <View style={styles.modalActions}>
                            <Pressable
                                accessibilityRole="button"
                                onPress={() => setShowLogoutModal(false)}
                                style={({ pressed }) => [
                                    styles.cancelButton,
                                    pressed && styles.pressed,
                                ]}
                            >
                                <Text style={styles.cancelButtonText}>Cancel</Text>
                            </Pressable>

                            <Pressable
                                accessibilityRole="button"
                                onPress={handleConfirmLogout}
                                style={({ pressed }) => [
                                    styles.confirmLogoutButton,
                                    pressed && styles.pressed,
                                ]}
                            >
                                <Text style={styles.confirmLogoutText}>Log Out</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

export default MoreScreen;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: Colors.mintBg,
    },
    scrollContent: {
        paddingHorizontal: 18,
        paddingTop: 16,
        paddingBottom: 32,
        gap: 18,
    },
    screenTitle: {
        fontSize: 26,
        lineHeight: 32,
        fontWeight: "700",
        color: Colors.onSurface,
    },
    profileCard: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: Colors.surface,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: Colors.borderLight,
        padding: 16,
        gap: 14,
    },
    avatar: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: "#dcfce7",
        alignItems: "center",
        justifyContent: "center",
    },
    avatarText: {
        fontSize: 18,
        fontWeight: "700",
        color: Colors.primary,
    },
    profileInfo: {
        flex: 1,
        gap: 4,
    },
    userName: {
        fontSize: 17,
        lineHeight: 22,
        fontWeight: "700",
        color: Colors.onSurface,
    },
    userEmail: {
        fontSize: 13,
        lineHeight: 18,
        color: Colors.outline,
    },
    badgesRow: {
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 8,
        marginTop: 4,
    },
    roleBadge: {
        paddingHorizontal: 10,
        paddingVertical: 3,
        borderRadius: 999,
        backgroundColor: Colors.mintBg,
        borderWidth: 1,
        borderColor: Colors.borderLight,
    },
    roleBadgeText: {
        fontSize: 11,
        fontWeight: "600",
        color: Colors.primary,
    },
    syncBadge: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 999,
        backgroundColor: Colors.surfaceLow,
    },
    syncDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
    },
    syncText: {
        fontSize: 11,
        fontWeight: "500",
        color: Colors.onSurfaceVariant,
    },
    menuCard: {
        backgroundColor: Colors.surface,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: Colors.borderLight,
        overflow: "hidden",
    },
    menuRow: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 14,
        gap: 12,
    },
    menuRowDivider: {
        borderBottomWidth: 1,
        borderBottomColor: Colors.surfaceLow,
    },
    menuIconWrap: {
        width: 36,
        height: 36,
        borderRadius: 10,
        backgroundColor: Colors.mintBg,
        alignItems: "center",
        justifyContent: "center",
    },
    menuTextBlock: {
        flex: 1,
        gap: 2,
    },
    menuLabel: {
        fontSize: 14,
        lineHeight: 19,
        fontWeight: "600",
        color: Colors.onSurface,
    },
    menuSubtitle: {
        fontSize: 12,
        lineHeight: 16,
        color: Colors.outline,
    },
    logoutButton: {
        height: 50,
        borderRadius: 999,
        backgroundColor: "#fef2f2",
        borderWidth: 1,
        borderColor: "#fecaca",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        marginTop: 4,
    },
    logoutText: {
        fontSize: 15,
        fontWeight: "700",
        color: "#dc2626",
    },
    pressed: {
        opacity: 0.8,
    },
    modalBackdrop: {
        flex: 1,
        backgroundColor: "rgba(5, 32, 15, 0.45)",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 24,
    },
    modalCard: {
        width: "100%",
        backgroundColor: Colors.surface,
        borderRadius: 18,
        padding: 22,
        alignItems: "center",
        gap: 10,
    },
    modalIconCircle: {
        width: 52,
        height: 52,
        borderRadius: 26,
        backgroundColor: "#fef2f2",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 4,
    },
    modalTitle: {
        fontSize: 18,
        lineHeight: 24,
        fontWeight: "700",
        color: Colors.onSurface,
        textAlign: "center",
    },
    modalMessage: {
        fontSize: 13,
        lineHeight: 19,
        color: Colors.outline,
        textAlign: "center",
        marginBottom: 8,
    },
    modalActions: {
        flexDirection: "row",
        gap: 12,
        width: "100%",
    },
    cancelButton: {
        flex: 1,
        height: 44,
        borderRadius: 12,
        backgroundColor: Colors.surfaceLow,
        alignItems: "center",
        justifyContent: "center",
    },
    cancelButtonText: {
        fontSize: 14,
        fontWeight: "600",
        color: Colors.onSurfaceVariant,
    },
    confirmLogoutButton: {
        flex: 1,
        height: 44,
        borderRadius: 12,
        backgroundColor: "#dc2626",
        alignItems: "center",
        justifyContent: "center",
    },
    confirmLogoutText: {
        fontSize: 14,
        fontWeight: "600",
        color: Colors.onPrimary,
    },
});