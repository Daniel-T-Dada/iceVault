



import { Colors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { useRef } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

interface BookingsFilterHeaderProps {
    hubName: string;
    searchQuery: string;
    onChangeSearch: (text: string) => void;
    selectedDateLabel: string;
    selectedStatusLabel: string;
    onPressDateFilter: () => void;
    onPressStatusFilter: () => void;
    filteredCount: number;
    totalCount: number;
    lastUpdated: string;
}

const BookingsFilterHeader = ({
    hubName,
    searchQuery,
    onChangeSearch,
    selectedDateLabel,
    selectedStatusLabel,
    onPressDateFilter,
    onPressStatusFilter,
    filteredCount,
    totalCount,
    lastUpdated,
}: BookingsFilterHeaderProps) => {
    const searchInputRef = useRef<React.ComponentRef<typeof TextInput> | null>(
        null,
    );

    const handleFindBookingPress = () => {
        searchInputRef.current?.focus();
    };

    return (
        <View style={styles.container}>
            <View style={styles.titleBlock}>
                <Text style={styles.title}>All bookings</Text>
                <Text style={styles.subtitle}>
                    Review arrivals and storage at {hubName}.
                </Text>
            </View>

            <Pressable
                accessibilityRole="button"
                onPress={handleFindBookingPress}
                style={({ pressed }) => [
                    styles.primaryButton,
                    pressed && styles.pressed,
                ]}
            >
                <Ionicons name="search-outline" size={20} color={Colors.onPrimary} />
                <Text style={styles.primaryButtonText}>Find a booking</Text>
            </Pressable>

            <View style={styles.searchBar}>
                <Ionicons name="search-outline" size={18} color={Colors.gray} />
                <TextInput
                    ref={searchInputRef}
                    value={searchQuery}
                    onChangeText={onChangeSearch}
                    placeholder="Search name, code or produce"
                    placeholderTextColor={Colors.gray}
                    autoCapitalize="none"
                    autoCorrect={false}
                    style={styles.searchInput}
                />
                {searchQuery.length > 0 ? (
                    <Pressable
                        accessibilityLabel="Clear search"
                        accessibilityRole="button"
                        hitSlop={8}
                        onPress={() => onChangeSearch("")}
                    >
                        <Ionicons name="close-circle" size={18} color={Colors.gray} />
                    </Pressable>
                ) : null}
            </View>

            <View style={styles.filterRow}>
                <Pressable
                    accessibilityRole="button"
                    onPress={onPressDateFilter}
                    style={({ pressed }) => [
                        styles.filterPill,
                        pressed && styles.pressed,
                    ]}
                >
                    <Ionicons
                        name="calendar-outline"
                        size={16}
                        color={Colors.primary}
                    />
                    <Text style={styles.filterPillText} numberOfLines={1}>
                        {selectedDateLabel}
                    </Text>
                </Pressable>

                <Pressable
                    accessibilityRole="button"
                    onPress={onPressStatusFilter}
                    style={({ pressed }) => [
                        styles.filterPill,
                        pressed && styles.pressed,
                    ]}
                >
                    <Text style={styles.filterPillText} numberOfLines={1}>
                        {selectedStatusLabel}
                    </Text>
                </Pressable>
            </View>

            <View style={styles.metaRow}>
                <Text style={styles.metaText}>
                    {filteredCount} of {totalCount} bookings
                </Text>
                <Text style={styles.metaText}>Updated {lastUpdated}</Text>
            </View>
        </View>
    );
};

export default BookingsFilterHeader;

const styles = StyleSheet.create({
    container: {
        gap: 14,
        marginBottom: 4,
    },
    titleBlock: {
        gap: 4,
    },
    title: {
        fontSize: 26,
        lineHeight: 32,
        fontWeight: "700",
        color: Colors.onSurface,
    },
    subtitle: {
        fontSize: 13,
        lineHeight: 18,
        fontWeight: "400",
        color: Colors.outline,
    },
    primaryButton: {
        height: 48,
        borderRadius: 12,
        backgroundColor: Colors.primary,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
    },
    primaryButtonText: {
        fontSize: 15,
        fontWeight: "600",
        color: Colors.onPrimary,
    },
    searchBar: {
        height: 46,
        borderRadius: 12,
        backgroundColor: Colors.surface,
        borderWidth: 1,
        borderColor: Colors.borderLight,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 14,
        gap: 10,
    },
    searchInput: {
        flex: 1,
        fontSize: 14,
        color: Colors.onSurface,
    },
    filterRow: {
        flexDirection: "row",
        gap: 12,
    },
    filterPill: {
        flex: 1,
        height: 42,
        borderRadius: 10,
        backgroundColor: Colors.surface,
        borderWidth: 1,
        borderColor: Colors.primary,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 12,
        gap: 8,
    },
    filterPillText: {
        fontSize: 13,
        fontWeight: "600",
        color: Colors.primary,
    },
    metaRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingTop: 2,
    },
    metaText: {
        fontSize: 12,
        lineHeight: 16,
        fontWeight: "400",
        color: Colors.outline,
    },
    pressed: {
        opacity: 0.85,
    },
});