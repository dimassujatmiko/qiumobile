import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Minus, Plus, ShoppingBag, Star } from 'lucide-react-native';
import { Colors, Spacing } from '../theme/Theme';
import { useCart } from '../context/CartContext';

const { width } = Dimensions.get('window');

const MenuDetailScreen = ({ route, navigation }: any) => {
    const { item } = route.params;
    const { addToCart } = useCart();
    const [quantity, setQuantity] = useState(1);

    const handleAddToCart = () => {
        for (let i = 0; i < quantity; i++) {
            addToCart(item);
        }
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Image Section */}
                <View style={styles.imageContainer}>
                    <Image source={{ uri: item.image }} style={styles.image} />
                    <SafeAreaView style={styles.headerAbsolute}>
                        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.goBack()}>
                            <ArrowLeft size={24} color={Colors.text} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Cart')}>
                            <ShoppingBag size={24} color={Colors.text} />
                        </TouchableOpacity>
                    </SafeAreaView>
                </View>

                {/* Content Section */}
                <View style={styles.content}>
                    <View style={styles.titleRow}>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.name}>{item.name}</Text>
                            <View style={styles.ratingRow}>
                                <Star size={14} color={Colors.primary} fill={Colors.primary} />
                                <Text style={styles.ratingText}>4.8 (120+ ulasan)</Text>
                            </View>
                        </View>
                        <Text style={styles.price}>{item.price}</Text>
                    </View>

                    <View style={styles.divider} />

                    <Text style={styles.sectionTitle}>Deskripsi</Text>
                    <Text style={styles.description}>{item.description}</Text>

                    <Text style={styles.sectionTitle}>Ukuran / Varian</Text>
                    <View style={styles.variantRow}>
                        <TouchableOpacity style={[styles.variantChip, styles.activeVariant]}>
                            <Text style={styles.activeVariantText}>Reguler</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.variantChip}>
                            <Text style={styles.variantText}>Besar (+30k)</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>

            {/* Bottom Action Bar */}
            <SafeAreaView edges={['bottom']} style={styles.bottomBar}>
                <View style={styles.quantityContainer}>
                    <TouchableOpacity
                        style={styles.qtyBtn}
                        onPress={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                        <Minus size={20} color={Colors.text} />
                    </TouchableOpacity>
                    <Text style={styles.qtyText}>{quantity}</Text>
                    <TouchableOpacity
                        style={styles.qtyBtn}
                        onPress={() => setQuantity(quantity + 1)}
                    >
                        <Plus size={20} color={Colors.text} />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.addBtn} onPress={handleAddToCart}>
                    <Text style={styles.addBtnText}>Tambah ke Keranjang</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    imageContainer: {
        width: width,
        height: width,
        position: 'relative',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    headerAbsolute: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: Spacing.md,
    },
    iconButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        padding: Spacing.lg,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        backgroundColor: Colors.background,
        marginTop: -30,
    },
    titleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: Spacing.md,
    },
    name: {
        color: Colors.text,
        fontSize: 26,
        fontWeight: '900',
        marginBottom: 8,
    },
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    ratingText: {
        color: Colors.textMuted,
        fontSize: 12,
    },
    price: {
        color: Colors.primary,
        fontSize: 20,
        fontWeight: 'bold',
    },
    divider: {
        height: 1,
        backgroundColor: '#1A1A1A',
        marginVertical: Spacing.xl,
    },
    sectionTitle: {
        color: Colors.text,
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    description: {
        color: Colors.textMuted,
        fontSize: 14,
        lineHeight: 22,
        marginBottom: Spacing.xl,
    },
    variantRow: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 20,
    },
    variantChip: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#333',
    },
    activeVariant: {
        borderColor: Colors.primary,
        backgroundColor: 'rgba(198, 162, 52, 0.1)',
    },
    variantText: {
        color: Colors.textMuted,
        fontSize: 13,
    },
    activeVariantText: {
        color: Colors.primary,
        fontSize: 13,
        fontWeight: 'bold',
    },
    bottomBar: {
        flexDirection: 'row',
        padding: Spacing.md,
        backgroundColor: '#0D0D0D',
        borderTopWidth: 1,
        borderTopColor: '#1A1A1A',
        alignItems: 'center',
        gap: 16,
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1A1A1A',
        borderRadius: 15,
        padding: 4,
    },
    qtyBtn: {
        width: 44,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
    },
    qtyText: {
        color: Colors.text,
        fontSize: 18,
        fontWeight: 'bold',
        paddingHorizontal: 16,
    },
    addBtn: {
        flex: 1,
        height: 52,
        backgroundColor: Colors.primary,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addBtnText: {
        color: Colors.background,
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default MenuDetailScreen;
