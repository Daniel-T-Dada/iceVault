


import { Colors } from "@/constants/theme";
import { StyleSheet, Text, View } from "react-native";

export interface StatCardItem {
    id: string;
    label: string;
    value: string;
    subtext: string;
    labelColor?: string;
    subtextColor?: string;
}

const StatCard = ({
    label,
    value,
    subtext,
    labelColor = Colors.outline,
    subtextColor = Colors.outline,
}: StatCardItem) => {
    return (
        <View style={styles.card}>
            <Text style={[styles.label, { color: labelColor }]} numberOfLines={1}>
                {label}
            </Text>
            <Text style={styles.value}>{value}</Text>
            <Text style={[styles.subtext, { color: subtextColor }]} numberOfLines={1}>
                {subtext}
            </Text>
        </View>
    );
};

export default StatCard;

const styles = StyleSheet.create({
    card: {
        flex: 1,
        backgroundColor: Colors.surface,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: Colors.borderLight,
        paddingHorizontal: 14,
        paddingVertical: 14,
        gap: 8,
    },
    label: {
        fontSize: 12,
        lineHeight: 16,
        fontWeight: "500",
    },
    value: {
        fontSize: 28,
        lineHeight: 34,
        fontWeight: "700",
        color: Colors.onSurface,
    },
    subtext: {
        fontSize: 12,
        lineHeight: 16,
        fontWeight: "500",
    },
});