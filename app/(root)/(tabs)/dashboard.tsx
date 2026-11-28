
import { Colors } from "@/constants/theme";
import { useAuth } from "@/contexts/AuthContext";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FarmerDashboard from "@/components/dashboards/farmer/FarmerDashboard"
import AttendantDashboard from "@/components/dashboards/attendant/AttendantDashboard";

const RolePlaceholder = ({ roleTitle }: { roleTitle: string }) => {
  const { user } = useAuth();
  const firstName = user?.fullName?.trim().split(/\s+/)[0] || "User";

  return (
    <SafeAreaView edges={["top"]} style={styles.placeholderSafeArea}>
      <View style={styles.placeholderContainer}>
        <Text style={styles.greeting}>Hello {firstName} !</Text>
        <Text style={styles.roleLabel}>{roleTitle} Dashboard</Text>
      </View>
    </SafeAreaView>
  );
};

const DashboardScreen = () => {
  const { user } = useAuth();

  switch (user?.role) {
    case "attendant":
      return <AttendantDashboard />;
    case "operator":
      return <RolePlaceholder roleTitle="Operator" />;
    case "farmer":
    default:
      return <FarmerDashboard />;
  }
};

export default DashboardScreen;

const styles = StyleSheet.create({
  placeholderSafeArea: {
    flex: 1,
    backgroundColor: Colors.mintBg,
  },
  placeholderContainer: {
    flex: 1,
    paddingHorizontal: 18,
    paddingTop: 24,
    gap: 8,
  },
  greeting: {
    fontSize: 28,
    lineHeight: 36,
    fontWeight: "600",
    color: Colors.onSurface,
  },
  roleLabel: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "600",
    color: Colors.primary,
  },
});