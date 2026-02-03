import React, { useRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Animated, Dimensions, StatusBar, Linking, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Calendar, MapPin, Clock, MessageCircle, Ticket, Share2 } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Spacing } from '../theme/Theme';

const { width } = Dimensions.get('window');
const HEADER_HEIGHT = 400;

const EventDetailScreen = ({ route, navigation }: any) => {
    const { event } = route.params;
    const scrollY = useRef(new Animated.Value(0)).current;

    const handleWhatsApp = () => {
        const message = `Halo, saya ingin reservasi untuk acara ${event.title} pada tanggal ${event.fullDate || event.date}.`;
        const url = `whatsapp://send?phone=628111624898&text=${encodeURIComponent(message)}`;
        Linking.openURL(url).catch(() => {
            alert('Pastikan WhatsApp terpasang di perangkat Anda');
        });
    };

    // Parallax animations
    const headerTranslate = scrollY.interpolate({
        inputRange: [0, HEADER_HEIGHT],
        outputRange: [0, -HEADER_HEIGHT / 3],
        extrapolate: 'clamp',
    });

    const headerScale = scrollY.interpolate({
        inputRange: [-HEADER_HEIGHT, 0],
        outputRange: [2, 1],
        extrapolate: 'clamp',
    });

    const headerOpacity = scrollY.interpolate({
        inputRange: [0, HEADER_HEIGHT / 2],
        outputRange: [1, 0],
        extrapolate: 'clamp',
    });

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

            {/* Parallax Header */}
            <Animated.View style={[
                styles.header,
                { transform: [{ translateY: headerTranslate }, { scale: headerScale }] }
            ]}>
                <Image source={{ uri: event.image }} style={styles.headerImage} />
                <LinearGradient
                    colors={['transparent', 'rgba(0,0,0,0.5)', Colors.background]}
                    style={styles.headerGradient}
                />
            </Animated.View>

            {/* Sticky Top Bar Overlay */}
            <SafeAreaView style={styles.topBar}>
                <TouchableOpacity style={styles.iconButton} onPress={() => navigation.goBack()}>
                    <ArrowLeft size={24} color={Colors.text} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconButton}>
                    <Share2 size={22} color={Colors.text} />
                </TouchableOpacity>
            </SafeAreaView>

            <Animated.ScrollView
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: true }
                )}
                scrollEventThrottle={16}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                <View style={styles.detailsContainer}>
                    <Animated.View style={{ opacity: headerOpacity }}>
                        <Text style={styles.categoryText}>ACARA SPESIAL</Text>
                        <Text style={styles.title}>{event.title}</Text>
                    </Animated.View>

                    <View style={styles.metaContainer}>
                        <View style={styles.metaRow}>
                            <View style={styles.iconBox}>
                                <Calendar size={20} color={Colors.primary} />
                            </View>
                            <View>
                                <Text style={styles.metaLabel}>Tanggal</Text>
                                <Text style={styles.metaValue}>{event.fullDate || event.date}</Text>
                            </View>
                        </View>

                        <View style={styles.metaRow}>
                            <View style={styles.iconBox}>
                                <Clock size={20} color={Colors.primary} />
                            </View>
                            <View>
                                <Text style={styles.metaLabel}>Waktu</Text>
                                <Text style={styles.metaValue}>{event.time || '22:00 WIB - Selesai'}</Text>
                            </View>
                        </View>

                        <View style={styles.metaRow}>
                            <View style={styles.iconBox}>
                                <MapPin size={20} color={Colors.primary} />
                            </View>
                            <View>
                                <Text style={styles.metaLabel}>Lokasi</Text>
                                <Text style={styles.metaValue}>{event.location || 'Main Hall, Jakarta'}</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.divider} />

                    <Text style={styles.sectionTitle}>Tentang acara ini</Text>
                    <Text style={styles.description}>
                        {event.description || 'Bergabunglah dengan kami untuk malam yang tak terlupakan penuh musik dan perayaan. Acara khusus ini menghadirkan penampil papan atas dan suasana yang tidak akan Anda temukan di tempat lain. Amankan tempat Anda sekarang untuk menjadi bagian dari kemeriahan ini.'}
                    </Text>

                    <View style={{ height: 100 }} />
                </View>
            </Animated.ScrollView>

            {/* Bottom Actions */}
            <SafeAreaView edges={['bottom']} style={styles.bottomActions}>
                <TouchableOpacity style={styles.whatsappButton} onPress={handleWhatsApp}>
                    <MessageCircle size={20} color={Colors.text} />
                    <Text style={styles.whatsappText}>WhatsApp</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.secureButton}
                    onPress={() => navigation.navigate('BookingForm', { roomName: event.title })}
                >
                    <Ticket size={20} color={Colors.background} style={{ marginRight: 8 }} />
                    <Text style={styles.secureButtonText}>PESAN MEJA</Text>
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
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: HEADER_HEIGHT,
        zIndex: 0,
    },
    headerImage: {
        width: '100%',
        height: '100%',
    },
    headerGradient: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '60%',
    },
    topBar: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
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
    scrollContent: {
        paddingTop: HEADER_HEIGHT - 60,
    },
    detailsContainer: {
        backgroundColor: Colors.background,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: Spacing.lg,
        minHeight: 500,
    },
    categoryText: {
        color: Colors.primary,
        fontSize: 12,
        fontWeight: 'bold',
        letterSpacing: 2,
        marginBottom: 8,
    },
    title: {
        color: Colors.text,
        fontSize: 32,
        fontWeight: '900',
        marginBottom: 24,
    },
    metaContainer: {
        gap: 20,
        marginBottom: 30,
    },
    metaRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    iconBox: {
        width: 44,
        height: 44,
        borderRadius: 12,
        backgroundColor: 'rgba(198, 162, 52, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    metaLabel: {
        color: Colors.textMuted,
        fontSize: 12,
        marginBottom: 2,
    },
    metaValue: {
        color: Colors.text,
        fontSize: 15,
        fontWeight: 'bold',
    },
    divider: {
        height: 1,
        backgroundColor: '#1A1A1A',
        marginVertical: 20,
    },
    sectionTitle: {
        color: Colors.text,
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    description: {
        color: Colors.textMuted,
        fontSize: 15,
        lineHeight: 24,
    },
    bottomActions: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        padding: Spacing.md,
        backgroundColor: '#0D0D0D',
        borderTopWidth: 1,
        borderTopColor: '#1A1A1A',
        gap: 12,
    },
    whatsappButton: {
        flex: 1,
        height: 54,
        borderRadius: 15,
        backgroundColor: '#111',
        borderWidth: 1,
        borderColor: '#333',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
    },
    whatsappText: {
        color: Colors.text,
        fontSize: 14,
        fontWeight: 'bold',
    },
    secureButton: {
        flex: 2,
        height: 54,
        borderRadius: 15,
        backgroundColor: Colors.primary,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    secureButtonText: {
        color: Colors.background,
        fontSize: 14,
        fontWeight: '900',
    },
});

export default EventDetailScreen;
