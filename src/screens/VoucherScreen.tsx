import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Ticket, Clock, Tag, ChevronRight } from 'lucide-react-native';
import { Colors, Spacing } from '../theme/Theme';
import { LinearGradient } from 'expo-linear-gradient';
import Toast, { ToastRef } from '../components/Toast';

const VoucherScreen = ({ navigation }: any) => {
    const toastRef = React.useRef<ToastRef>(null);
    const [usedVouchers, setUsedVouchers] = React.useState<string[]>([]);

    const useVoucher = (id: string, title: string) => {
        if (usedVouchers.includes(id)) return;
        setUsedVouchers([...usedVouchers, id]);
        toastRef.current?.show(`Voucher "${title}" berhasil digunakan!`, 'success');
    };

    const vouchers = [
        {
            id: '1',
            title: 'Diskon 50k - Semua Menu',
            desc: 'Minimal transaksi Rp 300.000',
            expiry: 'Berakhir dalam 2 hari',
            code: 'QIU50K',
            type: 'discount'
        },
        {
            id: '2',
            title: 'Gratis Mixer Platter',
            desc: 'Khusus pemesanan botol Macallan',
            expiry: 'Berakhir 28 Feb 2026',
            code: 'FREE-MIX',
            type: 'gift'
        },
        {
            id: '3',
            title: 'Cashback 10% QiuPoints',
            desc: 'Maksimum cashback 50.000 poin',
            expiry: 'Berakhir 15 Mar 2026',
            code: 'CB-LOYAL',
            type: 'cashback'
        }
    ];

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
                    <Text style={styles.headerTitle}>VOUCHER SAYA</Text>
                    <View style={{ width: 40 }} />
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                    {/* Active Vouchers Section */}
                    <Text style={styles.sectionTitle}>Tersedia ({vouchers.length})</Text>

                    {vouchers.map((voucher) => (
                        <TouchableOpacity
                            key={voucher.id}
                            style={[styles.voucherCard, usedVouchers.includes(voucher.id) && styles.voucherCardUsed]}
                            activeOpacity={0.8}
                        >
                            <View style={styles.voucherLeft}>
                                <View style={[styles.iconBg, voucher.type === 'gift' ? styles.giftBg : styles.discountBg]}>
                                    <Ticket size={24} color={usedVouchers.includes(voucher.id) ? '#444' : Colors.primary} />
                                </View>
                            </View>

                            <View style={styles.voucherRight}>
                                <View style={styles.voucherInfo}>
                                    <Text style={[styles.voucherTitle, usedVouchers.includes(voucher.id) && styles.textUsed]}>{voucher.title}</Text>
                                    <Text style={styles.voucherDesc}>{voucher.desc}</Text>
                                </View>

                                <View style={styles.voucherFooter}>
                                    <View style={styles.expiryBox}>
                                        <Clock size={12} color={Colors.textMuted} />
                                        <Text style={styles.expiryText}>{voucher.expiry}</Text>
                                    </View>
                                    <TouchableOpacity
                                        style={[styles.useButton, usedVouchers.includes(voucher.id) && styles.useButtonUsed]}
                                        onPress={() => useVoucher(voucher.id, voucher.title)}
                                        disabled={usedVouchers.includes(voucher.id)}
                                    >
                                        <Text style={[styles.useButtonText, usedVouchers.includes(voucher.id) && styles.useButtonTextUsed]}>
                                            {usedVouchers.includes(voucher.id) ? 'DIPAKAI' : 'GUNAKAN'}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            {/* Ticket Notch Decorations */}
                            <View style={styles.notchLeft} />
                            <View style={styles.notchRight} />
                        </TouchableOpacity>
                    ))}

                    {/* Promo Banner */}
                    <TouchableOpacity
                        style={styles.promoBanner}
                        onPress={() => toastRef.current?.show('Voucher Member Baru berhasil diklaim!', 'success')}
                    >
                        <LinearGradient
                            colors={['#C6A234', '#8A6E1F']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.promoGradient}
                        >
                            <View>
                                <Text style={styles.promoTitle}>Klaim Voucher Member Baru!</Text>
                                <Text style={styles.promoSubtitle}>Dapatkan diskon 20% untuk kunjungan pertamamu.</Text>
                            </View>
                            <ChevronRight size={24} color={Colors.background} />
                        </LinearGradient>
                    </TouchableOpacity>
                </ScrollView>
                <Toast ref={toastRef} />
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
        letterSpacing: 2,
    },
    scrollContent: {
        padding: Spacing.md,
    },
    sectionTitle: {
        color: Colors.text,
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        marginTop: 10,
    },
    voucherCard: {
        flexDirection: 'row',
        backgroundColor: Colors.card,
        borderRadius: 20,
        marginBottom: 16,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#222',
        height: 120,
    },
    voucherLeft: {
        width: 90,
        backgroundColor: 'rgba(255,255,255,0.03)',
        justifyContent: 'center',
        alignItems: 'center',
        borderRightWidth: 1,
        borderRightColor: '#222',
        borderStyle: 'dashed',
    },
    iconBg: {
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    discountBg: {
        backgroundColor: 'rgba(198, 162, 52, 0.1)',
    },
    giftBg: {
        backgroundColor: 'rgba(75, 181, 67, 0.1)',
    },
    voucherRight: {
        flex: 1,
        padding: 16,
        justifyContent: 'space-between',
    },
    voucherInfo: {
        flex: 1,
    },
    voucherTitle: {
        color: Colors.text,
        fontSize: 15,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    voucherDesc: {
        color: Colors.textMuted,
        fontSize: 11,
    },
    voucherFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 8,
    },
    expiryBox: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    expiryText: {
        color: Colors.textMuted,
        fontSize: 10,
    },
    useButton: {
        backgroundColor: Colors.primary,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
    },
    useButtonText: {
        color: Colors.background,
        fontSize: 10,
        fontWeight: 'bold',
    },
    notchLeft: {
        position: 'absolute',
        left: 85,
        top: -10,
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: '#000', // Matches global background for cutout effect
        zIndex: 10,
    },
    notchRight: {
        position: 'absolute',
        left: 85,
        bottom: -10,
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: '#000',
        zIndex: 10,
    },
    promoBanner: {
        marginTop: 20,
        borderRadius: 20,
        overflow: 'hidden',
    },
    promoGradient: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
    },
    promoTitle: {
        color: Colors.background,
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    promoSubtitle: {
        color: 'rgba(0,0,0,0.6)',
        fontSize: 11,
        maxWidth: '80%',
    },
    voucherCardUsed: {
        opacity: 0.6,
        borderColor: '#111',
    },
    textUsed: {
        color: '#666',
        textDecorationLine: 'line-through',
    },
    useButtonUsed: {
        backgroundColor: '#222',
        borderColor: '#333',
        borderWidth: 1,
    },
    useButtonTextUsed: {
        color: '#666',
    },
});

export default VoucherScreen;
