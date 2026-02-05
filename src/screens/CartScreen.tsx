import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Alert, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Trash2, Minus, Plus, Tag } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, Spacing } from '../theme/Theme';
import { useCart } from '../context/CartContext';
import Toast, { ToastRef } from '../components/Toast';
import GoldButton from '../components/GoldButton';

const CartScreen = ({ navigation }: any) => {
    const { items, updateQuantity, removeFromCart, totalPrice } = useCart();
    const [promoCode, setPromoCode] = React.useState('');
    const toastRef = React.useRef<ToastRef>(null);
    const insets = useSafeAreaInsets();

    const applyPromo = () => {
        if (!promoCode) return;
        if (promoCode.toUpperCase() === 'QIU50K') {
            toastRef.current?.show('Promo QIU50K berhasil digunakan! Diskon Rp 50.000', 'success');
        } else {
            toastRef.current?.show('Kode promo tidak valid', 'error');
        }
    };

    const formatCurrency = (amount: number) => {
        return 'Rp ' + amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };

    const handleCheckout = () => {
        navigation.navigate('Success', {
            title: 'Pesanan Diterima!',
            message: 'Minuman dan makanan Anda akan segera diantarkan ke meja.'
        });
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <ArrowLeft size={24} color={Colors.text} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>PESANAN ANDA</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                {items.length === 0 ? (
                    <View style={styles.emptyState}>
                        <Text style={styles.emptyText}>Keranjang Anda kosong</Text>
                        <TouchableOpacity style={styles.browseButton} onPress={() => navigation.navigate('Menu')}>
                            <Text style={styles.browseButtonText}>Lihat Menu</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    items.map((item) => (
                        <View key={item.id} style={styles.cartItem}>
                            <View style={styles.imageContainer}>
                                <Image source={{ uri: item.image }} style={styles.itemImage} />
                            </View>

                            <View style={styles.itemDetails}>
                                <View style={styles.itemHeader}>
                                    <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
                                    <TouchableOpacity onPress={() => removeFromCart(item.id)}>
                                        <Trash2 size={18} color={Colors.danger} />
                                    </TouchableOpacity>
                                </View>
                                <Text style={styles.itemPrice}>{item.price}</Text>

                                <View style={styles.quantityControls}>
                                    <TouchableOpacity
                                        style={styles.qtyButton}
                                        onPress={() => updateQuantity(item.id, -1)}
                                    >
                                        <Minus size={16} color={Colors.text} />
                                    </TouchableOpacity>
                                    <Text style={styles.qtyText}>{item.quantity}</Text>
                                    <TouchableOpacity
                                        style={[styles.qtyButton, { backgroundColor: Colors.primary }]}
                                        onPress={() => updateQuantity(item.id, 1)}
                                    >
                                        <Plus size={16} color={Colors.background} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    ))
                )}

                {items.length > 0 && (
                    <View style={styles.promoContainer}>
                        <View style={styles.promoInputWrapper}>
                            <Tag size={18} color={Colors.primary} />
                            <TextInput
                                style={styles.promoInput}
                                placeholder="Punya kode promo?"
                                placeholderTextColor="#666"
                                value={promoCode}
                                onChangeText={setPromoCode}
                                autoCapitalize="characters"
                            />
                        </View>
                        <TouchableOpacity
                            style={[styles.applyButton, !promoCode && styles.applyButtonDisabled]}
                            onPress={applyPromo}
                            disabled={!promoCode}
                        >
                            <Text style={styles.applyButtonText}>PAKAI</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </ScrollView>

            {items.length > 0 && (
                <View style={[styles.footer, { paddingBottom: insets.bottom > 0 ? insets.bottom : Spacing.lg }]}>
                    <View style={styles.totalRow}>
                        <Text style={styles.totalLabel}>Total Bayar</Text>
                        <Text style={styles.totalValue}>{formatCurrency(totalPrice)}</Text>
                    </View>
                    <GoldButton
                        title="KONFIRMASI PESANAN"
                        onPress={handleCheckout}
                    />
                </View>
            )}
            <Toast ref={toastRef} />
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
        paddingVertical: Spacing.sm,
        borderBottomWidth: 1,
        borderBottomColor: '#1A1A1A',
    },
    backButton: {
        padding: 8,
    },
    headerTitle: {
        color: Colors.text,
        fontSize: 18,
        fontWeight: 'bold',
        letterSpacing: 1,
    },
    scrollContent: {
        padding: Spacing.md,
        paddingBottom: 120,
    },
    emptyState: {
        marginTop: 100,
        alignItems: 'center',
    },
    emptyText: {
        color: Colors.textMuted,
        fontSize: 16,
        marginBottom: 20,
    },
    browseButton: {
        paddingHorizontal: 24,
        paddingVertical: 12,
        backgroundColor: Colors.card,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: Colors.primary,
    },
    browseButtonText: {
        color: Colors.primary,
        fontWeight: 'bold',
    },
    cartItem: {
        flexDirection: 'row',
        backgroundColor: Colors.card,
        borderRadius: 16,
        padding: 12,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#181818',
    },
    imageContainer: {
        width: 80,
        height: 80,
        borderRadius: 12,
        overflow: 'hidden',
        backgroundColor: '#222',
    },
    itemImage: {
        width: '100%',
        height: '100%',
    },
    itemDetails: {
        flex: 1,
        marginLeft: 16,
        justifyContent: 'space-between',
    },
    itemHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    itemName: {
        color: Colors.text,
        fontSize: 16,
        fontWeight: 'bold',
        flex: 1,
        marginRight: 8,
    },
    itemPrice: {
        color: Colors.primary,
        fontSize: 14,
        fontWeight: '600',
    },
    quantityControls: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
        gap: 12,
    },
    qtyButton: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: '#333',
        justifyContent: 'center',
        alignItems: 'center',
    },
    qtyText: {
        color: Colors.text,
        fontSize: 16,
        fontWeight: 'bold',
        minWidth: 20,
        textAlign: 'center',
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: Colors.card,
        padding: Spacing.lg,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        borderTopWidth: 1,
        borderTopColor: '#333',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.5,
        shadowRadius: 8,
        elevation: 10,
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    totalLabel: {
        color: Colors.textMuted,
        fontSize: 14,
    },
    totalValue: {
        color: Colors.text,
        fontSize: 24,
        fontWeight: 'bold',
    },
    checkoutButton: {
        backgroundColor: Colors.primary,
        height: 56,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkoutText: {
        color: Colors.background,
        fontSize: 16,
        fontWeight: '900',
        letterSpacing: 1,
    },
    promoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.card,
        padding: 12,
        borderRadius: 16,
        marginTop: 8,
        borderWidth: 1,
        borderColor: '#181818',
        gap: 12,
    },
    promoInputWrapper: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#0D0D0D',
        borderRadius: 12,
        paddingHorizontal: 12,
        height: 48,
        borderWidth: 1,
        borderColor: '#333',
    },
    promoInput: {
        flex: 1,
        color: Colors.text,
        fontSize: 14,
        marginLeft: 10,
    },
    applyButton: {
        backgroundColor: Colors.primary,
        paddingHorizontal: 16,
        height: 48,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    applyButtonDisabled: {
        backgroundColor: '#333',
        opacity: 0.5,
    },
    applyButtonText: {
        color: Colors.background,
        fontSize: 12,
        fontWeight: 'bold',
    },
});

export default CartScreen;
