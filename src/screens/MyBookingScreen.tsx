import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Calendar, Clock, MapPin, ChevronRight, History } from 'lucide-react-native';
import { Colors, Spacing } from '../theme/Theme';

const MyBookingScreen = ({ navigation }: any) => {
    const [activeTab, setActiveTab] = useState('upcoming');

    // Mock Data for Bookings
    const upcomingBookings = [
        {
            id: '1',
            type: 'KTV VIP',
            name: 'RUANG 102',
            date: '14 FEB 2026',
            time: '20:00 WIB',
            status: 'Terkonfirmasi',
            totalPrice: 1500000,
            imageUrl: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=1000'
        },
        {
            id: '2',
            type: 'MEJA',
            name: 'Meja Lounge 05',
            date: '20 FEB 2026',
            time: '21:30 WIB',
            status: 'Menunggu',
            totalPrice: 500000,
            imageUrl: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=1000'
        }
    ];

    const historyBookings = [
        {
            id: '3',
            type: 'KTV VIP',
            name: 'RUANG 105',
            date: '25 JAN 2026',
            time: '19:00 WIB',
            status: 'Selesai',
            totalPrice: 1200000,
            imageUrl: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=1000'
        },
        {
            id: '4',
            type: 'MEJA',
            name: 'VVIP Lounge',
            date: '10 JAN 2026',
            time: '22:00 WIB',
            status: 'Dibatalkan',
            totalPrice: 2500000,
            imageUrl: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=1000'
        }
    ];

    const currentBookings = activeTab === 'upcoming' ? upcomingBookings : historyBookings;

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <ArrowLeft size={24} color={Colors.text} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Jadwal Reservasi</Text>
                <View style={{ width: 40 }} />
            </View>

            {/* Tab Switcher */}
            <View style={styles.tabContainer}>
                <TouchableOpacity
                    style={[styles.tab, activeTab === 'upcoming' && styles.activeTab]}
                    onPress={() => setActiveTab('upcoming')}
                >
                    <Calendar size={18} color={activeTab === 'upcoming' ? Colors.primary : '#666'} />
                    <Text style={[styles.tabText, activeTab === 'upcoming' && styles.activeTabText]}>Mendatang</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tab, activeTab === 'history' && styles.activeTab]}
                    onPress={() => setActiveTab('history')}
                >
                    <History size={18} color={activeTab === 'history' ? Colors.primary : '#666'} />
                    <Text style={[styles.tabText, activeTab === 'history' && styles.activeTabText]}>Riwayat</Text>
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                {currentBookings.map((item) => (
                    <View key={item.id} style={styles.bookingCard}>
                        <View style={styles.cardHeader}>
                            <View style={styles.typeBadge}>
                                <Text style={styles.typeText}>{item.type}</Text>
                            </View>
                            <Text style={[
                                styles.statusText,
                                item.status === 'Terkonfirmasi' || item.status === 'Selesai' ? { color: '#4CAF50' } :
                                    item.status === 'Menunggu' ? { color: '#FF9800' } : { color: '#F44336' }
                            ]}>
                                {item.status}
                            </Text>
                        </View>

                        <Text style={styles.roomName}>{item.name}</Text>

                        <View style={styles.cardDivider} />

                        <View style={styles.infoRow}>
                            <View style={styles.infoItem}>
                                <Calendar size={14} color={Colors.primary} />
                                <Text style={styles.infoText}>{item.date}</Text>
                            </View>
                            <View style={styles.infoItem}>
                                <Clock size={14} color={Colors.primary} />
                                <Text style={styles.infoText}>{item.time}</Text>
                            </View>
                        </View>

                        <TouchableOpacity
                            style={styles.detailButton}
                            onPress={() => navigation.navigate('BookingDetail', { booking: { ...item, roomName: item.name } })}
                        >
                            <Text style={styles.detailButtonText}>Lihat Tiket</Text>
                            <ChevronRight size={16} color={Colors.primary} />
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: Spacing.md,
        paddingBottom: Spacing.md,
    },
    backButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
    },
    headerTitle: {
        color: Colors.text,
        fontSize: 18,
        fontWeight: 'bold',
    },
    tabContainer: {
        flexDirection: 'row',
        paddingHorizontal: Spacing.md,
        gap: 12,
        marginBottom: 20,
    },
    tab: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        height: 44,
        borderRadius: 12,
        backgroundColor: '#0A0A0A',
        borderWidth: 1,
        borderColor: '#1A1A1A',
    },
    activeTab: {
        borderColor: Colors.primary,
        backgroundColor: 'rgba(198, 162, 52, 0.05)',
    },
    tabText: {
        color: '#666',
        fontSize: 14,
        fontWeight: 'bold',
    },
    activeTabText: {
        color: Colors.primary,
    },
    scrollContent: {
        paddingHorizontal: Spacing.md,
        paddingBottom: 40,
    },
    bookingCard: {
        backgroundColor: Colors.card,
        borderRadius: 20,
        padding: 20,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#1A1A1A',
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    typeBadge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 6,
        backgroundColor: '#0D0D0D',
        borderWidth: 1,
        borderColor: '#333',
    },
    typeText: {
        color: Colors.textMuted,
        fontSize: 10,
        fontWeight: 'bold',
        letterSpacing: 1,
    },
    statusText: {
        fontSize: 12,
        fontWeight: 'bold',
    },
    roomName: {
        color: Colors.text,
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    cardDivider: {
        height: 1,
        backgroundColor: '#111',
        marginBottom: 16,
    },
    infoRow: {
        flexDirection: 'row',
        gap: 20,
        marginBottom: 20,
    },
    infoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    infoText: {
        color: Colors.text,
        fontSize: 14,
    },
    detailButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'rgba(198, 162, 52, 0.1)',
        padding: 12,
        borderRadius: 12,
    },
    detailButtonText: {
        color: Colors.primary,
        fontSize: 14,
        fontWeight: 'bold',
    },
});

export default MyBookingScreen;
