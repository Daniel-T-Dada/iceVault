



import { StyleSheet, View } from "react-native";
import StatCard, { StatCardItem } from "./StatCard";

interface StatsGridProps {
    stats: StatCardItem[];
}

const StatsGrid = ({ stats }: StatsGridProps) => {
    const firstRow = stats.slice(0, 2);
    const secondRow = stats.slice(2, 4);

    return (
        <View style={styles.grid}>
            <View style={styles.row}>
                {firstRow.map((item) => (
                    <StatCard key={item.id} {...item} />
                ))}
            </View>
            <View style={styles.row}>
                {secondRow.map((item) => (
                    <StatCard key={item.id} {...item} />
                ))}
            </View>
        </View>
    );
};

export default StatsGrid;

const styles = StyleSheet.create({
    grid: {
        gap: 12,
    },
    row: {
        flexDirection: "row",
        gap: 12,
    },
});