import { useAuth } from "@/contexts/AuthContext";
import { router, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../../components/UI/Button";
import IceVaultLogo from "../../components/UI/IceVaultLogo";
import { Colors } from "../../constants/theme";

const OTP_LENGTH = 6;
const RESEND_SECONDS = 24;

const OtpScreen = () => {
  const { email, fullName, devOtp: initialDevOtp } = useLocalSearchParams<{
    email?: string;
    fullName?: string;
    devOtp?: string;
  }>();
  const { verifyOtp, resendOtp, pendingEmail, user } = useAuth();

  const [digits, setDigits] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS);
  const [devOtp, setDevOtp] = useState(initialDevOtp ?? "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const inputRefs = useRef<(React.ComponentRef<typeof TextInput> | null)[]>(
    [],
  );

  const targetEmail = email ?? pendingEmail ?? "";
  const isCodeComplete = digits.every((digit) => digit.length === 1);

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [secondsLeft]);

  const handleChange = (text: string, index: number) => {
    if (errorMessage) setErrorMessage(null);

    const cleaned = text.replace(/[^0-9]/g, "");
    const nextDigits = [...digits];

    if (cleaned.length > 1) {
      cleaned
        .slice(0, OTP_LENGTH - index)
        .split("")
        .forEach((char, offset) => {
          nextDigits[index + offset] = char;
        });
      setDigits(nextDigits);
      const nextFocus = Math.min(index + cleaned.length, OTP_LENGTH - 1);
      inputRefs.current[nextFocus]?.focus();
      return;
    }

    nextDigits[index] = cleaned;
    setDigits(nextDigits);
    if (cleaned && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === "Backspace" && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    setErrorMessage(null);
    const code = digits.join("");

    if (code.length !== OTP_LENGTH) {
      setErrorMessage("Please enter the complete 6-digit code.");
      return;
    }

    try {
      setIsSubmitting(true);
      const session = await verifyOtp(code, targetEmail);

      router.replace({
        pathname: "/(auth)/verification",
        params: {
          fullName: fullName || session.user.fullName || "Musa Danjuma",
        },
      });
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Invalid verification code.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResend = async () => {
    if (secondsLeft > 0 || isResending) return;
    setErrorMessage(null);

    try {
      setIsResending(true);
      const result = await resendOtp(targetEmail);

      if (result.devOtp) {
        setDevOtp(result.devOtp);
      }

      setDigits(Array(OTP_LENGTH).fill(""));
      setSecondsLeft(RESEND_SECONDS);
      inputRefs.current[0]?.focus();
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Could not resend code.",
      );
    } finally {
      setIsResending(false);
    }
  };

  const formatTimer = (sec: number) => `00:${sec.toString().padStart(2, "0")}`;

  const renderBox = (index: number) => (
    <TextInput
      key={index}
      ref={(el) => {
        inputRefs.current[index] = el;
      }}
      value={digits[index]}
      onChangeText={(text) => handleChange(text, index)}
      onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent.key, index)}
      keyboardType="number-pad"
      maxLength={OTP_LENGTH}
      textAlign="center"
      selectTextOnFocus
      style={styles.otpBox}
    />
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.container}
      >
        <IceVaultLogo variant="compact" />

        <View style={styles.contentBlock}>
          <View style={styles.codeSection}>
            <Text style={styles.prompt}>Enter the 6-digit code</Text>
            {targetEmail ? (
              <Text style={styles.emailSubtitle}>Sent to {targetEmail}</Text>
            ) : null}

            <View style={styles.otpRow}>
              <View style={styles.otpGroup}>{[0, 1, 2].map(renderBox)}</View>
              <Text style={styles.dash}>-</Text>
              <View style={styles.otpGroup}>{[3, 4, 5].map(renderBox)}</View>
            </View>

            {devOtp ? (
              <View style={styles.devOtpBadge}>
                <Text style={styles.devOtpText}>Dev OTP: {devOtp}</Text>
              </View>
            ) : null}

            {errorMessage ? (
              <Text style={styles.errorText}>{errorMessage}</Text>
            ) : null}
          </View>

          <View style={styles.bottomSection}>
            <Pressable
              disabled={secondsLeft > 0 || isResending}
              onPress={handleResend}
              style={styles.resendWrap}
            >
              <Text style={styles.resendText}>
                {secondsLeft > 0 ? (
                  <>
                    Resend code in{" "}
                    <Text style={styles.timerHighlight}>
                      {formatTimer(secondsLeft)}
                    </Text>
                  </>
                ) : (
                  <Text style={styles.timerHighlight}>
                    {isResending ? "Sending..." : "Resend code"}
                  </Text>
                )}
              </Text>
            </Pressable>

            <Button
              title={isSubmitting ? "Verifying..." : "Verify"}
              disabled={!isCodeComplete || isSubmitting}
              onPress={handleVerify}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default OtpScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.mintBg,
  },
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 26,
    paddingTop: 44,
  },
  contentBlock: {
    width: "100%",
    marginTop: 56,
    gap: 44,
  },
  codeSection: {
    alignItems: "center",
    gap: 20,
  },
  prompt: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "600",
    color: Colors.onSurface,
    letterSpacing: 0.15,
    textAlign: "center",
  },
  emailSubtitle: {
    fontSize: 13,
    lineHeight: 18,
    color: Colors.gray,
    marginTop: -12,
    textAlign: "center",
  },
  otpRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
  },
  otpGroup: {
    flexDirection: "row",
    gap: 7,
  },
  otpBox: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: Colors.otpBox,
    fontSize: 20,
    fontWeight: "600",
    color: Colors.onSurface,
  },
  dash: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "600",
    color: "#000000",
  },
  devOtpBadge: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  devOtpText: {
    fontSize: 13,
    fontWeight: "600",
    color: Colors.primary,
    letterSpacing: 1,
  },
  errorText: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "500",
    color: "#dc2626",
    textAlign: "center",
  },
  bottomSection: {
    gap: 40,
    alignItems: "center",
    paddingBottom: 20,
  },
  resendWrap: {
    padding: 8,
  },
  resendText: {
    fontSize: 14,
    lineHeight: 20,
    color: Colors.onPrimaryContainer,
    letterSpacing: 0.1,
    textAlign: "center",
  },
  timerHighlight: {
    fontWeight: "700",
    color: Colors.primary,
  },
});