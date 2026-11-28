



import { Colors } from "@/constants/theme";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export interface DailyBookingStat {
    day: string;
    arrivals: number;
    checkOuts: number;
}

interface BookingActivityChartCardProps {
    data: DailyBookingStat[];
    defaultSelectedDay?: string;
}

const MAX_BAR_HEIGHT = 76;

const BookingActivityChartCard = ({
    data,
    defaultSelectedDay = "Sat",
}: BookingActivityChartCardProps) => {
    const [selectedDay, setSelectedDay] = useState<string>(defaultSelectedDay);

    const maxTotal = Math.max(
        ...data.map((item) => item.arrivals + item.checkOuts),
        1,
    );

    const activeDayStat = data.find((item) => item.day === selectedDay);

    return (
        <View style={styles.card}>
            <View style={styles.header}>
                <View>
                    <Text style={styles.title}>Booking activity</Text>
                    <Text style={styles.subtitle}>Arrivals and check-outs this week</Text>
                </View>
                {activeDayStat ? (
                    <View style={styles.dayBadge}>
                        <Text style={styles.dayBadgeText}>
                            {activeDayStat.arrivals} in · {activeDayStat.checkOuts} out
                        </Text>
                    </View>
                ) : null}
            </View>

            <View style={styles.chartRow}>
                {data.map((item) => {
                    const total = item.arrivals + item.checkOuts;
                    const barHeight = Math.max(
                        Math.round((total / maxTotal) * MAX_BAR_HEIGHT),
                        18,
                    );
                    const isSelected = item.day === selectedDay;

                    return (
                        <Pressable
                            key={item.day}
                            accessibilityRole="button"
                            accessibilityLabel={`${item.day}: ${item.arrivals} arrivals, ${item.checkOuts} check-outs`}
                            onPress={() => setSelectedDay(item.day)}
                            style={styles.barColumn}
                        >
                            <View style={styles.barTrack}>
                                <View
                                    style={[
                                        styles.barFill,
                                        { height: barHeight },
                                        isSelected ? styles.barFillActive : styles.barFillInactive,
                                    ]}
                                />
                            </View>
                            <Text
                                style={[
                                    styles.dayLabel,
                                    isSelected && styles.dayLabelActive,
                                ]}
                            >
                                {item.day}
                            </Text>
                        </Pressable>
                    );
                })}
            </View>

            <View style={styles.legendRow}>
                <View style={styles.legendItem}>
                    <View style={[styles.legendDot, { backgroundColor: Colors.primary }]} />
                    <Text style={styles.legendText}>Arrivals</Text>
                </View>
                <View style={styles.legendItem}>
                    <View style={[styles.legendDot, { backgroundColor: Colors.outline }]} />
                    <Text style={styles.legendText}>Check-outs</Text>
                </View>
            </View>
        </View>
    );
};

export default BookingActivityChartCard;

const styles = StyleSheet.create({
    card: {
        backgroundColor: Colors.surface,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: Colors.borderLight,
        padding: 16,
        gap: 16,
    },
    header: {
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: 8,
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
    dayBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
        backgroundColor: Colors.mintBg,
        borderWidth: 1,
        borderColor: Colors.borderLight,
    },
    dayBadgeText: {
        fontSize: 11,
        fontWeight: "600",
        color: Colors.primary,
    },
    chartRow: {
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "space-between",
        paddingTop: 6,
        gap: 8,
    },
    barColumn: {
        flex: 1,
        alignItems: "center",
        gap: 8,
    },
    barTrack: {
        height: MAX_BAR_HEIGHT,
        width: "100%",
        justifyContent: "flex-end",
        alignItems: "center",
    },
    barFill: {
        width: "100%",
        maxWidth: 34,
        borderRadius: 6,
    },
    barFillInactive: {
        backgroundColor: "#dcfce7",
    },
    barFillActive: {
        backgroundColor: Colors.primary,
    },
    dayLabel: {
        fontSize: 11,
        lineHeight: 14,
        fontWeight: "500",
        color: Colors.outline,
    },
    dayLabelActive: {
        fontWeight: "700",
        color: Colors.onSurface,
    },
    legendRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 20,
        paddingTop: 2,
    },
    legendItem: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
    },
    legendDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
    },
    legendText: {
        fontSize: 12,
        lineHeight: 16,
        fontWeight: "500",
        color: Colors.outline,
    },
});