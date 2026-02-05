import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import MenuScreen from '../screens/MenuScreen';
import CartScreen from '../screens/CartScreen';
import NotificationScreen from '../screens/NotificationScreen';
import MenuDetailScreen from '../screens/MenuDetailScreen';
import EventDetailScreen from '../screens/EventDetailScreen';
import BookingFormScreen from '../screens/BookingFormScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import MyBookingScreen from '../screens/MyBookingScreen';
import BillInfoScreen from '../screens/BillInfoScreen';
import VoucherScreen from '../screens/VoucherScreen';
import MyBottlesScreen from '../screens/MyBottlesScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import SearchScreen from '../screens/SearchScreen';
import SuccessScreen from '../screens/SuccessScreen';
import RoomListScreen from '../screens/RoomListScreen';
import TableListScreen from '../screens/TableListScreen';
import TransactionHistoryScreen from '../screens/TransactionHistoryScreen';
import TransactionDetailScreen from '../screens/TransactionDetailScreen';
import BookingDetailScreen from '../screens/BookingDetailScreen';

import { useAuth } from '../context/AuthContext';
import { View, ActivityIndicator } from 'react-native';
import { Colors } from '../theme/Theme';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
    const { isLoggedIn, isLoading } = useAuth();

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' }}>
                <ActivityIndicator size="large" color={Colors.primary} />
            </View>
        );
    }

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                animation: 'slide_from_right',
            }}
        >
            <Stack.Screen name="Main" component={TabNavigator} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Menu" component={MenuScreen} />
            <Stack.Screen name="MenuDetail" component={MenuDetailScreen} />
            <Stack.Screen name="EventDetail" component={EventDetailScreen} />
            <Stack.Screen
                name="BookingForm"
                component={BookingFormScreen}
                options={{ animation: 'slide_from_bottom' }}
            />
            <Stack.Screen name="MyBooking" component={MyBookingScreen} />
            <Stack.Screen name="Cart" component={CartScreen} />
            <Stack.Screen name="Notification" component={NotificationScreen} />
            <Stack.Screen name="BillInfo" component={BillInfoScreen} />
            <Stack.Screen name="Voucher" component={VoucherScreen} />
            <Stack.Screen name="MyBottles" component={MyBottlesScreen} />
            <Stack.Screen name="EditProfile" component={EditProfileScreen} />
            <Stack.Screen name="Search" component={SearchScreen} />
            <Stack.Screen name="Success" component={SuccessScreen} />
            <Stack.Screen name="RoomList" component={RoomListScreen} />
            <Stack.Screen name="TableList" component={TableListScreen} />
            <Stack.Screen name="TransactionHistory" component={TransactionHistoryScreen} />
            <Stack.Screen
                name="TransactionDetail"
                component={TransactionDetailScreen}
                options={{ animation: 'slide_from_bottom' }}
            />
            <Stack.Screen name="BookingDetail" component={BookingDetailScreen} />
        </Stack.Navigator>
    );
};

export default RootNavigator;
