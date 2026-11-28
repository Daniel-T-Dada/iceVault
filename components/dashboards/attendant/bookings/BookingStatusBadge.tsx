


import { Colors } from "@/constants/theme";
import { StyleSheet, Text, View } from "react-native";
import { BookingStatus } from "./types";

interface StatusConfig {
    label: string;
    backgroundColor: string;
    textColor: string;
    showDot: boolean;
}

const STATUS_CONFIG: Record<BookingStatus, StatusConfig> = {
    pending_checkin: {
        label: "Pending check-in",
        backgroundColor: "#f3e6d8",
        textColor: "#78350f",
        showDot: true,
    },
    in_storage: {
        label: "In storage",
        backgroundColor: "#dcfce7",
        textColor: Colors.primary,
        showDot: false,
    },
    pending_checkout: {
        label: "Pending checkout",
        backgroundColor: "#f3e6d8",
        textColor: "#78350f",
        showDot: true,
    },
    checked_out: {
        label: "Checked Out",
        backgroundColor: Colors.surfaceLow,
        textColor: Colors.outline,
        showDot: true,
    },
};

interface BookingStatusBadgeProps {
    status: BookingStatus;
}

const BookingStatusBadge = ({ status }: BookingStatusBadgeProps) => {
    const config = STATUS_CONFIG[status];

    return (
        <View
            style={[styles.badge, { backgroundColor: config.backgroundColor }]}
        >
            {config.showDot ? (
                <View style={[styles.dot, { backgroundColor: config.textColor }]} />
            ) : null}
            <Text style={[styles.label, { color: config.textColor }]}>
                {config.label}
            </Text>
        </View>
    );
};

export default BookingStatusBadge;

const styles = StyleSheet.create({
    badge: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 999,
        gap: 6,
    },
    dot: {
        width: 6,
        height: 6,
        borderRadius: 3,
    },
    label: {
        fontSize: 11,
        lineHeight: 15,
        fontWeight: "600",
    },
});