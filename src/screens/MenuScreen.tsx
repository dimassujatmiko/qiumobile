import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Plus, Search, ShoppingBag, Wine, ShoppingCart } from 'lucide-react-native';
import { Animated, Dimensions, Easing } from 'react-native';
import { Colors, Spacing } from '../theme/Theme';
import { LinearGradient } from 'expo-linear-gradient';
import { MENU_CATEGORIES, MENU_ITEMS } from '../utils/MockData';
import { useCart } from '../context/CartContext';
import Toast, { ToastRef } from '../components/Toast';

const MenuScreen = ({ navigation, route }: any) => {
    const initialCategoryId = route.params?.categoryId || MENU_CATEGORIES[0].id;
    const [selectedCategory, setSelectedCategory] = useState(initialCategoryId);
    const { addToCart, cartCount } = useCart();
    const toastRef = React.useRef<ToastRef>(null);
    const { width, height } = Dimensions.get('window');

    // Animation values
    const [animationItems, setAnimationItems] = useState<{ id: number, x: Animated.Value, y: Animated.Value }[]>([]);

    const handleAddToCart = (item: any, event?: any) => {
        addToCart(item);

        // Trigger animation if we have coordinates
        if (event && event.nativeEvent) {
            const { pageX, pageY } = event.nativeEvent;
            const animId = Date.now();

            const itemX = new Animated.Value(pageX - 20);
            const itemY = new Animated.Value(pageY - 20);

            setAnimationItems(prev => [...prev, { id: animId, x: itemX, y: itemY }]);

            Animated.parallel([
                Animated.timing(itemX, {
                    toValue: width - 45, // Target X (Floating cart center)
                    duration: 800,
                    easing: Easing.bezier(0.4, 0, 0.2, 1),
                    useNativeDriver: true,
                }),
                Animated.sequence([
                    // Arc effect: go up then fall
                    Animated.timing(itemY, {
                        toValue: pageY - 100,
                        duration: 300,
                        easing: Easing.out(Easing.quad),
                        useNativeDriver: true,
                    }),
                    Animated.timing(itemY, {
                        toValue: height - 100, // Target Y (Floating cart center)
                        duration: 500,
                        easing: Easing.in(Easing.quad),
                        useNativeDriver: true,
                    })
                ])
            ]).start(() => {
                // Remove animation item after completion
                setAnimationItems(prev => prev.filter(a => a.id !== animId));
                // Optional: bounce effect for floating cart
                triggerCartPulse();
            });
        }
    };

    const cartPulse = React.useRef(new Animated.Value(1)).current;
    const triggerCartPulse = () => {
        Animated.sequence([
            Animated.timing(cartPulse, { toValue: 1.2, duration: 100, useNativeDriver: true }),
            Animated.timing(cartPulse, { toValue: 1, duration: 150, useNativeDriver: true }),
        ]).start();
    };

    const filteredItems = MENU_ITEMS.filter(item => item.categoryId === selectedCategory);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <ArrowLeft size={24} color={Colors.text} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>MENU & MINUMAN</Text>
                <View style={{ flexDirection: 'row', gap: 12 }}>
                    <TouchableOpacity style={styles.iconButton}>
                        <Search size={22} color={Colors.text} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Cart')}>
                        <ShoppingBag size={22} color={Colors.text} />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Categories */}
            <View style={styles.categoriesContainer}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoriesContent}>
                    {MENU_CATEGORIES.map((category) => (
                        <TouchableOpacity
                            key={category.id}
                            style={[
                                styles.categoryChip,
                                selectedCategory === category.id && styles.categoryChipActive
                            ]}
                            onPress={() => setSelectedCategory(category.id)}
                        >
                            <Text
                                style={[
                                    styles.categoryText,
                                    selectedCategory === category.id && styles.categoryTextActive
                                ]}
                            >
                                {category.name}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            {/* Menu Grid */}
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.menuContent}>
                {filteredItems.map((item) => (
                    <TouchableOpacity
                        key={item.id}
                        style={styles.menuItem}
                        onPress={() => navigation.navigate('MenuDetail', { item })}
                        activeOpacity={0.7}
                    >
                        <View style={styles.imageContainer}>
                            <Image source={{ uri: item.image }} style={styles.itemImage} />
                        </View>
                        <View style={styles.itemDetails}>
                            <Text style={styles.itemName}>{item.name}</Text>
                            <Text style={styles.itemDescription} numberOfLines={2}>{item.description}</Text>
                            <Text style={styles.itemPrice}>{item.price}</Text>
                        </View>
                        <TouchableOpacity
                            style={styles.addButton}
                            onPress={(e) => handleAddToCart(item, e)}
                        >
                            <Plus size={20} color={Colors.background} />
                        </TouchableOpacity>
                    </TouchableOpacity>
                ))}
                <View style={{ height: 40 }} />
            </ScrollView>
            {/* Floating Cart Button */}
            {cartCount > 0 && (
                <Animated.View style={[
                    styles.floatingCartContainer,
                    { transform: [{ scale: cartPulse }] }
                ]}>
                    <TouchableOpacity
                        style={styles.floatingCart}
                        onPress={() => navigation.navigate('Cart')}
                        activeOpacity={0.9}
                    >
                        <LinearGradient
                            colors={Colors.goldGradient as any}
                            style={styles.floatingCartGradient}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                        >
                            <ShoppingCart size={24} color="#000" />
                            <View style={styles.floatingBadge}>
                                <Text style={styles.floatingBadgeText}>{cartCount}</Text>
                            </View>
                        </LinearGradient>
                    </TouchableOpacity>
                </Animated.View>
            )}

            {/* Animation Items */}
            {animationItems.map(item => (
                <Animated.View
                    key={item.id}
                    style={[
                        styles.animationDot,
                        {
                            transform: [
                                { translateX: item.x },
                                { translateY: item.y }
                            ]
                        }
                    ]}
                >
                    <View style={styles.innerDot} />
                </Animated.View>
            ))}

            <Toast ref={toastRef} />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
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
    searchButton: {
        padding: 8,
    },
    headerTitle: {
        color: Colors.text,
        fontSize: 18,
        fontWeight: 'bold',
        letterSpacing: 1,
    },
    categoriesContainer: {
        marginVertical: Spacing.md,
    },
    categoriesContent: {
        paddingHorizontal: Spacing.md,
        gap: 12,
    },
    categoryChip: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#333',
        backgroundColor: '#0D0D0D',
    },
    categoryChipActive: {
        backgroundColor: Colors.primary,
        borderColor: Colors.primary,
    },
    categoryText: {
        color: Colors.textMuted,
        fontSize: 14,
        fontWeight: '600',
    },
    categoryTextActive: {
        color: Colors.background,
        fontWeight: 'bold',
    },
    menuContent: {
        paddingHorizontal: Spacing.md,
    },
    menuItem: {
        flexDirection: 'row',
        backgroundColor: Colors.card,
        borderRadius: 16,
        padding: 12,
        marginBottom: 16,
        alignItems: 'center',
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
        justifyContent: 'center',
    },
    itemName: {
        color: Colors.text,
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    itemDescription: {
        color: Colors.textMuted,
        fontSize: 12,
        marginBottom: 8,
        lineHeight: 16,
    },
    itemPrice: {
        color: Colors.primary,
        fontSize: 14,
        fontWeight: 'bold',
    },
    addButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 12,
    },
    iconButton: {
        padding: 8,
    },
    cartBadge: {
        position: 'absolute',
        top: 0,
        right: 0,
        backgroundColor: Colors.danger,
        borderRadius: 10,
        width: 16,
        height: 16,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Colors.background,
    },
    cartBadgeText: {
        color: Colors.text,
        fontSize: 10,
        fontWeight: 'bold',
    },
    floatingCartContainer: {
        position: 'absolute',
        bottom: 30,
        right: 20,
        zIndex: 100,
    },
    floatingCart: {
        width: 60,
        height: 60,
        borderRadius: 30,
        elevation: 10,
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        overflow: 'hidden',
    },
    floatingCartGradient: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    floatingBadge: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: '#000',
        borderRadius: 10,
        minWidth: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 4,
        borderWidth: 1.5,
        borderColor: '#C6A234',
    },
    floatingBadgeText: {
        color: '#C6A234',
        fontSize: 10,
        fontWeight: '900',
    },
    animationDot: {
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 999,
        width: 30,
        height: 30,
    },
    innerDot: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: Colors.primary,
        borderWidth: 2,
        borderColor: '#FFF',
    },
});

export default MenuScreen;
