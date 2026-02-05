import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Mic, Users, Plus, Calendar as CalendarIcon } from 'lucide-react-native';
import { Colors, Spacing } from '../theme/Theme';
import { bookingService } from '../services/bookingService';
import { useAuth } from '../context/AuthContext';
import { LinearGradient } from 'expo-linear-gradient';
import { ImageBackground } from 'react-native';
import GoldButton from '../components/GoldButton';
import SilverButton from '../components/SilverButton';

const { width } = Dimensions.get('window');

const RSVPScreen = ({ navigation }: any) => {
    const { user, isLoggedIn } = useAuth();
    const [ktvRooms, setKtvRooms] = React.useState<any[]>([]);
    const [loungeTables, setLoungeTables] = React.useState<any[]>([]);
    const [myBookings, setMyBookings] = React.useState<any[]>([]);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        const loadRSVPData = async () => {
            try {
                const [rooms, history] = await Promise.all([
                    bookingService.getRooms(),
                    isLoggedIn ? bookingService.getBookingHistory(user?.id || '') : Promise.resolve([])
                ]);
                setKtvRooms(rooms.filter((r: any) => r.type === 'KTV'));
                setLoungeTables(rooms.filter((r: any) => r.type === 'TABLE' || r.type === 'LOUNGE'));
                setMyBookings(history);
            } catch (error) {
                console.error('Failed to load RSVP data:', error);
            } finally {
                setIsLoading(false);
            }
        };
        loadRSVPData();
    }, [isLoggedIn, user]);

    if (isLoading) {
        return (
            <SafeAreaView style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                <Text style={{ color: Colors.primary }}>Memuat data...</Text>
            </SafeAreaView>
        );
    }
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

                {/* KTV Rooms Section */}
                <View style={styles.sectionHeaderRow}>
                    <View style={styles.sectionHeader}>
                        <LinearGradient
                            colors={Colors.goldGradient as any}
                            style={styles.headerIconBg}
                        >
                            <Users size={14} color="#000" />
                        </LinearGradient>
                        <Text style={styles.sectionTitle}>RUANG KTV TERSEDIA</Text>
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate('RoomList')}>
                        <Text style={styles.viewAllText}>Lihat Semua</Text>
                    </TouchableOpacity>
                </View>

                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
                    {ktvRooms.map((room) => (
                        <TouchableOpacity
                            key={room.id}
                            style={styles.roomCard}
                            onPress={() => navigation.navigate('BookingForm', { roomName: room.name })}
                        >
                            <Image source={{ uri: room.image || 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=1000' }} style={styles.roomImage} />

                            <LinearGradient
                                colors={Colors.silverGradient as any}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={styles.bookNowBadgeOverlay}
                            >
                                <Text style={styles.bookNowText}>PESAN SEKARANG</Text>
                            </LinearGradient>

                            <View style={styles.roomFooter}>
                                <View>
                                    <Text style={styles.roomName}>{room.name}</Text>
                                    <View style={styles.tagSilver}>
                                        <Text style={styles.tagTextSilver}>{room.pax || 'Tersedia'}</Text>
                                    </View>
                                </View>
                                <Text style={styles.roomPrice}>{room.price || room.status}</Text>
                            </View>

                            {/* Decorative Silver Footer */}
                            <LinearGradient
                                colors={Colors.silverGradient as any}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={styles.cardFooterLine}
                            />
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                {/* Lounge Tables Section */}
                <View style={styles.sectionHeaderRow}>
                    <View style={styles.sectionHeader}>
                        <LinearGradient
                            colors={Colors.goldGradient as any}
                            style={styles.headerIconBg}
                        >
                            <View style={styles.innerCircleGold} />
                        </LinearGradient>
                        <Text style={styles.sectionTitle}>MEJA LOUNGE TERSEDIA</Text>
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate('TableList')}>
                        <Text style={styles.viewAllText}>Lihat Semua</Text>
                    </TouchableOpacity>
                </View>

                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
                    {loungeTables.map((table) => (
                        <TouchableOpacity
                            key={table.id}
                            style={styles.roomCard}
                            onPress={() => navigation.navigate('BookingForm', { roomName: table.name })}
                        >
                            <Image source={{ uri: table.image || 'https://images.unsplash.com/photo-1574096079513-d8259312b785?q=80&w=1000' }} style={styles.roomImage} />

                            <LinearGradient
                                colors={Colors.silverGradient as any}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={styles.bookNowBadgeOverlay}
                            >
                                <Text style={styles.bookNowText}>AMANKAN MEJA</Text>
                            </LinearGradient>

                            <View style={styles.roomFooter}>
                                <View>
                                    <Text style={styles.roomName}>{table.name}</Text>
                                    <View style={styles.tagSilver}>
                                        <Text style={styles.tagTextSilver}>{table.pax || 'Tersedia'}</Text>
                                    </View>
                                </View>
                                <Text style={styles.roomPrice}>{table.price || table.status}</Text>
                            </View>

                            {/* Decorative Silver Footer */}
                            <LinearGradient
                                colors={Colors.silverGradient as any}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={styles.cardFooterLine}
                            />
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                <View style={styles.divider} />

                {/* My Upcoming Visits */}
                <View style={styles.visitsHeader}>
                    <Text style={styles.sectionTitleMain}>KUNJUNGAN MENDATANG</Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('BookingForm')}
                    >
                        <LinearGradient
                            colors={Colors.goldGradient as any}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.newBookingBadge}
                        >
                            <Plus size={14} color="#000" />
                            <Text style={styles.newBookingText}>PESAN BARU</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>

                {myBookings.length === 0 ? (
                    <View style={styles.visitsEmptyState}>
                        <CalendarIcon size={48} color="#2A2A2A" />
                        <Text style={styles.noBookingsHeadline}>Tidak ada jadwal pesanan.</Text>
                        <Text style={styles.noBookingsSubline}>Ayo buat rencana kunjungan Anda!</Text>
                    </View>
                ) : (
                    <View /> // Add list if data exists
                )}

                <View style={{ height: 100 }} />
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    scrollContent: {
        padding: Spacing.md,
    },
    sectionHeaderRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: Spacing.md,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    viewAllText: {
        color: Colors.primary,
        fontSize: 12,
        fontWeight: 'bold',
    },
    sectionTitle: {
        color: Colors.text,
        fontSize: 14,
        fontWeight: 'bold',
        letterSpacing: 1,
    },
    sectionTitleMain: {
        color: Colors.textMuted,
        fontSize: 14,
        fontWeight: 'bold',
        letterSpacing: 1,
    },
    horizontalScroll: {
        marginHorizontal: -Spacing.md,
        paddingLeft: Spacing.md,
        marginBottom: Spacing.xl,
    },
    roomCard: {
        width: width * 0.65,
        backgroundColor: Colors.card,
        borderRadius: 20,
        padding: 12,
        marginRight: 15,
        borderWidth: 1,
        borderColor: '#222',
    },
    roomImage: {
        width: '100%',
        height: 140,
        borderRadius: 15,
    },
    bookNowBadgeOverlay: {
        position: 'absolute',
        bottom: 80,
        left: 24,
        borderRadius: 6,
        overflow: 'hidden',
    },
    bookNowText: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        color: '#000',
        fontSize: 10,
        fontWeight: '900',
        letterSpacing: 1,
    },
    roomFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginTop: 12,
        paddingHorizontal: 4,
    },
    roomName: {
        color: Colors.text,
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 6,
    },
    tagSilver: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#333',
        alignSelf: 'flex-start',
    },
    tagTextSilver: {
        color: '#E0E0E0',
        fontSize: 10,
        fontWeight: 'bold',
    },
    roomPrice: {
        color: Colors.primary,
        fontSize: 13,
        fontWeight: 'bold',
    },
    headerIconBg: {
        width: 32,
        height: 32,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    innerCircleGold: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#000',
    },
    cardFooterLine: {
        height: 3,
        width: '100%',
        position: 'absolute',
        bottom: 0,
    },
    emptyStateCard: {
        backgroundColor: Colors.card,
        height: 100,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#222',
        borderStyle: 'dashed',
        marginBottom: Spacing.xl,
    },
    emptyStateText: {
        color: Colors.textMuted,
        fontSize: 12,
        fontWeight: 'bold',
        letterSpacing: 1,
    },
    divider: {
        height: 1,
        backgroundColor: '#111',
        marginVertical: Spacing.xl,
    },
    visitsHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: Spacing.xl,
    },
    newBookingBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 12,
    },
    newBookingText: {
        color: '#000',
        fontSize: 11,
        fontWeight: '900',
        letterSpacing: 0.5,
    },
    visitsEmptyState: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 40,
        backgroundColor: Colors.card,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#181818',
    },
    noBookingsHeadline: {
        color: Colors.textMuted,
        fontSize: 16,
        marginTop: 16,
        fontWeight: '500',
    },
    noBookingsSubline: {
        color: '#444',
        fontSize: 14,
        marginTop: 4,
    },
});

export default RSVPScreen;
