import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Dimensions, StatusBar, Alert, Animated, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { ChevronRight, Utensils, Home as HomeIcon, Bell, Search, MapPin, Wallet, Crown, Ticket, Milk, Banknote, ShoppingCart } from 'lucide-react-native';
import { Colors, Spacing } from '../theme/Theme';
import { useAuth } from '../context/AuthContext';
import LogoImage from '../../assets/icon.png';
import HeaderBg from '../../assets/splash-icon.png';
import { useCart } from '../context/CartContext';
import { eventService } from '../services/eventService';
import { promoService } from '../services/promoService';
import { ActivityIndicator } from 'react-native';

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }: any) => {
    const { isLoggedIn, user } = useAuth();
    const { cartCount } = useCart();
    const [activeIndex, setActiveIndex] = useState(0);
    const scrollViewRef = useRef<ScrollView>(null);
    const scrollY = useRef(new Animated.Value(0)).current;
    const [events, setEvents] = useState<any[]>([]);
    const [promos, setPromos] = useState<any[]>([]);
    const [isLoadingEvents, setIsLoadingEvents] = useState(true);

    const showAlert = (title: string) => {
        Alert.alert(title, "Fitur ini akan segera hadir.");
    };

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const [eventsData, promosData] = await Promise.all([
                    eventService.getEvents(),
                    promoService.getPromotions()
                ]);
                setEvents(eventsData);
                setPromos(promosData);
            } catch (error) {
                console.error('Failed to fetch home data:', error);
            } finally {
                setIsLoadingEvents(false);
            }
        };
        fetchInitialData();
    }, []);

    useEffect(() => {
        if (events.length === 0) return;

        const interval = setInterval(() => {
            const nextIndex = activeIndex === events.length - 1 ? 0 : activeIndex + 1;
            scrollViewRef.current?.scrollTo({
                x: nextIndex * width,
                animated: true,
            });
            setActiveIndex(nextIndex);
        }, 4000);

        return () => clearInterval(interval);
    }, [activeIndex, events]);

    const headerHeight = width * 1.1;

    // Parallax Interpolations
    const headerTranslate = scrollY.interpolate({
        inputRange: [0, headerHeight],
        outputRange: [0, headerHeight / 2], // Moves slower than scroll
        extrapolate: 'clamp',
    });

    const headerScale = scrollY.interpolate({
        inputRange: [-headerHeight, 0],
        outputRange: [2, 1],
        extrapolate: 'clamp',
    });

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

            {/* Absolute Header Overlay */}
            <LinearGradient
                colors={['rgba(0,0,0,0.8)', 'transparent']}
                style={styles.headerOverlay}
            >
                <View style={styles.headerContent}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                        <Image source={LogoImage} style={styles.headerLogo} resizeMode="contain" />
                        <View>
                            <Text style={styles.greetingSmall}>Selamat Datang,</Text>
                            <Text style={styles.greeting}>{isLoggedIn ? user?.name : 'Tamu Premium'}</Text>
                            {!isLoggedIn && (
                                <LinearGradient
                                    colors={['#444', '#222']}
                                    style={styles.membershipBadge}
                                >
                                    <Crown size={12} color="#AAA" />
                                    <Text style={[styles.membershipText, { color: '#AAA' }]}>GUEST MODE</Text>
                                </LinearGradient>
                            )}
                            {isLoggedIn && (
                                <LinearGradient
                                    colors={Colors.goldGradient as any}
                                    style={styles.membershipBadge}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 1 }}
                                >
                                    <Crown size={12} color="#000" />
                                    <Text style={[styles.membershipText, { color: '#000' }]}>ANGGOTA {user?.level || 'GOLD'}</Text>
                                </LinearGradient>
                            )}
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
                        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Search')}>
                            <Search size={24} color={Colors.text} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Cart')}>
                            <ShoppingCart size={24} color={Colors.text} />
                            {cartCount > 0 && (
                                <View style={styles.badge} />
                            )}
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Notification')}>
                            <Bell size={24} color={Colors.text} />
                            <View style={styles.badge} />
                        </TouchableOpacity>
                    </View>
                </View>
            </LinearGradient>

            <Animated.ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: true }
                )}
                scrollEventThrottle={16}
            >

                {/* Hero Carousel with Parallax */}
                <Animated.View style={[
                    styles.carouselContainer,
                    {
                        transform: [
                            { translateY: headerTranslate },
                            { scale: headerScale }
                        ]
                    }
                ]}>
                    <ScrollView
                        ref={scrollViewRef}
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ paddingHorizontal: 0 }}
                        onMomentumScrollEnd={(event) => {
                            const slideIndex = Math.ceil(event.nativeEvent.contentOffset.x / width);
                            setActiveIndex(slideIndex);
                        }}
                    >
                        {isLoadingEvents ? (
                            <View style={{ width, justifyContent: 'center', alignItems: 'center', backgroundColor: '#111' }}>
                                <ActivityIndicator color={Colors.primary} />
                            </View>
                        ) : events.map((event) => (
                            <TouchableOpacity key={event.id} style={styles.eventCard} activeOpacity={1}>
                                <Image
                                    source={{ uri: event.image }}
                                    style={styles.eventImage}
                                    resizeMode="cover"
                                />
                                <LinearGradient
                                    colors={['transparent', 'rgba(0,0,0,0.2)', '#000']}
                                    style={styles.eventGradient}
                                />
                            </TouchableOpacity>
                        ))}
                    </ScrollView>

                    {/* Pagination Bars */}
                    {!isLoadingEvents && (
                        <View style={styles.pagination}>
                            {events.map((_, index) => (
                                <View
                                    key={index}
                                    style={[
                                        styles.paginationBar,
                                        activeIndex === index ? styles.activeBar : styles.inactiveBar
                                    ]}
                                />
                            ))}
                        </View>
                    )}
                </Animated.View>

                {/* Member Info Card (Overlapping) */}
                <View style={styles.memberCardContainer}>
                    <View style={styles.memberCard}>
                        {/* Card Header */}
                        <View style={styles.memberCardHeader}>
                            <View style={styles.memberInfo}>
                                <View style={styles.coinContainer}>
                                    <Text style={styles.coinLabel}>Level</Text>
                                    <Text style={styles.coinValue}>{isLoggedIn ? user?.level || 'Gold' : '-'}</Text>
                                </View>
                                <View style={styles.divider} />
                                <View style={styles.coinContainer}>
                                    <Text style={styles.coinLabel}>QiuPoints</Text>
                                    <Text style={styles.coinValue}>{isLoggedIn ? user?.points?.toLocaleString() || '0' : '-'}</Text>
                                </View>
                                <View style={styles.divider} />
                                <View style={styles.coinContainer}>
                                    <Text style={styles.coinLabel}>Voucher</Text>
                                    <Text style={styles.coinValue}>{isLoggedIn ? 'Cek Voucher' : '-'}</Text>
                                </View>
                            </View>
                            <TouchableOpacity style={styles.voucherButton} onPress={() => navigation.navigate('Voucher')}>
                                <Ticket size={14} color={Colors.text} />
                                <Text style={styles.voucherButtonText}>Voucher Saya</Text>
                            </TouchableOpacity>
                        </View>

                        {/* Login/Upgrade Banner */}
                        <TouchableOpacity
                            onPress={() => navigation.navigate(isLoggedIn ? 'Profil' : 'Login')}
                            activeOpacity={0.9}
                        >
                            <LinearGradient
                                colors={Colors.goldGradient as any}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={styles.upgradeBannerGradient}
                            >
                                <View style={styles.upgradeBannerContent}>
                                    <Text style={styles.upgradeText}>
                                        {isLoggedIn ? 'Tingkatkan level membership Anda!' : 'Masuk untuk nikmati promo eksklusif!'}
                                    </Text>
                                    <View style={styles.joinButton}>
                                        <Text style={styles.joinButtonText}>{isLoggedIn ? 'Upgrade' : 'Masuk'}</Text>
                                    </View>
                                </View>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Quick Actions / Order Drinks */}
                <View style={styles.quickActionsContainer}>
                    <TouchableOpacity style={styles.quickActionButton} onPress={() => navigation.navigate('Menu')}>
                        <View style={styles.actionIconCircle}>
                            <Utensils size={24} color="#C6A234" />
                        </View>
                        <Text style={styles.actionText}>Pesan Menu</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.quickActionButton} onPress={() => navigation.navigate('BillInfo')}>
                        <View style={styles.actionIconCircle}>
                            <Wallet size={24} color="#C6A234" />
                        </View>
                        <Text style={styles.actionText}>Info Tagihan</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.quickActionButton}
                        onPress={() => navigation.navigate('MyBottles')}
                    >
                        <View style={styles.actionIconCircle}>
                            <Milk size={24} color="#C6A234" />
                        </View>
                        <Text style={styles.actionText}>Botol Saya</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.quickActionButton} onPress={() => showAlert('Layanan Bayar di Tempat')}>
                        <View style={styles.actionIconCircle}>
                            <Banknote size={24} color="#C6A234" />
                        </View>
                        <Text style={styles.actionText}>BAYAR DITEMPAT</Text>
                    </TouchableOpacity>

                </View>

                {/* Promo & Combo List */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>PROMO & PAKET</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Menu')}>
                        <Text style={styles.viewAllText}>LIHAT SEMUA</Text>
                    </TouchableOpacity>
                </View>

                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
                    {promos.map((promo: any) => (
                        <TouchableOpacity
                            key={promo.id}
                            style={styles.smallEventCard}
                            onPress={() => navigation.navigate('Menu')}
                        >
                            <Image
                                source={{ uri: promo.image || 'https://images.unsplash.com/photo-1569529465841-dfecdab7503b?q=80&w=1000' }}
                                style={styles.smallEventImage}
                            />
                            <LinearGradient
                                colors={['transparent', 'rgba(0,0,0,0.9)']}
                                style={styles.smallEventGradient}
                            >
                                <View style={styles.promoBadge}>
                                    <Text style={styles.promoBadgeText}>{promo.discount || 'PROMO'}</Text>
                                </View>
                                <Text style={styles.smallEventTitle} numberOfLines={1}>{promo.title}</Text>
                                <Text style={styles.smallEventDate}>{promo.description || promo.subtitle}</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                {/* Recommended Events Carousel */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>ACARA MENDATANG</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Events')}>
                        <Text style={styles.viewAllText}>LIHAT JADWAL</Text>
                    </TouchableOpacity>
                </View>

                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
                    {events.map((event: any) => (
                        <TouchableOpacity
                            key={event.id}
                            style={styles.largeEventCard}
                            onPress={() => navigation.navigate('Success', { title: 'Registrasi Berhasil', message: `Anda telah terdaftar untuk acara ${event.title}` })}
                        >
                            <Image
                                source={{ uri: event.image }}
                                style={styles.largeEventImage}
                            />
                            <LinearGradient
                                colors={['transparent', 'rgba(0,0,0,0.95)']}
                                style={styles.largeEventGradient}
                            >
                                <View style={styles.eventInfoBox}>
                                    <Text style={styles.eventDateText}>{event.date}</Text>
                                    <Text style={styles.eventTitleText}>{event.title}</Text>
                                    <View style={styles.eventTagRow}>
                                        <View style={styles.eventTag}>
                                            <Text style={styles.eventTagText}>SPECIAL EVENT</Text>
                                        </View>
                                        <Text style={styles.eventTimeText}>{event.time}</Text>
                                    </View>
                                </View>
                            </LinearGradient>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                <View style={{ height: 100 }} />
            </Animated.ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    headerOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        paddingTop: StatusBar.currentHeight ? StatusBar.currentHeight + 10 : 40,
        paddingBottom: 20,
    },
    headerContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: Spacing.md,
    },
    headerLogo: {
        width: 40,
        height: 40,
    },
    greetingSmall: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: 12,
        marginBottom: 2,
    },
    greeting: {
        color: Colors.text,
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 4,
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 3,
    },
    membershipBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
        marginTop: 4,
        alignSelf: 'flex-start',
    },
    membershipText: {
        color: '#FFD700',
        fontSize: 10,
        fontWeight: 'bold',
        marginLeft: 4,
    },
    iconButton: {
        padding: 8,
    },
    badge: {
        position: 'absolute',
        top: 6,
        right: 6,
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: Colors.danger,
    },
    scrollContent: {
        paddingTop: 0,
    },
    carouselContainer: {
        height: width * 1.1, // Slightly taller
        position: 'relative',
    },
    eventCard: {
        width: width,
        height: '100%',
        backgroundColor: 'transparent',
    },
    eventImage: {
        width: '100%',
        height: '100%',
    },
    eventGradient: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '40%',
    },
    pagination: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 60, // Moved up to account for overlapping card
        alignSelf: 'center',
        gap: 6,
    },
    paginationBar: {
        width: 20,
        height: 4,
        borderRadius: 2,
    },
    activeBar: {
        backgroundColor: '#FFD700', // Gold
        width: 30,
    },
    inactiveBar: {
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
    },
    memberCardContainer: {
        paddingHorizontal: Spacing.md,
        marginTop: -40, // Negative margin for overlap
        marginBottom: Spacing.xl,
    },
    memberCard: {
        backgroundColor: '#111',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#333',
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 8,
        elevation: 10,
    },
    memberCardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: Spacing.md,
        paddingVertical: Spacing.lg,
    },
    memberInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    coinContainer: {
        marginRight: 16,
    },
    coinLabel: {
        color: Colors.textMuted,
        fontSize: 10,
        marginBottom: 2,
    },
    coinValue: {
        color: Colors.text,
        fontSize: 16,
        fontWeight: 'bold',
    },
    divider: {
        width: 1,
        height: 20,
        backgroundColor: '#333',
        marginRight: 16,
    },
    voucherButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#222',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#333',
    },
    voucherButtonText: {
        color: Colors.text,
        fontSize: 11,
        fontWeight: '600',
        marginLeft: 6,
    },
    upgradeBannerGradient: {
        height: 50,
    },
    upgradeBannerTexture: {
        flex: 1,
    },
    upgradeBannerContent: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: Spacing.md,
    },
    upgradeBanner: {
        backgroundColor: '#F5D04C', // Yellow banner
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: Spacing.md,
        paddingVertical: 12,
    },
    upgradeText: {
        color: '#000',
        fontSize: 11,
        fontWeight: 'bold',
        flex: 1,
    },
    joinButton: {
        backgroundColor: '#000',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
    },
    joinButtonText: {
        color: '#F5D04C',
        fontSize: 10,
        fontWeight: 'bold',
    },
    quickActionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingHorizontal: Spacing.md,
        marginBottom: Spacing.xl,
    },
    quickActionButton: {
        alignItems: 'center',
    },
    actionIconCircle: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#1E1E1E',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
        borderWidth: 1,
        borderColor: '#333',
    },
    actionText: {
        color: Colors.textMuted,
        fontSize: 11,
    },
    headerLoginButton: {
        backgroundColor: Colors.primary,
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 12,
        marginRight: 4,
    },
    headerLoginButtonText: {
        color: Colors.background,
        fontSize: 12,
        fontWeight: 'bold',
        letterSpacing: 0.5,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: Spacing.md,
        marginTop: Spacing.sm,
        paddingHorizontal: Spacing.md,
    },
    sectionTitle: {
        fontSize: 15,
        fontWeight: 'bold',
        color: Colors.text,
        letterSpacing: 0.5,
    },
    viewAllText: {
        fontSize: 11,
        color: Colors.primary,
        fontWeight: '600',
    },
    horizontalScroll: {
        marginHorizontal: -Spacing.md,
        paddingLeft: Spacing.md,
        marginBottom: Spacing.xl,
    },
    smallEventCard: {
        width: 280,
        height: 150,
        borderRadius: 12,
        overflow: 'hidden',
        marginRight: 12,
        backgroundColor: Colors.card,
    },
    smallEventImage: {
        width: '100%',
        height: '100%',
    },
    smallEventGradient: {
        flex: 1,
        justifyContent: 'flex-end',
        padding: 10,
    },
    smallEventTitle: {
        color: Colors.text,
        fontSize: 12,
        fontWeight: 'bold',
        marginBottom: 2,
    },
    smallEventDate: {
        color: Colors.primary,
        fontSize: 10,
    },
    roomsGrid: {
        flexDirection: 'row',
        paddingHorizontal: Spacing.md,
        gap: 12,
    },
    roomCard: {
        flex: 1,
        backgroundColor: Colors.card,
        borderRadius: 20,
        padding: Spacing.md,
        borderWidth: 1,
        borderColor: '#222',
    },
    roomIconBg: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: 'rgba(198, 162, 52, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    roomTitle: {
        color: Colors.text,
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 6,
    },
    roomDesc: {
        color: Colors.textMuted,
        fontSize: 10,
        lineHeight: 14,
        marginBottom: 10,
    },
    roomAction: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    roomActionText: {
        color: Colors.primary,
        fontSize: 11,
        fontWeight: 'bold',
        marginRight: 4,
    },
    promoBadge: {
        backgroundColor: Colors.primary,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
        alignSelf: 'flex-start',
        marginBottom: 8,
    },
    promoBadgeText: {
        color: Colors.background,
        fontSize: 10,
        fontWeight: 'bold',
    },
    largeEventCard: {
        width: width * 0.8,
        aspectRatio: 9 / 16,
        backgroundColor: '#111',
        borderRadius: 24,
        marginLeft: Spacing.md,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#222',
        marginBottom: 20,
    },
    largeEventImage: {
        width: '100%',
        height: '100%',
    },
    largeEventGradient: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '50%',
        padding: 20,
        justifyContent: 'flex-end',
    },
    eventInfoBox: {
        gap: 8,
    },
    eventDateText: {
        color: Colors.primary,
        fontSize: 12,
        fontWeight: '900',
        letterSpacing: 1,
    },
    eventTitleText: {
        color: '#FFF',
        fontSize: 22,
        fontWeight: 'bold',
    },
    eventTagRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginTop: 4,
    },
    eventTag: {
        backgroundColor: 'rgba(198, 162, 52, 0.2)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: 'rgba(198, 162, 52, 0.3)',
    },
    eventTagText: {
        color: Colors.primary,
        fontSize: 10,
        fontWeight: 'bold',
    },
    eventTimeText: {
        color: Colors.textMuted,
        fontSize: 12,
    },
});

export default HomeScreen;
