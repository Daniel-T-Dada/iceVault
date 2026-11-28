


import { Colors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";
import BookingStatusBadge from "./BookingStatusBadge";
import { BookingRecord } from "./types";

interface BookingCardProps {
    booking: BookingRecord;
    onPress: (booking: BookingRecord) => void;
}

const BookingCard = ({ booking, onPress }: BookingCardProps) => {
    return (
        <Pressable
            accessibilityRole="button"
            accessibilityLabel={`Booking ${booking.bookingCode} for ${booking.farmerName}`}
            onPress={() => onPress(booking)}
            style={({ pressed }) => [styles.card, pressed && styles.pressed]}
        >
            <View style={styles.topRow}>
                <Text style={styles.farmerName} numberOfLines={1}>
                    {booking.farmerName}
                </Text>
                <Ionicons name="chevron-forward" size={18} color={Colors.outline} />
            </View>

            <Text style={styles.codeMeta}>
                {booking.bookingCode} · {booking.phoneNumber}
            </Text>

            <Text style={styles.produceText}>
                {booking.produce} · {booking.crates} crates
            </Text>

            <View style={styles.bottomRow}>
                <Text style={styles.expectedText}>
                    Expected {booking.expectedDate}, {booking.expectedTime}
                </Text>
                <BookingStatusBadge status={booking.status} />
            </View>
        </Pressable>
    );
};

export default BookingCard;

const styles = StyleSheet.create({
    card: {
        backgroundColor: Colors.surface,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: Colors.borderLight,
        paddingHorizontal: 16,
        paddingVertical: 14,
        gap: 6,
    },
    pressed: {
        opacity: 0.85,
    },
    topRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 8,
    },
    farmerName: {
        flex: 1,
        fontSize: 16,
        lineHeight: 22,
        fontWeight: "700",
        color: Colors.onSurface,
    },
    codeMeta: {
        fontSize: 12,
        lineHeight: 16,
        fontWeight: "400",
        color: Colors.outline,
    },
    produceText: {
        fontSize: 13,
        lineHeight: 18,
        fontWeight: "600",
        color: Colors.onSurfaceVariant,
        marginTop: 2,
    },
    bottomRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 8,
        marginTop: 4,
    },
    expectedText: {
        fontSize: 12,
        lineHeight: 16,
        fontWeight: "400",
        color: Colors.outline,
    },
});