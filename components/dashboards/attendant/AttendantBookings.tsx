



import { ATTENDANT_BOOKINGS, ATTENDANT_HUB_NAME, BOOKING_DATE_OPTIONS, BOOKING_STATUS_OPTIONS} from "@/constants/attendant";
import { Colors } from "@/constants/theme";
import { useAuth } from "@/contexts/AuthContext";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useMemo, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BookingCard from "./bookings/BookingCard";
import BookingsFilterHeader from "./bookings/BookingsFilterHeader";
import FilterPickerModal from "./bookings/FilterPickerModal";
import { BookingRecord } from "./bookings/types";
import AttendantHeader from "./home/AttendantHeader";

const AttendantBookings = () => {
    const { user } = useAuth();
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedDate, setSelectedDate] = useState("all");
    const [selectedStatus, setSelectedStatus] = useState("all");
    const [activeModal, setActiveModal] = useState<"date" | "status" | null>(
        null,
    );

    const filteredBookings = useMemo(() => {
        const query = searchQuery.trim().toLowerCase();

        return ATTENDANT_BOOKINGS.filter((item) => {
            const matchesDate =
                selectedDate === "all" || item.expectedDate === selectedDate;
            const matchesStatus =
                selectedStatus === "all" || item.status === selectedStatus;
            const matchesQuery =
                !query ||
                item.farmerName.toLowerCase().includes(query) ||
                item.bookingCode.toLowerCase().includes(query) ||
                item.produce.toLowerCase().includes(query) ||
                item.phoneNumber.includes(query);

            return matchesDate && matchesStatus && matchesQuery;
        });
    }, [searchQuery, selectedDate, selectedStatus]);

    const selectedDateLabel =
        BOOKING_DATE_OPTIONS.find((opt) => opt.value === selectedDate)?.label ??
        "All dates";

    const selectedStatusLabel =
        BOOKING_STATUS_OPTIONS.find((opt) => opt.value === selectedStatus)?.label ??
        "All statuses";

    const handleSelectBooking = (booking: BookingRecord) => {
        console.log("Selected booking:", booking.bookingCode);
    };

    return (
        <SafeAreaView edges={["top"]} style={styles.safeArea}>
            <StatusBar style="dark" />
            <AttendantHeader
                hubName={ATTENDANT_HUB_NAME}
                fullName={user?.fullName || "Kabiru"}
                onPressProfile={() => router.push("/(root)/(tabs)/more")}
            />

            <FlatList
                data={filteredBookings}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <BookingCard booking={item} onPress={handleSelectBooking} />
                )}
                ListHeaderComponent={
                    <BookingsFilterHeader
                        hubName={ATTENDANT_HUB_NAME}
                        searchQuery={searchQuery}
                        onChangeSearch={setSearchQuery}
                        selectedDateLabel={selectedDateLabel}
                        selectedStatusLabel={selectedStatusLabel}
                        onPressDateFilter={() => setActiveModal("date")}
                        onPressStatusFilter={() => setActiveModal("status")}
                        filteredCount={filteredBookings.length}
                        totalCount={ATTENDANT_BOOKINGS.length}
                        lastUpdated="10:05"
                    />
                }
                ListEmptyComponent={
                    <View style={styles.emptyState}>
                        <Text style={styles.emptyTitle}>No matching bookings</Text>
                        <Text style={styles.emptySubtitle}>
                            Try clearing your search or changing the date and status filters.
                        </Text>
                    </View>
                }
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            />

            <FilterPickerModal
                visible={activeModal === "date"}
                title="Filter by Date"
                options={BOOKING_DATE_OPTIONS}
                selectedValue={selectedDate}
                onSelect={setSelectedDate}
                onClose={() => setActiveModal(null)}
            />

            <FilterPickerModal
                visible={activeModal === "status"}
                title="Filter by Status"
                options={BOOKING_STATUS_OPTIONS}
                selectedValue={selectedStatus}
                onSelect={setSelectedStatus}
                onClose={() => setActiveModal(null)}
            />
        </SafeAreaView>
    );
};

export default AttendantBookings;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: Colors.surfaceLow,
    },
    listContent: {
        paddingHorizontal: 18,
        paddingTop: 18,
        paddingBottom: 28,
        gap: 12,
    },
    emptyState: {
        backgroundColor: Colors.surface,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: Colors.borderLight,
        padding: 24,
        alignItems: "center",
        gap: 6,
        marginTop: 8,
    },
    emptyTitle: {
        fontSize: 15,
        fontWeight: "700",
        color: Colors.onSurface,
    },
    emptySubtitle: {
        fontSize: 13,
        color: Colors.outline,
        textAlign: "center",
    },
});