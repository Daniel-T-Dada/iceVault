import { useAuth } from "@/contexts/AuthContext";
import { Redirect, Stack } from "expo-router";

const AuthLayout = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if(!isLoading && isAuthenticated) {
    return <Redirect href="/(root)/(tabs)/dashboard" />;
  }


  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="sign-in" />
      <Stack.Screen name="sign-up" />
      <Stack.Screen name="otp" />
      <Stack.Screen name="verification" />
    </Stack>
  );
};

export default AuthLayout;
