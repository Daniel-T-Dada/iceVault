import { ATTENDANT_HUB_NAME, ATTENDANT_STATS, ATTENDANT_STORAGE_CAPACITY, FLOOR_ACTIVITY_EVENTS, RECENT_BOOKING_EVENTS, WEEKLY_BOOKING_ACTIVITY} from "@/constants/attendant";
import { Colors } from "@/constants/theme";
import { useAuth } from "@/contexts/AuthContext";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AttendantHeader from "./home/AttendantHeader";
import BookingActivityChartCard from "./home/BookingActivityChartCard";
import FloorActivityCard from "./home/FloorActivityCard";
import GreetingSection from "./home/GreetingSection";
import RecentBookingActivityCard from "./home/RecentBookingActivityCard";
import StatsGrid from "./home/StatsGrid";
import StorageCard from "./home/StorageCard";

const AttendantDashboard = () => {
    const { user } = useAuth();
    const firstName = user?.fullName?.trim().split(/\s+/)[0] || "Kabiru";

    return (
        <SafeAreaView edges={["top"]} style={styles.safeArea}>
            <StatusBar style="dark" />
            <AttendantHeader
                hubName={ATTENDANT_HUB_NAME}
                fullName={user?.fullName || "Kabiru"}
                onPressProfile={() => router.push("/(root)/(tabs)/more")}
            />

            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <GreetingSection
                    firstName={firstName}
                    hubName={ATTENDANT_HUB_NAME}
                    onFindBookingPress={() => router.push("/(root)/(tabs)/bookings")}
                />

                <StatsGrid stats={ATTENDANT_STATS} />

                <StorageCard
                    occupied={ATTENDANT_STORAGE_CAPACITY.occupied}
                    available={ATTENDANT_STORAGE_CAPACITY.available}
                    total={ATTENDANT_STORAGE_CAPACITY.total}
                    unit={ATTENDANT_STORAGE_CAPACITY.unit}
                />

                <BookingActivityChartCard data={WEEKLY_BOOKING_ACTIVITY} />

                <RecentBookingActivityCard
                    events={RECENT_BOOKING_EVENTS}
                    onPressViewAll={() => router.push("/(root)/(tabs)/bookings")}
                />

                <FloorActivityCard
                    events={FLOOR_ACTIVITY_EVENTS}
                    onPressViewAll={() => router.push("/(root)/(tabs)/storage")}
                />
            </ScrollView>
        </SafeAreaView>
    );
};

export default AttendantDashboard;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: Colors.surfaceLow,
    },
    scrollContent: {
        paddingHorizontal: 18,
        paddingTop: 18,
        paddingBottom: 28,
        gap: 18,
    },
});