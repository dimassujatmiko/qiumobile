import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Clock, CreditCard, ChevronRight } from 'lucide-react-native';
import { Colors, Spacing } from '../theme/Theme';
import { LinearGradient } from 'expo-linear-gradient';

const TRANSACTIONS = [
    {
        id: 'TX1001',
        date: '02 Feb 2026',
        time: '20:15',
        type: 'Lounge Bill',
        location: 'VIP 102',
        amount: 4071000,
        status: 'Success',
        items: [
            { id: '1', name: 'Macallan 12Y Bottle', price: 2800000, qty: 1 },
            { id: '2', name: 'Mixer Platter', price: 150000, qty: 2 },
            { id: '3', name: 'Grilled Wagyu Cubes', price: 450000, qty: 1 },
            { id: '4', name: 'Mineral Water', price: 35000, qty: 4 },
        ]
    },
    {
        id: 'TX1002',
        date: '28 Jan 2026',
        time: '21:30',
        type: 'KTV Booking',
        location: 'Room Jade',
        amount: 1500000,
        status: 'Success',
        items: [
            { id: '1', name: 'KTV Room Booking - 3 Hours', price: 1500000, qty: 1 },
        ]
    },
    {
        id: 'TX1003',
        date: '15 Jan 2026',
        time: '19:45',
        type: 'Drink Purchase',
        location: 'Bar Counter',
        amount: 850000,
        status: 'Success',
        items: [
            { id: '1', name: 'Signature Martini', price: 185000, qty: 2 },
            { id: '2', name: 'Old Fashioned', price: 175000, qty: 2 },
            { id: '3', name: 'Crispy Calamari', price: 130000, qty: 1 },
        ]
    },
];

const TransactionHistoryScreen = ({ navigation }: any) => {
    const formatCurrency = (amount: number) => {
        if (amount === undefined || amount === null) return 'Rp 0';
        return 'Rp ' + amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };

    const renderItem = ({ item }: { item: typeof TRANSACTIONS[0] }) => (
        <TouchableOpacity
            style={styles.transactionCard}
            onPress={() => navigation.navigate('TransactionDetail', { transaction: item })}
        >
            <View style={styles.cardHeader}>
                <View style={styles.typeBadge}>
                    <Clock size={12} color={Colors.primary} />
                    <Text style={styles.typeText}>{item.type}</Text>
                </View>
                <Text style={styles.dateText}>{item.date}</Text>
            </View>

            <View style={styles.cardBody}>
                <View style={styles.infoCol}>
                    <Text style={styles.locationText}>{item.location}</Text>
                    <Text style={styles.idText}>ID: {item.id}</Text>
                </View>
                <View style={styles.amountCol}>
                    <Text style={styles.amountText}>{formatCurrency(item.amount)}</Text>
                    <View style={styles.statusBadge}>
                        <Text style={styles.statusText}>{item.status}</Text>
                    </View>
                </View>
                <ChevronRight size={20} color="#444" />
            </View>

            <LinearGradient
                colors={Colors.silverGradient as any}
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                style={styles.cardFooterLine}
            />
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#111', '#000']}
                style={StyleSheet.absoluteFill}
            />

            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <ArrowLeft size={24} color={Colors.text} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>RIWAYAT TRANSAKSI</Text>
                    <View style={{ width: 40 }} />
                </View>

                <FlatList
                    data={TRANSACTIONS}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={
                        <View style={styles.emptyState}>
                            <CreditCard size={48} color="#222" />
                            <Text style={styles.emptyText}>Belum ada riwayat transaksi.</Text>
                        </View>
                    }
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
        fontSize: 16,
        fontWeight: 'bold',
        letterSpacing: 1,
    },
    listContent: {
        padding: Spacing.md,
        paddingBottom: 40,
    },
    transactionCard: {
        backgroundColor: Colors.card,
        borderRadius: 16,
        marginBottom: 16,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#222',
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#1A1A1A',
    },
    typeBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        backgroundColor: 'rgba(198, 162, 52, 0.1)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
    },
    typeText: {
        color: Colors.primary,
        fontSize: 10,
        fontWeight: 'bold',
    },
    dateText: {
        color: Colors.textMuted,
        fontSize: 11,
    },
    cardBody: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        gap: 12,
    },
    infoCol: {
        flex: 1,
    },
    locationText: {
        color: Colors.text,
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    idText: {
        color: Colors.textMuted,
        fontSize: 11,
    },
    amountCol: {
        alignItems: 'flex-end',
    },
    amountText: {
        color: '#4CAF50',
        fontSize: 16,
        fontWeight: '900',
        marginBottom: 4,
    },
    statusBadge: {
        backgroundColor: 'rgba(76, 175, 80, 0.1)',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
    },
    statusText: {
        color: '#4CAF50',
        fontSize: 9,
        fontWeight: 'bold',
    },
    cardFooterLine: {
        height: 2,
        width: '100%',
    },
    emptyState: {
        alignItems: 'center',
        marginTop: 100,
    },
    emptyText: {
        color: Colors.textMuted,
        fontSize: 14,
        marginTop: 16,
    }
});

export default TransactionHistoryScreen;
