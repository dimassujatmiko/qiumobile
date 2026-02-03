import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { X, Receipt, MapPin, Calendar, Clock, Download, Share2 } from 'lucide-react-native';
import { Colors, Spacing } from '../theme/Theme';
import { LinearGradient } from 'expo-linear-gradient';

const TransactionDetailScreen = ({ route, navigation }: any) => {
    const { transaction } = route.params || {
        transaction: {
            id: 'TX1001',
            date: '02 Feb 2026',
            time: '20:15',
            type: 'Lounge Bill',
            location: 'VIP 102',
            amount: 4071000,
            status: 'Success'
        }
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

            <SafeAreaView style={styles.safeArea}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>RINCIAN TRANSAKSI</Text>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeButton}>
                        <X size={24} color={Colors.text} />
                    </TouchableOpacity>
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                    {/* Status Section */}
                    <View style={styles.statusSection}>
                        <View style={styles.iconCircle}>
                            <Receipt size={32} color={Colors.primary} />
                        </View>
                        <Text style={styles.amountText}>{formatCurrency(transaction.amount)}</Text>
                        <View style={styles.successBadge}>
                            <Text style={styles.successText}>Transaksi Berhasil</Text>
                        </View>
                    </View>

                    {/* Info Card */}
                    <View style={styles.detailCard}>
                        <View style={styles.infoRow}>
                            <View style={styles.infoItem}>
                                <Text style={styles.infoLabel}>ID TRANSAKSI</Text>
                                <Text style={styles.infoValue}>{transaction.id}</Text>
                            </View>
                        </View>

                        <View style={styles.divider} />

                        <View style={styles.infoRow}>
                            <View style={[styles.infoItem, { flex: 1 }]}>
                                <Text style={styles.infoLabel}>WAKTU & TANGGAL</Text>
                                <View style={styles.row}>
                                    <Calendar size={14} color={Colors.textMuted} />
                                    <Text style={styles.infoValueSmall}>{transaction.date}</Text>
                                    <View style={styles.dot} />
                                    <Clock size={14} color={Colors.textMuted} />
                                    <Text style={styles.infoValueSmall}>{transaction.time}</Text>
                                </View>
                            </View>
                        </View>

                        <View style={styles.divider} />

                        <View style={styles.infoRow}>
                            <View style={[styles.infoItem, { flex: 1 }]}>
                                <Text style={styles.infoLabel}>METODE PEMBAYARAN</Text>
                                <Text style={styles.infoValue}>Mastercard (*** 8829)</Text>
                            </View>
                        </View>

                        <View style={styles.divider} />

                        <View style={styles.infoRow}>
                            <View style={[styles.infoItem, { flex: 1 }]}>
                                <Text style={styles.infoLabel}>LOKASI</Text>
                                <View style={styles.row}>
                                    <MapPin size={14} color={Colors.textMuted} />
                                    <Text style={styles.infoValueSmall}>{transaction.location} - Qiu Qiu Lounge</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    {/* Detailed Order List */}
                    <View style={styles.orderSection}>
                        <View style={styles.orderHeader}>
                            <Text style={styles.orderTitle}>DETAIL PESANAN</Text>
                            <View style={styles.itemCountBadge}>
                                <Text style={styles.itemCountText}>{transaction.items?.length || 0} ITEM</Text>
                            </View>
                        </View>

                        {transaction.items?.map((item: any) => (
                            <View key={item.id} style={styles.orderItem}>
                                <View style={styles.itemInfo}>
                                    <Text style={styles.itemName}>{item.name}</Text>
                                    <Text style={styles.itemPrice}>{formatCurrency(item.price)}</Text>
                                </View>
                                <View style={styles.itemQuantity}>
                                    <Text style={styles.qtyText}>x{item.qty}</Text>
                                    <Text style={styles.itemTotal}>{formatCurrency(item.price * item.qty)}</Text>
                                </View>
                            </View>
                        ))}
                    </View>

                    {/* Action Buttons */}
                    <View style={styles.actions}>
                        <TouchableOpacity style={styles.secondaryAction}>
                            <Download size={20} color={Colors.text} />
                            <Text style={styles.actionText}>Unduh Invoice</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.secondaryAction}>
                            <Share2 size={20} color={Colors.text} />
                            <Text style={styles.actionText}>Bagikan</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ height: 40 }} />
                </ScrollView>

                {/* Decorative Footer */}
                <LinearGradient
                    colors={Colors.goldGradient as any}
                    style={styles.bottomBar}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                />
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    safeArea: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: Spacing.md,
        height: 60,
    },
    headerTitle: {
        color: Colors.text,
        fontSize: 14,
        fontWeight: '900',
        letterSpacing: 2,
    },
    closeButton: {
        position: 'absolute',
        right: Spacing.md,
        padding: 8,
    },
    scrollContent: {
        padding: Spacing.xl,
        alignItems: 'center',
    },
    statusSection: {
        alignItems: 'center',
        marginBottom: 40,
    },
    iconCircle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: 'rgba(198, 162, 52, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        borderWidth: 1,
        borderColor: 'rgba(198, 162, 52, 0.2)',
    },
    amountText: {
        color: '#4CAF50',
        fontSize: 32,
        fontWeight: '900',
        marginBottom: 12,
    },
    successBadge: {
        backgroundColor: 'rgba(76, 175, 80, 0.15)',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'rgba(76, 175, 80, 0.2)',
    },
    successText: {
        color: '#4CAF50',
        fontSize: 12,
        fontWeight: 'bold',
        letterSpacing: 0.5,
    },
    detailCard: {
        width: '100%',
        backgroundColor: '#111',
        borderRadius: 24,
        padding: 24,
        borderWidth: 1,
        borderColor: '#222',
        marginBottom: 30,
    },
    infoRow: {
        marginBottom: 0,
    },
    infoItem: {
        gap: 6,
    },
    infoLabel: {
        color: Colors.textMuted,
        fontSize: 10,
        fontWeight: '900',
        letterSpacing: 1,
    },
    infoValue: {
        color: Colors.text,
        fontSize: 16,
        fontWeight: 'bold',
    },
    infoValueSmall: {
        color: Colors.text,
        fontSize: 14,
        fontWeight: '600',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    dot: {
        width: 4,
        height: 4,
        borderRadius: 2,
        backgroundColor: '#444',
        marginHorizontal: 4,
    },
    divider: {
        height: 1,
        backgroundColor: '#222',
        marginVertical: 16,
    },
    actions: {
        flexDirection: 'row',
        gap: 12,
        width: '100%',
    },
    secondaryAction: {
        flex: 1,
        backgroundColor: '#111',
        height: 54,
        borderRadius: 16,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        borderWidth: 1,
        borderColor: '#333',
    },
    actionText: {
        color: Colors.text,
        fontSize: 12,
        fontWeight: 'bold',
    },
    bottomBar: {
        height: 6,
        width: '100%',
    },
    orderSection: {
        width: '100%',
        backgroundColor: '#111',
        borderRadius: 24,
        padding: 24,
        borderWidth: 1,
        borderColor: '#222',
        marginBottom: 30,
    },
    orderHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        paddingBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#222',
    },
    orderTitle: {
        color: Colors.text,
        fontSize: 14,
        fontWeight: '900',
        letterSpacing: 1,
    },
    itemCountBadge: {
        backgroundColor: 'rgba(198, 162, 52, 0.1)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
    },
    itemCountText: {
        color: Colors.primary,
        fontSize: 10,
        fontWeight: 'bold',
    },
    orderItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    itemInfo: {
        flex: 1,
    },
    itemName: {
        color: Colors.text,
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 4,
    },
    itemPrice: {
        color: Colors.textMuted,
        fontSize: 11,
    },
    itemQuantity: {
        alignItems: 'flex-end',
    },
    qtyText: {
        color: Colors.primary,
        fontSize: 12,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    itemTotal: {
        color: Colors.text,
        fontSize: 13,
        fontWeight: 'bold',
    },
});

export default TransactionDetailScreen;
