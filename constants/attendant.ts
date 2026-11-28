


import { Colors } from "@/constants/theme";
import type {
    BookingRecord,
    FilterOption,
} from "@/components/dashboards/attendant/bookings/types";
import type { DailyBookingStat } from "@/components/dashboards/attendant/home/BookingActivityChartCard";
import type { FloorActivityEvent } from "@/components/dashboards/attendant/home/FloorActivityCard";
import type { RecentBookingEvent } from "@/components/dashboards/attendant/home/RecentBookingActivityCard";
import type { StatCardItem } from "@/components/dashboards/attendant/home/StatCard";

export const ATTENDANT_HUB_NAME = "Kano Fresh Hub";

export const ATTENDANT_STORAGE_CAPACITY = {
    occupied: 864,
    available: 336,
    total: 1200,
    unit: "crates",
} as const;

export const ATTENDANT_STATS: StatCardItem[] = [
    {
        id: "total-bookings",
        label: "Total bookings",
        value: "128",
        subtext: "12% vs last month",
        subtextColor: Colors.primary,
    },
    {
        id: "pending-checkins",
        label: "Pending check-ins",
        value: "08",
        subtext: "3 arriving today",
        labelColor: "#d97706",
    },
    {
        id: "active-storage",
        label: "Active storage",
        value: "86",
        subtext: "72% of capacity",
    },
    {
        id: "completed-checkouts",
        label: "Completed check-outs",
        value: "34",
        subtext: "8 this week",
        subtextColor: Colors.primary,
    },
];

export const WEEKLY_BOOKING_ACTIVITY: DailyBookingStat[] = [
    { day: "Mon", arrivals: 14, checkOuts: 8 },
    { day: "Tue", arrivals: 18, checkOuts: 11 },
    { day: "Wed", arrivals: 12, checkOuts: 7 },
    { day: "Thu", arrivals: 21, checkOuts: 10 },
    { day: "Fri", arrivals: 16, checkOuts: 9 },
    { day: "Sat", arrivals: 26, checkOuts: 14 },
    { day: "Sun", arrivals: 20, checkOuts: 12 },
];

export const RECENT_BOOKING_EVENTS: RecentBookingEvent[] = [
    {
        id: "bk-1",
        type: "received",
        title: "New booking received",
        farmerName: "Amina Yusuf",
        bookingCode: "IV-24083",
        timestamp: "09:12",
    },
    {
        id: "bk-2",
        type: "confirmed",
        title: "Booking confirmed",
        farmerName: "Chinedu Okafor",
        bookingCode: "IV-24082",
        timestamp: "08:45",
    },
    {
        id: "bk-3",
        type: "checkout",
        title: "Check-out completed",
        farmerName: "Emmanuel Adeyemi",
        bookingCode: "IV-24075",
        timestamp: "Yesterday",
    },
];

export const FLOOR_ACTIVITY_EVENTS: FloorActivityEvent[] = [
    {
        id: "fl-1",
        type: "checked_in",
        title: "Produce checked in",
        subtitle: "24 crates · Chiller B, Row 02",
        timestamp: "10:04",
    },
    {
        id: "fl-2",
        type: "checkout_ready",
        title: "Check-out ready",
        subtitle: "24 crates · Chiller B, Row 02",
        timestamp: "08:21",
    },
    {
        id: "fl-3",
        type: "quantity_review",
        title: "Quantity review pending",
        subtitle: "IV-24081 · 4-crate difference",
        timestamp: "07:55",
    },
];

export const ATTENDANT_BOOKINGS: BookingRecord[] = [
    {
        id: "1",
        bookingCode: "IV-24083",
        farmerName: "Amina Yusuf",
        phoneNumber: "0803 214 8871",
        produce: "Tomatoes",
        crates: 48,
        expectedDate: "22 Nov",
        expectedTime: "09:30",
        status: "pending_checkin",
    },
    {
        id: "2",
        bookingCode: "IV-24082",
        farmerName: "Chinedu Okafor",
        phoneNumber: "0805 662 1044",
        produce: "Peppers",
        crates: 24,
        expectedDate: "22 Nov",
        expectedTime: "08:15",
        status: "in_storage",
    },
    {
        id: "3",
        bookingCode: "IV-24079",
        farmerName: "Fatima Bello",
        phoneNumber: "0810 449 2390",
        produce: "Carrots",
        crates: 36,
        expectedDate: "21 Nov",
        expectedTime: "16:45",
        status: "in_storage",
    },
    {
        id: "4",
        bookingCode: "IV-24076",
        farmerName: "Emmanuel Adeyemi",
        phoneNumber: "0706 281 7762",
        produce: "Greens",
        crates: 18,
        expectedDate: "21 Nov",
        expectedTime: "12:20",
        status: "pending_checkout",
    },
    {
        id: "5",
        bookingCode: "IV-24071",
        farmerName: "Hauwa Abdullahi",
        phoneNumber: "0802 990 4421",
        produce: "Mangoes",
        crates: 60,
        expectedDate: "20 Nov",
        expectedTime: "14:00",
        status: "in_storage",
    },
    {
        id: "6",
        bookingCode: "IV-24068",
        farmerName: "Babatunde Akinyemi",
        phoneNumber: "0814 321 5608",
        produce: "Cucumbers",
        crates: 30,
        expectedDate: "20 Nov",
        expectedTime: "10:30",
        status: "checked_out",
    },
];

export const BOOKING_DATE_OPTIONS: FilterOption[] = [
    { label: "All dates", value: "all" },
    { label: "22 Nov", value: "22 Nov" },
    { label: "21 Nov", value: "21 Nov" },
    { label: "20 Nov", value: "20 Nov" },
];

export const BOOKING_STATUS_OPTIONS: FilterOption[] = [
    { label: "All statuses", value: "all" },
    { label: "Pending check-in", value: "pending_checkin" },
    { label: "In storage", value: "in_storage" },
    { label: "Pending checkout", value: "pending_checkout" },
    { label: "Checked Out", value: "checked_out" },
];