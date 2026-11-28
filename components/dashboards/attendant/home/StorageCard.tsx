


import { Colors } from "@/constants/theme";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { PieChart } from "react-native-gifted-charts";

export interface StorageCardProps {
    occupied: number;
    available: number;
    total: number;
    unit?: string;
}

const OCCUPIED_COLOR = "#B45309";

const StorageCard = ({
    occupied,
    available,
    total,
    unit = "crates",
}: StorageCardProps) => {
    const safeTotal = Math.max(total, 0);
    const clampedOccupied = Math.min(Math.max(occupied, 0), safeTotal);
    const clampedAvailable = Math.min(
        Math.max(available, 0),
        Math.max(safeTotal - clampedOccupied, 0),
    );
    const unallocated = Math.max(
        safeTotal - clampedOccupied - clampedAvailable,
        0,
    );

    const occupiedPercent =
        safeTotal > 0 ? Math.round((clampedOccupied / safeTotal) * 100) : 0;
    const availablePercent =
        safeTotal > 0 ? Math.round((clampedAvailable / safeTotal) * 100) : 0;

    const pieData =
        safeTotal > 0
            ? [
                { value: clampedOccupied, color: OCCUPIED_COLOR },
                { value: clampedAvailable, color: Colors.primary },
                ...(unallocated > 0
                    ? [{ value: unallocated, color: Colors.surfaceLow }]
                    : []),
            ]
            : [{ value: 1, color: Colors.surfaceLow }];

    return (
        <View style={styles.card}>
            <Text style={styles.title}>Storage capacity</Text>

            <View style={styles.contentRow}>
                <PieChart
                    data={pieData}
                    donut
                    radius={52}
                    innerRadius={42}
                    innerCircleColor={Colors.surface}
                    centerLabelComponent={() => (
                        <View style={styles.ringCenterText}>
                            <Text style={styles.percentText}>{occupiedPercent}%</Text>
                            <Text style={styles.occupiedLabel}>occupied</Text>
                        </View>
                    )}
                />

                <View style={styles.barsColumn}>
                    <View style={styles.metricBlock}>
                        <View style={styles.metricHeader}>
                            <Text style={styles.metricName}>Occupied</Text>
                            <Text style={styles.metricValue}>
                                {clampedOccupied} {unit}
                            </Text>
                        </View>
                        <View style={styles.track}>
                            <View
                                style={[
                                    styles.fill,
                                    {
                                        width: `${occupiedPercent}%`,
                                        backgroundColor: OCCUPIED_COLOR,
                                    },
                                ]}
                            />
                        </View>
                    </View>

                    <View style={styles.metricBlock}>
                        <View style={styles.metricHeader}>
                            <Text style={styles.metricName}>Available</Text>
                            <Text style={styles.metricValue}>
                                {clampedAvailable} {unit}
                            </Text>
                        </View>
                        <View style={styles.track}>
                            <View
                                style={[
                                    styles.fill,
                                    {
                                        width: `${availablePercent}%`,
                                        backgroundColor: Colors.primary,
                                    },
                                ]}
                            />
                        </View>
                    </View>

                    <View style={styles.metricBlock}>
                        <View style={styles.metricHeader}>
                            <Text style={styles.metricName}>Total</Text>
                            <Text style={styles.metricValue}>
                                {safeTotal} {unit}
                            </Text>
                        </View>
                        <View style={styles.track}>
                            <View
                                style={[
                                    styles.fill,
                                    {
                                        width: safeTotal > 0 ? "100%" : "0%",
                                        backgroundColor: Colors.tertiary,
                                    },
                                ]}
                            />
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default StorageCard;

const styles = StyleSheet.create({
    card: {
        backgroundColor: Colors.surface,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: Colors.borderLight,
        padding: 16,
        gap: 16,
    },
    title: {
        fontSize: 16,
        lineHeight: 22,
        fontWeight: "700",
        color: Colors.onSurface,
    },
    contentRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 18,
    },
    ringCenterText: {
        alignItems: "center",
        justifyContent: "center",
    },
    percentText: {
        fontSize: 20,
        lineHeight: 24,
        fontWeight: "700",
        color: Colors.onSurface,
    },
    occupiedLabel: {
        fontSize: 11,
        lineHeight: 14,
        fontWeight: "500",
        color: Colors.outline,
    },
    barsColumn: {
        flex: 1,
        gap: 12,
    },
    metricBlock: {
        gap: 5,
    },
    metricHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    metricName: {
        fontSize: 12,
        lineHeight: 16,
        fontWeight: "500",
        color: Colors.outline,
    },
    metricValue: {
        fontSize: 12,
        lineHeight: 16,
        fontWeight: "700",
        color: Colors.onSurface,
    },
    track: {
        height: 6,
        borderRadius: 999,
        backgroundColor: Colors.surfaceLow,
        overflow: "hidden",
    },
    fill: {
        height: "100%",
        borderRadius: 999,
    },
});