import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Share } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Calendar, Clock, MapPin, Users, Info, Receipt, Share2, Download, Copy, CheckCircle2 } from 'lucide-react-native';
import { Colors, Spacing } from '../theme/Theme';
import { LinearGradient } from 'expo-linear-gradient';

const BookingDetailScreen = ({ route, navigation }: any) => {
    // Mock data for a booking, can be passed via route params
    const booking = route.params?.booking || {
        id: 'QQ-882910',
        roomName: 'KTV VIP Emerald',
        date: '06 Februari 2026',
        time: '20:00 - 23:00',
        pax: '10-12 Orang',
        status: 'Confirmed',
        totalPrice: 1500000,
        type: 'KTV',
        imageUrl: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=1000'
    };

    const formatCurrency = (amount: number) => {
        if (amount === undefined || amount === null) return 'Rp 0';
        return 'Rp ' + amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };

    const handleShare = async () => {
        try {
            await Share.share({
                message: `Konfirmasi Booking Qiu Qiu: ${booking.roomName} pada ${booking.date} jam ${booking.time}. Kode Booking: ${booking.id}`,
            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#1A1A1A', '#000000']}
                style={StyleSheet.absoluteFill}
            />

            <SafeAreaView style={{ flex: 1 }}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                        <ArrowLeft size={24} color={Colors.text} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Rincian Reservasi</Text>
                    <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
                        <Share2 size={22} color={Colors.primary} />
                    </TouchableOpacity>
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                    {/* Status Card */}
                    <View style={styles.statusCard}>
                        <View style={styles.statusBadge}>
                            <CheckCircle2 size={16} color="#4CAF50" />
                            <Text style={styles.statusText}>PESANAN DIKONFIRMASI</Text>
                        </View>
                        <Text style={styles.bookingIdLabel}>KODE BOOKING</Text>
                        <View style={styles.idContainer}>
                            <Text style={styles.bookingIdValue}>{booking.id}</Text>
                            <TouchableOpacity>
                                <Copy size={16} color={Colors.primary} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Booking Image/Info */}
                    <View style={styles.infoSection}>
                        <Image source={{ uri: booking.imageUrl }} style={styles.roomImage} />
                        <View style={styles.roomInfoOverlay}>
                            <LinearGradient
                                colors={['transparent', 'rgba(0,0,0,0.9)']}
                                style={[StyleSheet.absoluteFill, { borderRadius: 20 }]}
                            />
                            <View style={styles.roomTextContainer}>
                                <Text style={styles.roomTypeLabel}>{booking.type} ROOM</Text>
                                <Text style={styles.roomNameValue}>{booking.roomName}</Text>
                            </View>
                        </View>
                    </View>

                    {/* Schedule Details */}
                    <View style={styles.detailCard}>
                        <View style={styles.detailRow}>
                            <View style={styles.iconCircle}>
                                <Calendar size={20} color={Colors.primary} />
                            </View>
                            <View style={styles.detailTextContainer}>
                                <Text style={styles.detailLabel}>TANGGAL KUNJUNGAN</Text>
                                <Text style={styles.detailValue}>{booking.date}</Text>
                            </View>
                        </View>

                        <View style={styles.divider} />

                        <View style={styles.detailRow}>
                            <View style={styles.iconCircle}>
                                <Clock size={20} color={Colors.primary} />
                            </View>
                            <View style={styles.detailTextContainer}>
                                <Text style={styles.detailLabel}>WAKTU RESERVASI</Text>
                                <Text style={styles.detailValue}>{booking.time}</Text>
                            </View>
                        </View>

                        <View style={styles.divider} />

                        <View style={styles.detailRow}>
                            <View style={styles.iconCircle}>
                                <Users size={20} color={Colors.primary} />
                            </View>
                            <View style={styles.detailTextContainer}>
                                <Text style={styles.detailLabel}>UKURAN GRUP</Text>
                                <Text style={styles.detailValue}>{booking.pax}</Text>
                            </View>
                        </View>
                    </View>

                    {/* Payment Summary */}
                    <View style={styles.summaryCard}>
                        <View style={styles.summaryHeader}>
                            <Receipt size={18} color={Colors.primary} />
                            <Text style={styles.summaryTitle}>RINGKASAN PEMBAYARAN</Text>
                        </View>

                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryLabel}>Biaya Kamar ({booking.type})</Text>
                            <Text style={styles.summaryValue}>{formatCurrency(booking.totalPrice)}</Text>
                        </View>

                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryLabel}>Biaya Layanan & Pajak</Text>
                            <Text style={styles.summaryValue}>Sudah Termasuk</Text>
                        </View>

                        <View style={styles.totalRow}>
                            <Text style={styles.totalLabel}>TOTAL BAYAR</Text>
                            <Text style={styles.totalValue}>{formatCurrency(booking.totalPrice)}</Text>
                        </View>
                    </View>

                    {/* Notice */}
                    <View style={styles.noticeContainer}>
                        <Info size={18} color="#C6A234" />
                        <Text style={styles.noticeText}>
                            Mohon tunjukkan Kode Booking di atas kepada resepsionis kami saat Anda tiba di lokasi.
                        </Text>
                    </View>

                    {/* Footer Actions */}
                    <View style={styles.footerActions}>
                        <TouchableOpacity style={styles.downloadBtn}>
                            <Download size={20} color={Colors.text} />
                            <Text style={styles.footerActionText}>Simpan PDF</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.helpBtn}>
                            <Text style={styles.helpText}>Butuh Bantuan?</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ height: 40 }} />
                </ScrollView>
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.sm,
    },
    backButton: {
        padding: 8,
    },
    headerTitle: {
        color: Colors.text,
        fontSize: 16,
        fontWeight: 'bold',
        letterSpacing: 1,
    },
    shareButton: {
        padding: 8,
    },
    scrollContent: {
        padding: Spacing.md,
    },
    statusCard: {
        backgroundColor: Colors.card,
        borderRadius: 20,
        padding: 24,
        alignItems: 'center',
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#222',
    },
    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        backgroundColor: 'rgba(76, 175, 80, 0.1)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
        marginBottom: 20,
    },
    statusText: {
        color: '#4CAF50',
        fontSize: 11,
        fontWeight: '900',
        letterSpacing: 1,
    },
    bookingIdLabel: {
        color: Colors.textMuted,
        fontSize: 10,
        fontWeight: 'bold',
        letterSpacing: 1.5,
        marginBottom: 8,
    },
    idContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    bookingIdValue: {
        color: Colors.text,
        fontSize: 28,
        fontWeight: '900',
        letterSpacing: 2,
    },
    infoSection: {
        height: 200,
        borderRadius: 24,
        overflow: 'hidden',
        marginBottom: 20,
        position: 'relative',
    },
    roomImage: {
        width: '100%',
        height: '100%',
    },
    roomInfoOverlay: {
        padding: 20,
        justifyContent: 'flex-end',
    },
    roomTextContainer: {
        zIndex: 1,
    },
    roomTypeLabel: {
        color: Colors.primary,
        fontSize: 11,
        fontWeight: '900',
        letterSpacing: 1,
        marginBottom: 4,
    },
    roomNameValue: {
        color: '#FFF',
        fontSize: 22,
        fontWeight: 'bold',
    },
    detailCard: {
        backgroundColor: Colors.card,
        borderRadius: 24,
        padding: 24,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#222',
    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    iconCircle: {
        width: 44,
        height: 44,
        borderRadius: 12,
        backgroundColor: 'rgba(198, 162, 52, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    detailTextContainer: {
        flex: 1,
    },
    detailLabel: {
        color: Colors.textMuted,
        fontSize: 10,
        fontWeight: 'bold',
        letterSpacing: 1,
        marginBottom: 4,
    },
    detailValue: {
        color: Colors.text,
        fontSize: 15,
        fontWeight: '600',
    },
    divider: {
        height: 1,
        backgroundColor: '#1A1A1A',
        marginVertical: 16,
    },
    summaryCard: {
        backgroundColor: 'rgba(255, 255, 255, 0.02)',
        borderRadius: 24,
        padding: 24,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#222',
    },
    summaryHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginBottom: 20,
        paddingBottom: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#1A1A1A',
    },
    summaryTitle: {
        color: Colors.text,
        fontSize: 13,
        fontWeight: 'bold',
        letterSpacing: 1,
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    summaryLabel: {
        color: Colors.textMuted,
        fontSize: 13,
    },
    summaryValue: {
        color: Colors.text,
        fontSize: 13,
        fontWeight: 'bold',
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 8,
        paddingTop: 16,
        borderTopWidth: 1,
        borderTopColor: '#1A1A1A',
    },
    totalLabel: {
        color: Colors.text,
        fontSize: 14,
        fontWeight: 'bold',
    },
    totalValue: {
        color: '#4CAF50',
        fontSize: 20,
        fontWeight: '900',
    },
    noticeContainer: {
        flexDirection: 'row',
        gap: 12,
        backgroundColor: 'rgba(198, 162, 52, 0.05)',
        padding: 16,
        borderRadius: 16,
        marginBottom: 30,
        borderWidth: 1,
        borderColor: 'rgba(198, 162, 52, 0.1)',
    },
    noticeText: {
        flex: 1,
        color: Colors.textMuted,
        fontSize: 12,
        lineHeight: 18,
    },
    footerActions: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    downloadBtn: {
        flex: 1,
        height: 56,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#333',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        backgroundColor: '#111',
    },
    footerActionText: {
        color: Colors.text,
        fontSize: 14,
        fontWeight: 'bold',
    },
    helpBtn: {
        paddingHorizontal: 16,
        height: 56,
        justifyContent: 'center',
    },
    helpText: {
        color: Colors.textMuted,
        fontSize: 12,
        fontWeight: 'bold',
        textDecorationLine: 'underline',
    },
});

export default BookingDetailScreen;
