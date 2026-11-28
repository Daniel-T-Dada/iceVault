import Button from "@/components/UI/Button";
import { useAuth } from "@/contexts/AuthContext";
import { SignUpPayload, UserRole } from "@/types/auth";
import { Image } from "expo-image";
import { Link, router, type Href } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
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
import SocialAuthButtons from "../../components/UI/SocialAuthButtons";
import { Colors } from "../../constants/theme";

interface SignUpFormState extends SignUpPayload {
  agreed: boolean;
}

const INITIAL_FORM_STATE: SignUpFormState = {
  fullName: "",
  phoneNumber: "",
  email: "",
  password: "",
  role: "farmer",
  agreed: true,
};

const ARROW_BACK_ICON = require("@/assets/icons/arrow-back.svg");
const PERSON_ICON = require("../../assets/icons/person.svg");
const PHONE_ICON = require("../../assets/icons/phone.svg");
const EMAIL_ICON = require("../../assets/icons/email.svg");
const LOCK_ICON = require("../../assets/icons/lock.svg");
const ADD_ICON = require("../../assets/icons/add.svg");

const ROLE_OPTIONS: { label: string; value: UserRole }[] = [
  { label: "Farmer/trader", value: "farmer" },
  { label: "Attendant", value: "attendant" },
  { label: "Operator", value: "operator" },
];

const SignUpScreen = () => {
  const { signUp } = useAuth();

  const [form, setForm] = useState<SignUpFormState>(INITIAL_FORM_STATE);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const updateField = <K extends keyof SignUpFormState>(
    key: K,
    value: SignUpFormState[K],
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errorMessage) setErrorMessage(null);
  };

  const handleRegister = async () => {
    setErrorMessage(null);

    const trimmedName = form.fullName.trim();
    const trimmedPhone = form.phoneNumber.trim();
    const normalizedEmail = form.email.trim().toLowerCase();

    if (!trimmedName || !trimmedPhone || !normalizedEmail || !form.password) {
      setErrorMessage("Please fill in all fields to create your account.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(normalizedEmail)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    if (form.password.length < 6) {
      setErrorMessage("Password must be at least 6 characters.");
      return;
    }

    if (!form.agreed) {
      setErrorMessage(
        "Please agree to the Terms & Conditions and Privacy Policy.",
      );
      return;
    }

    try {
      setIsSubmitting(true);

      const { devOtp } = await signUp({
        fullName: trimmedName,
        phoneNumber: trimmedPhone,
        email: normalizedEmail,
        password: form.password,
        role: form.role,
      });

      router.push({
        pathname: "/(auth)/otp",
        params: {
          email: normalizedEmail,
          fullName: trimmedName,
          devOtp: devOtp ?? "",
        },
      });
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Failed to create account.",
      );
    } finally {
      setIsSubmitting(false);
    }
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
          <Pressable
            accessibilityLabel="Go back"
            accessibilityRole="button"
            hitSlop={12}
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <Image
              source={ARROW_BACK_ICON}
              contentFit="contain"
              style={styles.backIcon}
            />
          </Pressable>

          <View style={styles.headerBlock}>
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>Join Ice Vault today</Text>
          </View>

          <View style={styles.roleRow}>
            {ROLE_OPTIONS.map((option) => {
              const isSelected = form.role === option.value;
              return (
                <Pressable
                  key={option.value}
                  accessibilityRole="button"
                  onPress={() => updateField("role", option.value)}
                  style={[
                    styles.rolePill,
                    isSelected ? styles.rolePillActive : styles.rolePillInactive,
                  ]}
                >
                  <Text
                    style={[
                      styles.roleText,
                      isSelected && styles.roleTextActive,
                    ]}
                  >
                    {option.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          <View style={styles.inputsGroup}>
            <AuthInput
              icon={PERSON_ICON}
              placeholder="Full Name"
              value={form.fullName}
              onChangeText={(value) => updateField("fullName", value)}
              autoCapitalize="words"
              backgroundColor={Colors.surfaceLow}
            />
            <AuthInput
              icon={PHONE_ICON}
              placeholder="Phone Number"
              value={form.phoneNumber}
              onChangeText={(value) => updateField("phoneNumber", value)}
              keyboardType="phone-pad"
              backgroundColor={Colors.surfaceLow}
            />
            <AuthInput
              icon={EMAIL_ICON}
              placeholder="Email Address"
              value={form.email}
              onChangeText={(value) => updateField("email", value)}
              keyboardType="email-address"
              autoCapitalize="none"
              backgroundColor={Colors.surfaceLow}
            />
            <AuthInput
              icon={LOCK_ICON}
              placeholder="Password"
              value={form.password}
              onChangeText={(value) => updateField("password", value)}
              secureTextEntry
              backgroundColor={Colors.surfaceLow}
            />
          </View>

          {errorMessage ? (
            <View style={styles.errorBanner}>
              <Text style={styles.errorText}>{errorMessage}</Text>
            </View>
          ) : null}

          <Pressable
            accessibilityRole="checkbox"
            accessibilityState={{ checked: form.agreed }}
            onPress={() => updateField("agreed", !form.agreed)}
            style={styles.termsRow}
          >
            <View
              style={[styles.checkbox, form.agreed && styles.checkboxChecked]}
            >
              {form.agreed ? <Text style={styles.checkmark}>✓</Text> : null}
            </View>
            <Text style={styles.termsText}>
              I agree to the{" "}
              <Text style={styles.termsLink}>
                <Link href={"#/terms" as Href}>Terms & Condition</Link> and{" "}
                <Link href={"#/privacy" as Href}>privacy policy</Link>
              </Text>
            </Text>
          </Pressable>

          <View style={styles.registerWrap}>
            <Button
              title={isSubmitting ? "Registering..." : "Register Account"}
              size="large"
              disabled={!form.agreed || isSubmitting}
              leftIcon={
                <Image
                  source={ADD_ICON}
                  contentFit="contain"
                  style={styles.addIcon}
                />
              }
              onPress={handleRegister}
            />
          </View>

          <View style={styles.socialWrap}>
            <SocialAuthButtons variant="pill" />
          </View>

          <View style={styles.footerRow}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <Pressable
              accessibilityRole="button"
              hitSlop={8}
              onPress={() => router.replace("/(auth)/sign-in")}
            >
              <Text style={styles.footerLink}>Sign in</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignUpScreen;

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
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 28,
  },
  backButton: {
    alignSelf: "flex-start",
    padding: 4,
    marginBottom: 16,
  },
  backIcon: {
    width: 24,
    height: 24,
  },
  headerBlock: {
    gap: 4,
  },
  title: {
    fontSize: 36,
    lineHeight: 44,
    fontWeight: "700",
    color: Colors.onSurface,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "600",
    color: Colors.onSurface,
    letterSpacing: 0.15,
  },
  roleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 28,
  },
  rolePill: {
    height: 46,
    paddingHorizontal: 16,
    borderRadius: 999,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  rolePillActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  rolePillInactive: {
    backgroundColor: Colors.mintBg,
    borderColor: Colors.outline,
  },
  roleText: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "500",
    color: Colors.onSurface,
    letterSpacing: 0.1,
  },
  roleTextActive: {
    color: Colors.onPrimary,
    fontWeight: "600",
  },
  inputsGroup: {
    marginTop: 24,
    gap: 12,
  },
  errorBanner: {
    marginTop: 14,
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
  termsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginTop: 20,
    paddingHorizontal: 8,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.surface,
  },
  checkboxChecked: {
    backgroundColor: Colors.primary,
  },
  checkmark: {
    color: Colors.onPrimary,
    fontSize: 14,
    fontWeight: "700",
    lineHeight: 16,
  },
  termsText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "600",
    color: Colors.onSurface,
    letterSpacing: 0.1,
  },
  termsLink: {
    color: Colors.secondary,
  },
  registerWrap: {
    marginTop: 24,
  },
  addIcon: {
    width: 22,
    height: 22,
  },
  socialWrap: {
    marginTop: 24,
  },
  footerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  footerText: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "600",
    color: Colors.gray,
    letterSpacing: 0.1,
  },
  footerLink: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "500",
    color: Colors.primary,
    letterSpacing: 0.1,
  },
});