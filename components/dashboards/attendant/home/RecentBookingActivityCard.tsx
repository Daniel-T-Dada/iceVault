


import { Colors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

export type BookingEventType = "received" | "confirmed" | "checkout";

export interface RecentBookingEvent {
    id: string;
    type: BookingEventType;
    title: string;
    farmerName: string;
    bookingCode: string;
    timestamp: string;
}

interface RecentBookingActivityCardProps {
    events: RecentBookingEvent[];
    onPressViewAll: () => void;
}

const EVENT_ICON_MAP: Record<
    BookingEventType,
    React.ComponentProps<typeof Ionicons>["name"]
> = {
    received: "calendar-outline",
    confirmed: "checkmark-circle",
    checkout: "arrow-forward-outline",
};

const RecentBookingActivityCard = ({
    events,
    onPressViewAll,
}: RecentBookingActivityCardProps) => {
    return (
        <View style={styles.card}>
            <View style={styles.headerRow}>
                <Text style={styles.title}>Recent booking activity</Text>
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
                        <View style={styles.iconWrap}>
                            <Ionicons
                                name={EVENT_ICON_MAP[event.type]}
                                size={20}
                                color={Colors.primary}
                            />
                        </View>

                        <View style={styles.details}>
                            <Text style={styles.eventTitle}>{event.title}</Text>
                            <Text style={styles.eventMeta}>
                                {event.farmerName} · {event.bookingCode}
                            </Text>
                        </View>

                        <Text style={styles.timestamp}>{event.timestamp}</Text>
                    </View>
                ))}
            </View>
        </View>
    );
};

export default RecentBookingActivityCard;

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
        alignItems: "center",
        justifyContent: "space-between",
    },
    title: {
        fontSize: 16,
        lineHeight: 22,
        fontWeight: "700",
        color: Colors.onSurface,
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
    iconWrap: {
        width: 28,
        height: 28,
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