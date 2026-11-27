


import { Colors } from '@/constants/theme';
import { Tabs } from 'expo-router';
import { Platform } from 'react-native';
import { Image } from "expo-image";


const TabsLayout = () => {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: Colors.primary,
                tabBarInactiveTintColor: Colors.gray,
                tabBarStyle: {
                    backgroundColor: Colors.surface,
                    borderTopWidth: 1,
                    borderTopColor: Colors.borderLight,
                    height: Platform.OS === 'ios' ? 84 : 64,
                    paddingBottom: Platform.OS === 'ios' ? 24 : 10,
                    paddingTop: 8,
                },
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: '600',
                },
            }}
        >
            <Tabs.Screen
                name="dashboard"
                options={{
                    title: 'Dashboard',
                    tabBarIcon: ({ color, size, focused }) => (
                        <Image
                            source={require('@/assets/icons/dashboard.svg')}
                            style={{ width: size, height: size, tintColor: color }}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="bookings"
                options={{
                    title: 'Bookings',
                    tabBarIcon: ({ color, size, focused }) => (
                        <Image
                            source={require('@/assets/icons/calendar.svg')}
                            style={{ width: size, height: size, tintColor: color }}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="storage"
                options={{
                    title: 'Storage',
                    tabBarIcon: ({ color, size, focused }) => (
                        <Image
                            source={require('@/assets/icons/storage.svg')}
                            style={{ width: size, height: size, tintColor: color }}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="more"
                options={{
                    title: 'More',
                    tabBarIcon: ({ color, size, focused }) => (
                        <Image
                            source={require('@/assets/icons/more.svg')}
                            style={{ width: size, height: size, tintColor: color }}
                        />
                    ),
                }}
            />
        </Tabs>
    );
};

export default TabsLayout;