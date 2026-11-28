import { Colors } from "@/constants/theme";
import { Image, ImageSource } from "expo-image";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const AVATAR_IMG = require("@/assets/images/profile/avatar-musa.png");
const VERIFIED_CHECK_ICON = require("@/assets/icons/verified-badge-check.svg");
const PERSON_ICON = require("@/assets/icons/person.svg");
const BOOKMARK_ICON = require("@/assets/icons/bookmark.svg");
const BELL_ICON = require("@/assets/icons/notifications.svg");
const GLOBE_ICON = require("@/assets/icons/globe.svg");
const HELP_ICON = require("@/assets/icons/help-question.svg");
const CHEVRON_RIGHT_ICON = require("@/assets/icons/chevron-right.svg");

interface ProfileMenuItem {
  id: string;
  label: string;
  icon: ImageSource;
  rightText?: string;
  showChevron: boolean;
}

const MENU_ITEMS: ProfileMenuItem[] = [
  {
    id: "personal-info",
    label: "Personal Information",
    icon: PERSON_ICON,
    showChevron: true,
  },
  {
    id: "saved-rooms",
    label: "Saved Cold Rooms",
    icon: BOOKMARK_ICON,
    showChevron: true,
  },
  {
    id: "notifications",
    label: "Notification Preferences",
    icon: BELL_ICON,
    showChevron: false,
  },
  {
    id: "language",
    label: "Language",
    icon: GLOBE_ICON,
    rightText: "English (EN)",
    showChevron: true,
  },
  {
    id: "help",
    label: "Help & Support",
    icon: HELP_ICON,
    showChevron: true,
  },
];

const UserProfileScreen = () => {
  return (
    <SafeAreaView edges={["top"]} style={styles.safeArea}>
      <StatusBar style="dark" />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.screenTitle}>Profile</Text>

        <View style={styles.profileSection}>
          <View style={styles.avatarWrap}>
            <Image
              source={AVATAR_IMG}
              contentFit="cover"
              style={styles.avatar}
            />
          </View>

          <View style={styles.profileCard}>
            <Text style={styles.userName}>Musa Danjuma</Text>
            <Text style={styles.userMeta}>
              Farmer & Produce Trader · Uyo, Akwa Ibom
            </Text>

            <View style={styles.verifiedBadge}>
              <View style={styles.verifiedIconCircle}>
                <Image
                  source={VERIFIED_CHECK_ICON}
                  contentFit="contain"
                  style={styles.verifiedCheck}
                />
              </View>
              <Text style={styles.verifiedLabel}>Verified Account</Text>
            </View>
          </View>
        </View>

        <View style={styles.menuList}>
          {MENU_ITEMS.map((item) => (
            <Pressable
              key={item.id}
              accessibilityRole="button"
              style={({ pressed }) => [
                styles.menuRow,
                pressed && styles.pressed,
              ]}
            >
              <View style={styles.menuLeft}>
                <Image
                  source={item.icon}
                  contentFit="contain"
                  style={styles.menuIcon}
                />
                <Text style={styles.menuLabel}>{item.label}</Text>
              </View>

              <View style={styles.menuRight}>
                {item.rightText ? (
                  <Text style={styles.rightValue}>{item.rightText}</Text>
                ) : null}
                {item.showChevron ? (
                  <Image
                    source={CHEVRON_RIGHT_ICON}
                    contentFit="contain"
                    style={styles.chevron}
                  />
                ) : null}
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default UserProfileScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.mintBg,
  },
  scrollContent: {
    paddingHorizontal: 19,
    paddingTop: 16,
    paddingBottom: 28,
    gap: 24,
  },
  screenTitle: {
    fontSize: 36,
    lineHeight: 44,
    fontWeight: "700",
    color: Colors.primary,
    textAlign: "center",
  },
  profileSection: {
    alignItems: "center",
    marginTop: 4,
  },
  avatarWrap: {
    zIndex: 2,
    marginBottom: -40,
  },
  avatar: {
    width: 140,
    height: 140,
    borderRadius: 70,
  },
  profileCard: {
    width: "100%",
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.profileBorder,
    borderRadius: 12,
    paddingTop: 52,
    paddingBottom: 18,
    paddingHorizontal: 16,
    alignItems: "center",
    gap: 10,
  },
  userName: {
    fontSize: 22,
    lineHeight: 28,
    fontWeight: "600",
    color: Colors.onPrimaryContainer,
    textAlign: "center",
  },
  userMeta: {
    fontSize: 15,
    lineHeight: 22,
    fontWeight: "600",
    color: Colors.onSurface,
    textAlign: "center",
  },
  verifiedBadge: {
    marginTop: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    backgroundColor: Colors.primaryContainer,
    height: 48,
    paddingHorizontal: 28,
    borderRadius: 999,
  },
  verifiedIconCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  verifiedCheck: {
    width: 14,
    height: 14,
  },
  verifiedLabel: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "600",
    color: Colors.primary,
    letterSpacing: 0.15,
  },
  menuList: {
    gap: 8,
  },
  menuRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 60,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.outlineVariant,
    paddingHorizontal: 16,
    backgroundColor: Colors.mintBg,
  },
  pressed: {
    opacity: 0.75,
  },
  menuLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  menuIcon: {
    width: 22,
    height: 22,
  },
  menuLabel: {
    fontSize: 17,
    lineHeight: 24,
    fontWeight: "600",
    color: Colors.gray,
  },
  menuRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  rightValue: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "600",
    color: Colors.gray,
  },
  chevron: {
    width: 20,
    height: 20,
  },
});
