



import { Colors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

export type FloorEventType = "checked_in" | "checkout_ready" | "quantity_review";

export interface FloorActivityEvent {
    id: string;
    type: FloorEventType;
    title: string;
    subtitle: string;
    timestamp: string;
}

interface FloorActivityCardProps {
    events: FloorActivityEvent[];
    onPressViewAll: () => void;
}

const FLOOR_ICON_MAP: Record<
    FloorEventType,
    React.ComponentProps<typeof Ionicons>["name"]
> = {
    checked_in: "arrow-down-circle",
    checkout_ready: "checkmark-circle-outline",
    quantity_review: "document-text-outline",
};

const FloorActivityCard = ({
    events,
    onPressViewAll,
}: FloorActivityCardProps) => {
    return (
        <View style={styles.card}>
            <View style={styles.headerRow}>
                <View>
                    <Text style={styles.title}>Floor activity</Text>
                    <Text style={styles.subtitle}>Updates from the facility floor</Text>
                </View>
                <Pressable
                    accessibilityRole="button"
                    hitSlop={8}
                    onPress={onPressViewAll}
                >
                    <Text style={styles.viewAllText}>View all</Text>
                </Pressable>
            </View>

            <View style={styles.list}>
                {events.map((event) => (
                    <View key={event.id} style={styles.row}>
                        <View style={styles.iconBadge}>
                            <Ionicons
                                name={FLOOR_ICON_MAP[event.type]}
                                size={18}
                                color={Colors.primary}
                            />
                        </View>

                        <View style={styles.details}>
                            <Text style={styles.eventTitle}>{event.title}</Text>
                            <Text style={styles.eventMeta}>{event.subtitle}</Text>
                        </View>

                        <Text style={styles.timestamp}>{event.timestamp}</Text>
                    </View>
                ))}
            </View>
        </View>
    );
};

export default FloorActivityCard;

const styles = StyleSheet.create({
    card: {
        backgroundColor: Colors.surface,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: Colors.borderLight,
        padding: 16,
        gap: 16,
    },
    headerRow: {
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "space-between",
    },
    title: {
        fontSize: 16,
        lineHeight: 22,
        fontWeight: "700",
        color: Colors.onSurface,
    },
    subtitle: {
        fontSize: 12,
        lineHeight: 16,
        fontWeight: "400",
        color: Colors.outline,
        marginTop: 2,
    },
    viewAllText: {
        fontSize: 13,
        lineHeight: 18,
        fontWeight: "600",
        color: Colors.primary,
    },
    list: {
        gap: 16,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
    },
    iconBadge: {
        width: 34,
        height: 34,
        borderRadius: 10,
        backgroundColor: "#dcfce7",
        alignItems: "center",
        justifyContent: "center",
    },
    details: {
        flex: 1,
        gap: 2,
    },
    eventTitle: {
        fontSize: 14,
        lineHeight: 19,
        fontWeight: "600",
        color: Colors.onSurface,
    },
    eventMeta: {
        fontSize: 12,
        lineHeight: 16,
        fontWeight: "400",
        color: Colors.outline,
    },
    timestamp: {
        fontSize: 12,
        lineHeight: 16,
        fontWeight: "500",
        color: Colors.gray,
    },
});