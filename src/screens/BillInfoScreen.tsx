import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Receipt, CreditCard, Clock, MapPin, ChevronRight, Info as InfoIcon } from 'lucide-react-native';
import { Colors, Spacing } from '../theme/Theme';
import { LinearGradient } from 'expo-linear-gradient';
import GoldButton from '../components/GoldButton';

const BillInfoScreen = ({ navigation }: any) => {
    const scrollY = React.useRef(new Animated.Value(0)).current;

    const headerOpacity = scrollY.interpolate({
        inputRange: [0, 60],
        outputRange: [0, 1],
        extrapolate: 'clamp',
    });

    const headerTranslate = scrollY.interpolate({
        inputRange: [0, 60],
        outputRange: [-20, 0],
        extrapolate: 'clamp',
    });

    // Mock data for the active bill
    const activeBill = {
        tableNumber: 'VIP 102',
        startTime: '19:30',
        duration: '2h 15m',
        items: [
            { id: '1', name: 'Macallan 12Y Bottle', price: 2800000, qty: 1 },
            { id: '2', name: 'Mixer Platter', price: 150000, qty: 2 },
            { id: '3', name: 'Grilled Wagyu Cubes', price: 450000, qty: 1 },
            { id: '4', name: 'Mineral Water', price: 35000, qty: 4 },
        ],
        subtotal: 3540000,
        tax: 354000, // 10%
        serviceCharge: 177000, // 5%
        total: 4071000,
    };

    const formatCurrency = (amount: number) => {
        if (amount === undefined || amount === null) return 'Rp 0';
        return 'Rp ' + amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
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

                    <View style={styles.headerTitleContainer}>
                        <Text style={styles.headerTitleBase}>TAGIHAN AKTIF</Text>
                        <Animated.View style={[
                            styles.headerTitleAnimated,
                            { opacity: headerOpacity, transform: [{ translateY: headerTranslate }] }
                        ]}>
                            <Text style={styles.headerTitleText}>{activeBill.tableNumber}</Text>
                        </Animated.View>
                    </View>

                    <View style={{ width: 40 }} />
                </View>

                <Animated.ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContent}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                        { useNativeDriver: true }
                    )}
                    scrollEventThrottle={16}
                >
                    {/* Bill Header Info */}
                    <View style={styles.billHeaderCard}>
                        <View style={styles.tableInfo}>
                            <View style={styles.iconCircle}>
                                <MapPin size={24} color={Colors.primary} />
                            </View>
                            <View>
                                <Text style={styles.tableLabel}>Meja / Ruang</Text>
                                <Text style={styles.tableValue}>{activeBill.tableNumber}</Text>
                            </View>
                        </View>
                        <View style={styles.timeInfo}>
                            <View style={styles.timeItem}>
                                <Clock size={16} color={Colors.textMuted} />
                                <Text style={styles.timeText}>{activeBill.startTime}</Text>
                            </View>
                            <View style={styles.dividerDot} />
                            <Text style={styles.durationText}>{activeBill.duration}</Text>
                        </View>
                    </View>

                    {/* Order List */}
                    <View style={styles.section}>
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>Detail Pesanan</Text>
                            <Receipt size={18} color={Colors.primary} />
                        </View>

                        {activeBill.items.map((item) => (
                            <View key={item.id} style={styles.orderItem}>
                                <View style={styles.itemMain}>
                                    <Text style={styles.itemQty}>{item.qty}x</Text>
                                    <View style={{ flex: 1 }}>
                                        <Text style={styles.itemName}>{item.name}</Text>
                                        <Text style={styles.itemBasePrice}>{formatCurrency(item.price)}</Text>
                                    </View>
                                </View>
                                <Text style={styles.itemTotal}>{formatCurrency(item.price * item.qty)}</Text>
                            </View>
                        ))}
                    </View>

                    {/* Summary Card */}
                    <View style={styles.summaryCard}>
                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryLabel}>Subtotal</Text>
                            <Text style={styles.summaryValue}>{formatCurrency(activeBill.subtotal)}</Text>
                        </View>
                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryLabel}>Biaya Layanan (5%)</Text>
                            <Text style={styles.summaryValue}>{formatCurrency(activeBill.serviceCharge)}</Text>
                        </View>
                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryLabel}>Pajak (10%)</Text>
                            <Text style={styles.summaryValue}>{formatCurrency(activeBill.tax)}</Text>
                        </View>
                        <View style={[styles.summaryRow, styles.totalRow]}>
                            <Text style={styles.totalLabel}>Total Keseluruhan</Text>
                            <Text style={styles.totalValue}>{formatCurrency(activeBill.total)}</Text>
                        </View>
                    </View>

                    {/* Payment Notice */}
                    <View style={styles.noticeContainer}>
                        <View style={styles.infoIconCircle}>
                            <InfoIcon size={14} color={Colors.primary} />
                        </View>
                        <Text style={styles.noticeText}>
                            Selesaikan pembayaran di kasir atau minta staf kami untuk membawa mesin EDC ke meja Anda.
                        </Text>
                    </View>

                    <View style={{ height: 40 }} />
                </Animated.ScrollView>

                {/* Bottom Action Button */}
                <View style={styles.bottomBar}>
                    <GoldButton
                        title="MINTA PEMBAYARAN"
                        onPress={() => Alert.alert('Permintaan Terkirim', 'Pelayan akan segera mendatangi meja Anda membawa mesin pembayaran.')}
                        icon={<CreditCard size={20} color="#000" />}
                    />
                </View>
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
    headerTitleContainer: {
        alignItems: 'center',
        flex: 1,
    },
    headerTitleBase: {
        color: Colors.textMuted,
        fontSize: 10,
        fontWeight: 'bold',
        letterSpacing: 1.5,
    },
    headerTitleAnimated: {
        position: 'absolute',
        top: 14,
    },
    headerTitleText: {
        color: Colors.text,
        fontSize: 16,
        fontWeight: 'bold',
    },
    scrollContent: {
        padding: Spacing.md,
    },
    billHeaderCard: {
        backgroundColor: Colors.card,
        borderRadius: 24,
        padding: 20,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#222',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    tableInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    iconCircle: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(198, 162, 52, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    tableLabel: {
        color: Colors.textMuted,
        fontSize: 10,
        fontWeight: 'bold',
        letterSpacing: 0.5,
    },
    tableValue: {
        color: Colors.text,
        fontSize: 18,
        fontWeight: 'bold',
    },
    timeInfo: {
        alignItems: 'flex-end',
    },
    timeItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        marginBottom: 4,
    },
    timeText: {
        color: Colors.text,
        fontSize: 12,
        fontWeight: '600',
    },
    durationText: {
        color: Colors.primary,
        fontSize: 11,
        fontWeight: 'bold',
    },
    dividerDot: {
        width: 3,
        height: 3,
        borderRadius: 1.5,
        backgroundColor: '#444',
        marginHorizontal: 8,
    },
    section: {
        backgroundColor: Colors.card,
        borderRadius: 24,
        padding: 20,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#222',
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        paddingBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#1A1A1A',
    },
    sectionTitle: {
        color: Colors.text,
        fontSize: 16,
        fontWeight: 'bold',
    },
    orderItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    itemMain: {
        flexDirection: 'row',
        flex: 1,
        gap: 12,
    },
    itemQty: {
        color: Colors.primary,
        fontSize: 14,
        fontWeight: 'bold',
        width: 24,
    },
    itemName: {
        color: Colors.text,
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 2,
    },
    itemBasePrice: {
        color: Colors.textMuted,
        fontSize: 11,
    },
    itemTotal: {
        color: Colors.text,
        fontSize: 14,
        fontWeight: 'bold',
    },
    summaryCard: {
        backgroundColor: 'rgba(255, 255, 255, 0.02)',
        borderRadius: 24,
        padding: 20,
        borderWidth: 1,
        borderColor: '#222',
        marginBottom: 20,
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
        fontWeight: '600',
    },
    totalRow: {
        marginTop: 8,
        paddingTop: 16,
        borderTopWidth: 1,
        borderTopColor: '#222',
        marginBottom: 0,
    },
    totalLabel: {
        color: Colors.text,
        fontSize: 16,
        fontWeight: 'bold',
    },
    totalValue: {
        color: '#4CAF50',
        fontSize: 22,
        fontWeight: '900',
    },
    noticeContainer: {
        flexDirection: 'row',
        backgroundColor: '#111',
        padding: 16,
        borderRadius: 16,
        gap: 12,
        alignItems: 'center',
    },
    infoIconCircle: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noticeText: {
        flex: 1,
        color: Colors.textMuted,
        fontSize: 12,
        lineHeight: 18,
    },
    bottomBar: {
        padding: Spacing.md,
        paddingBottom: Spacing.lg,
    },
});

export default BillInfoScreen;
