import Button from "@/components/UI/Button";
import { Colors } from "@/constants/theme";
import { Image } from "expo-image";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const HERO_TOMATOES = require("@/assets/images/dashboard/hero-tomatoes.png");
const RIVERSIDE_IMG = require("@/assets/images/dashboard/cold-room-riverside.png");
const BELL_ICON = require("@/assets/icons/notifications.svg");
const SEARCH_ICON = require("@/assets/icons/search.svg");
const CALENDAR_ICON = require("@/assets/icons/calendar.svg");
const GUIDE_ICON = require("@/assets/icons/guide-book.svg");
const SUPPORT_ICON = require("@/assets/icons/support.svg");
const LOCATION_ICON = require("@/assets/icons/location.svg");
const STORAGE_ICON = require("@/assets/icons/storage.svg");

const DashboardScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <SafeAreaView edges={["top"]} style={styles.safeArea}>
      <StatusBar style="dark" />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.topRow}>
          <Pressable
            accessibilityLabel="Notifications"
            accessibilityRole="button"
            hitSlop={10}
            style={styles.bellButton}
          >
            <Image
              source={BELL_ICON}
              contentFit="contain"
              style={styles.bellIcon}
            />
          </Pressable>
        </View>

        <View style={styles.greetingBlock}>
          <Text style={styles.greetingTitle}>Hello Danjuma !</Text>
          <Text style={styles.greetingSubtitle}>
            Find available cold rooms near you and keep your produce fresh
            longer.
          </Text>
        </View>

        <View style={styles.heroCard}>
          <Image
            source={HERO_TOMATOES}
            contentFit="cover"
            style={StyleSheet.absoluteFill}
          />
          <View style={styles.heroCtaWrap}>
            <Button
              title="Find a Cold Room"
              onPress={() => router.push("/(root)/(tabs)/storage")}
              style={styles.heroButton}
              textStyle={styles.heroButtonText}
            />
          </View>
        </View>

        <View style={styles.searchBar}>
          <Image
            source={SEARCH_ICON}
            contentFit="contain"
            style={styles.searchIcon}
          />
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search by Location"
            placeholderTextColor={Colors.onSurfaceVariant}
            style={styles.searchInput}
          />
        </View>

        <View style={styles.quickActionsRow}>
          <Pressable
            accessibilityRole="button"
            onPress={() => router.push("/(root)/(tabs)/bookings")}
            style={({ pressed }) => [
              styles.quickCard,
              pressed && styles.pressed,
            ]}
          >
            <Image
              source={CALENDAR_ICON}
              contentFit="contain"
              style={styles.quickIcon}
            />
            <Text style={styles.quickLabel}>My Bookings</Text>
          </Pressable>

          <Pressable
            accessibilityRole="button"
            onPress={() => router.push("/(root)/(tabs)/storage")}
            style={({ pressed }) => [
              styles.quickCard,
              pressed && styles.pressed,
            ]}
          >
            <Image
              source={GUIDE_ICON}
              contentFit="contain"
              style={styles.quickIcon}
            />
            <Text style={styles.quickLabel}>Produce guide</Text>
          </Pressable>

          <Pressable
            accessibilityRole="button"
            onPress={() => router.push("/(root)/profile")}
            style={({ pressed }) => [
              styles.quickCard,
              pressed && styles.pressed,
            ]}
          >
            <Image
              source={SUPPORT_ICON}
              contentFit="contain"
              style={styles.quickIcon}
            />
            <Text style={styles.quickLabel}>Get Help</Text>
          </Pressable>
        </View>

        <View style={styles.sectionBlock}>
          <Text style={styles.sectionTitle}>Available Cold Rooms</Text>

          <View style={styles.roomCard}>
            <Image
              source={RIVERSIDE_IMG}
              contentFit="cover"
              style={styles.roomImage}
            />

            <View style={styles.roomDetails}>
              <Text style={styles.roomName}>Riverside Cold Storage</Text>

              <View style={styles.metaRow}>
                <Image
                  source={LOCATION_ICON}
                  contentFit="contain"
                  style={styles.metaIcon}
                />
                <Text style={styles.locationText}>
                  Port Harcourt, Rivers State
                </Text>
              </View>

              <View style={styles.statsRow}>
                <View style={styles.metaRow}>
                  <Image
                    source={STORAGE_ICON}
                    contentFit="contain"
                    style={styles.metaIcon}
                  />
                  <Text style={styles.capacityText}>50 tons</Text>
                </View>
                <Text style={styles.priceText}>N15,000/week</Text>
              </View>

              <Button
                title="Book Now"
                onPress={() => router.push("/(root)/(tabs)/bookings")}
                style={styles.bookButton}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.mintBg,
  },
  scrollContent: {
    paddingHorizontal: 18,
    paddingTop: 8,
    paddingBottom: 24,
    gap: 18,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  bellButton: {
    padding: 4,
  },
  bellIcon: {
    width: 24,
    height: 24,
  },
  greetingBlock: {
    gap: 6,
  },
  greetingTitle: {
    fontSize: 28,
    lineHeight: 36,
    fontWeight: "600",
    color: Colors.onSurface,
  },
  greetingSubtitle: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "600",
    color: Colors.onSurface,
    letterSpacing: 0.1,
  },
  heroCard: {
    height: 200,
    borderRadius: 12,
    overflow: "hidden",
    justifyContent: "flex-end",
    padding: 12,
  },
  heroCtaWrap: {
    alignSelf: "flex-start",
  },
  heroButton: {
    width: "auto",
    paddingHorizontal: 20,
  },
  heroButtonText: {
    fontWeight: "700",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    height: 58,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.outlineVariant,
    backgroundColor: Colors.surface,
    paddingHorizontal: 14,
    gap: 10,
  },
  searchIcon: {
    width: 22,
    height: 22,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontWeight: "600",
    color: Colors.onSurfaceVariant,
    letterSpacing: 0.15,
  },
  quickActionsRow: {
    flexDirection: "row",
    gap: 11,
  },
  quickCard: {
    flex: 1,
    height: 112,
    borderRadius: 16,
    backgroundColor: Colors.primaryContainer,
    borderWidth: 2,
    borderColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    paddingHorizontal: 6,
  },
  pressed: {
    opacity: 0.85,
  },
  quickIcon: {
    width: 24,
    height: 24,
  },
  quickLabel: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "600",
    color: Colors.secondary,
    textAlign: "center",
  },
  sectionBlock: {
    gap: 12,
  },
  sectionTitle: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "600",
    color: Colors.onPrimaryContainer,
    letterSpacing: 0.15,
  },
  roomCard: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },
  roomImage: {
    width: 138,
    height: 158,
    borderRadius: 8,
  },
  roomDetails: {
    flex: 1,
    gap: 10,
  },
  roomName: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "600",
    color: Colors.onSecondaryContainer,
    letterSpacing: 0.15,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  metaIcon: {
    width: 18,
    height: 18,
  },
  locationText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "600",
    color: Colors.onSecondary,
  },
  statsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  capacityText: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "600",
    color: Colors.onSecondaryContainer,
  },
  priceText: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "600",
    color: Colors.secondary,
  },
  bookButton: {
    alignSelf: "flex-end",
    width: 150,
    marginTop: 4,
  },
});
