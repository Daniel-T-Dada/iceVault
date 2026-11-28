import { AuthProvider } from "@/contexts/AuthContext";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

const RootLayout = () => {
  return (
    <>
      <AuthProvider>
        <StatusBar style="auto" />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen
            name="index"
          />
          <Stack.Screen
            name="(auth)"
          />
          <Stack.Screen
            name="(root)"
          />
        </Stack>
      </AuthProvider>
    </>
  );
};

export default RootLayout;
