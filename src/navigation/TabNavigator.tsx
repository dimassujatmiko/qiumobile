import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Home, Calendar, QrCode, Ticket, User } from 'lucide-react-native';
import { Colors } from '../theme/Theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Screens (we'll create these next)
import HomeScreen from '../screens/HomeScreen';
import RSVPScreen from '../screens/RSVPScreen';
import EventsScreen from '../screens/EventsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import QRScreen from '../screens/QRScreen';

const Tab = createBottomTabNavigator();

const CustomTabBarButton = ({ children, onPress }: any) => (
    <TouchableOpacity
        style={styles.customButtonContainer}
        onPress={onPress}
        activeOpacity={0.8}
    >
        <View style={styles.customButton}>
            {children}
        </View>
    </TouchableOpacity>
);

const TabNavigator = () => {
    const insets = useSafeAreaInsets();

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: [
                    styles.tabBar,
                    {
                        height: 65 + insets.bottom,
                        paddingBottom: insets.bottom > 0 ? insets.bottom - 5 : 10
                    }
                ],
                tabBarActiveTintColor: Colors.primary,
                tabBarInactiveTintColor: Colors.textMuted,
                tabBarLabelStyle: styles.tabBarLabel,
            }}
        >
            <Tab.Screen
                name="Beranda"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ color }) => <Home size={24} color={color} />,
                }}
            />
            <Tab.Screen
                name="RSVP"
                component={RSVPScreen}
                options={{
                    tabBarIcon: ({ color }) => <Calendar size={24} color={color} />,
                }}
            />
            <Tab.Screen
                name="QR"
                component={QRScreen}
                options={{
                    tabBarIcon: ({ color }) => <QrCode size={30} color={Colors.background} />,
                    tabBarButton: (props) => (
                        <CustomTabBarButton {...props}>
                            <QrCode size={30} color={Colors.background} />
                        </CustomTabBarButton>
                    ),
                    tabBarLabel: 'QR',
                    tabBarStyle: { display: 'none' } // Hide tab bar on QR screen if wanted, or keep it. Let's keep simpler logic for now by NOT hiding it, or maybe hiding it is better.
                }}
            />
            <Tab.Screen
                name="Acara"
                component={EventsScreen}
                options={{
                    tabBarIcon: ({ color }) => <Ticket size={24} color={color} />,
                }}
            />
            <Tab.Screen
                name="Profil"
                component={ProfileScreen}
                options={{
                    tabBarIcon: ({ color }) => <User size={24} color={color} />,
                }}
            />
        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    tabBar: {
        backgroundColor: 'rgba(10, 10, 10, 0.95)',
        borderTopWidth: 0,
        position: 'absolute',
        borderTopColor: 'transparent',
        elevation: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    tabBarLabel: {
        fontSize: 10,
        fontWeight: '600',
    },
    customButtonContainer: {
        top: -20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    customButton: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 5,
    },
});

export default TabNavigator;
