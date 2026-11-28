


import AttendantBookings from "@/components/dashboards/attendant/AttendantBookings";
import { Colors } from "@/constants/theme";
import { useAuth } from "@/contexts/AuthContext";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const BookingsScreen = () => {
    const { user } = useAuth();

    if (user?.role === "attendant") {
        return <AttendantBookings />;
    }

    return (
        <SafeAreaView edges={["top"]} style={styles.safeArea}>
            <View style={styles.container}>
                <Text style={styles.title}>My Bookings</Text>
            </View>
        </SafeAreaView>
    );
};

export default BookingsScreen;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: Colors.mintBg,
    },
    container: {
        flex: 1,
        paddingHorizontal: 18,
        paddingTop: 24,
    },
    title: {
        fontSize: 24,
        fontWeight: "700",
        color: Colors.onSurface,
    },
});