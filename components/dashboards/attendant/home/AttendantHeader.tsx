


import { Colors } from "@/constants/theme";
import { Image } from "expo-image";
import { Pressable, StyleSheet, Text, View } from "react-native";

const LOGO_ICON = require("@/assets/images/iceVault-logo.png");

interface AttendantHeaderProps {
    hubName: string;
    fullName?: string;
    onPressProfile?: () => void;
}

const getInitials = (name?: string): string => {
    if (!name?.trim()) return "AT";
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) {
        return parts[0].slice(0, 2).toUpperCase();
    }
    return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
};

const AttendantHeader = ({
    hubName,
    fullName,
    onPressProfile,
}: AttendantHeaderProps) => {
    const initials = getInitials(fullName);

    return (
        <View style={styles.container}>
            <View style={styles.brandRow}>
                <Image source={LOGO_ICON} contentFit="contain" style={styles.logo} />
                <View>
                    <Text style={styles.brandTitle}>
                        ICE <Text style={styles.brandAccent}>VAULT</Text>
                    </Text>
                    <Text style={styles.hubSubtitle}>{hubName}</Text>
                </View>
            </View>

            <Pressable
                accessibilityLabel="Attendant profile"
                accessibilityRole="button"
                onPress={onPressProfile}
                style={({ pressed }) => [styles.avatar, pressed && styles.pressed]}
            >
                <Text style={styles.avatarText}>{initials}</Text>
            </Pressable>
        </View>
    );
};

export default AttendantHeader;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 18,
        paddingVertical: 12,
        backgroundColor: Colors.surface,
        borderBottomWidth: 1,
        borderBottomColor: Colors.borderLight,
    },
    brandRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    logo: {
        width: 34,
        height: 34,
    },
    brandTitle: {
        fontSize: 15,
        lineHeight: 18,
        fontWeight: "800",
        color: Colors.onSurface,
        letterSpacing: 0.4,
    },
    brandAccent: {
        color: Colors.primary,
    },
    hubSubtitle: {
        fontSize: 12,
        lineHeight: 16,
        fontWeight: "500",
        color: Colors.outline,
    },
    avatar: {
        width: 38,
        height: 38,
        borderRadius: 19,
        backgroundColor: "#dcfce7",
        alignItems: "center",
        justifyContent: "center",
    },
    avatarText: {
        fontSize: 13,
        fontWeight: "700",
        color: Colors.primary,
    },
    pressed: {
        opacity: 0.8,
    },
});