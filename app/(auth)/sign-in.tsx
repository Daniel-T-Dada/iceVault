import { useAuth } from "@/contexts/AuthContext";
import { SignInPayload } from "@/types/auth";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AuthInput from "../../components/UI/AuthInput";
import Button from "../../components/UI/Button";
import IceVaultLogo from "../../components/UI/IceVaultLogo";
import SocialAuthButtons from "../../components/UI/SocialAuthButtons";
import { Colors } from "../../constants/theme";

const EMAIL_ICON = require("../../assets/icons/email.svg");
const LOCK_ICON = require("../../assets/icons/lock.svg");

const INITIAL_FORM_STATE: SignInPayload = {
  email: "",
  password: "",
};

const SignInScreen = () => {
  const { signIn, resendOtp, setPendingEmail } = useAuth();

  const [form, setForm] = useState<SignInPayload>(INITIAL_FORM_STATE);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const updateField = <K extends keyof SignInPayload>(
    key: K,
    value: SignInPayload[K],
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errorMessage) setErrorMessage(null);
  };

  const handleSignIn = async () => {
    setErrorMessage(null);

    const normalizedEmail = form.email.trim().toLowerCase();

    if (!normalizedEmail || !form.password) {
      setErrorMessage("Please enter both your email address and password.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(normalizedEmail)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    try {
      setIsSubmitting(true);

      await signIn({
        email: normalizedEmail,
        password: form.password,
      });

      router.replace("/(root)/(tabs)/dashboard");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unable to sign in.";

      if (message.toLowerCase().includes("verify your account")) {
        try {
          setPendingEmail(normalizedEmail);
          const { devOtp } = await resendOtp(normalizedEmail);

          router.push({
            pathname: "/(auth)/otp",
            params: {
              email: normalizedEmail,
              devOtp: devOtp ?? "",
            },
          });
          return;
        } catch (resendError) {
          setErrorMessage(
            resendError instanceof Error
              ? resendError.message
              : "Account unverified. Unable to send verification code.",
          );
          return;
        }
      }

      setErrorMessage(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleForgotPassword = () => {
    const normalizedEmail = form.email.trim().toLowerCase();
    router.push({
      pathname: "/(auth)/otp",
      params: normalizedEmail ? { email: normalizedEmail } : {},
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.flex}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <IceVaultLogo variant="compact" />

          <View style={styles.headerBlock}>
            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.subtitle}>Sign in to continue</Text>
          </View>

          <View style={styles.formBlock}>
            <View style={styles.inputsGroup}>
              <AuthInput
                icon={EMAIL_ICON}
                placeholder="Email Address"
                value={form.email}
                onChangeText={(value) => updateField("email", value)}
                keyboardType="email-address"
                autoCapitalize="none"
                backgroundColor={Colors.surface}
              />
              <AuthInput
                icon={LOCK_ICON}
                placeholder="Password"
                value={form.password}
                onChangeText={(value) => updateField("password", value)}
                secureTextEntry
                backgroundColor={Colors.surface}
              />
            </View>

            {errorMessage ? (
              <View style={styles.errorBanner}>
                <Text style={styles.errorText}>{errorMessage}</Text>
              </View>
            ) : null}

            <Pressable
              accessibilityRole="button"
              hitSlop={8}
              onPress={handleForgotPassword}
              style={styles.forgotBtn}
            >
              <Text style={styles.forgotText}>Forget Password?</Text>
            </Pressable>
          </View>

          <View style={styles.actionsBlock}>
            <Button
              title={isSubmitting ? "Signing In..." : "Sign In"}
              disabled={isSubmitting}
              onPress={handleSignIn}
            />

            <SocialAuthButtons variant="pill" />

            <View style={styles.footerRow}>
              <Text style={styles.footerText}>Don’t have an account ? </Text>
              <Pressable
                accessibilityRole="button"
                hitSlop={8}
                onPress={() => router.push("/(auth)/sign-up")}
              >
                <Text style={styles.footerLink}>Sign Up</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.mintBg,
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 21,
    paddingTop: 32,
    paddingBottom: 32,
    alignItems: "center",
  },
  headerBlock: {
    alignItems: "center",
    marginTop: 36,
    gap: 4,
  },
  title: {
    fontSize: 28,
    lineHeight: 36,
    fontWeight: "600",
    color: Colors.onSurface,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "600",
    color: Colors.gray,
    letterSpacing: 0.15,
    textAlign: "center",
  },
  formBlock: {
    width: "100%",
    marginTop: 32,
    gap: 14,
  },
  inputsGroup: {
    gap: 12,
  },
  errorBanner: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
    backgroundColor: "#fef2f2",
    borderWidth: 1,
    borderColor: "#fecaca",
  },
  errorText: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "500",
    color: "#dc2626",
  },
  forgotBtn: {
    alignSelf: "flex-end",
  },
  forgotText: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "600",
    color: Colors.secondary,
    letterSpacing: 0.1,
  },
  actionsBlock: {
    width: "100%",
    marginTop: 32,
    gap: 24,
    alignItems: "center",
  },
  footerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
  },
  footerText: {
    fontSize: 14,
    lineHeight: 20,
    color: Colors.gray,
    letterSpacing: 0.25,
  },
  footerLink: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "600",
    color: Colors.primary,
    letterSpacing: 0.1,
  },
});