import { Colors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface GreetingSectionProps {
    firstName: string;
    hubName: string;
    onFindBookingPress: () => void;
}

const getTimeGreeting = (): string => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
};

const GreetingSection = ({
    firstName,
    hubName,
    onFindBookingPress,
}: GreetingSectionProps) => {
    const greeting = getTimeGreeting();

    return (
        <View style={styles.container}>
            <View style={styles.textBlock}>
                <Text style={styles.title}>
                    {greeting}, {firstName}
                </Text>
                <Text style={styles.subtitle}>
                    Keep today&apos;s arrivals, storage and produce releases moving at{" "}
                    <Text style={styles.hubBold}>{hubName}</Text>.
                </Text>
            </View>

            <Pressable
                accessibilityRole="button"
                onPress={onFindBookingPress}
                style={({ pressed }) => [
                    styles.ctaButton,
                    pressed && styles.ctaPressed,
                ]}
            >
                <Ionicons name="search-outline" size={20} color={Colors.onPrimary} />
                <Text style={styles.ctaText}>Find a booking</Text>
            </Pressable>
        </View>
    );
};

export default GreetingSection;

const styles = StyleSheet.create({
    container: {
        gap: 16,
    },
    textBlock: {
        gap: 6,
    },
    title: {
        fontSize: 26,
        lineHeight: 32,
        fontWeight: "700",
        color: Colors.onSurface,
    },
    subtitle: {
        fontSize: 14,
        lineHeight: 20,
        fontWeight: "400",
        color: Colors.outline,
    },
    hubBold: {
        fontWeight: "700",
        color: Colors.onSurfaceVariant,
    },
    ctaButton: {
        height: 48,
        borderRadius: 12,
        backgroundColor: Colors.primary,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
    },
    ctaPressed: {
        opacity: 0.9,
    },
    ctaText: {
        fontSize: 15,
        fontWeight: "600",
        color: Colors.onPrimary,
    },
});