


import { Colors } from '@/constants/theme';
import { Image } from 'expo-image';
import { Tabs } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const TabsLayout = () => {
    const insets = useSafeAreaInsets();
    const bottomPadding = Math.max(insets.bottom, 10);

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
                    height: 70 + bottomPadding,
                    paddingBottom: bottomPadding,
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
                    tabBarIcon: ({ color, size }) => (
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
                    tabBarIcon: ({ color, size }) => (
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
                    tabBarIcon: ({ color, size }) => (
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
                    tabBarIcon: ({ color, size }) => (
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