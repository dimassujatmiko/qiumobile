import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Beer, Clock, Calendar, ChevronRight, Info } from 'lucide-react-native';
import { Colors, Spacing } from '../theme/Theme';
import { LinearGradient } from 'expo-linear-gradient';

const MyBottlesScreen = ({ navigation }: any) => {
    const myBottles = [
        {
            id: '1',
            name: 'Macallan 12Y Double Cask',
            image: 'https://images.unsplash.com/photo-1599542424508-344f68694039?q=80&w=1000',
            remaining: '65%',
            expiry: '14 Mar 2026',
            depositedDate: '14 Feb 2026',
            bottleCode: 'QQ-8829-X',
            status: 'Tersimpan'
        },
        {
            id: '2',
            name: 'Hendrick\'s Gin',
            image: 'https://images.unsplash.com/photo-1551028150-64b9f398f678?q=80&w=1000',
            remaining: '30%',
            expiry: '02 Apr 2026',
            depositedDate: '02 Jan 2026',
            bottleCode: 'QQ-7712-B',
            status: 'Aktif'
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
                    <Text style={styles.headerTitle}>BOTOL SAYA</Text>
                    <View style={{ width: 40 }} />
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                    {/* Bottle Storage Policy Notice */}
                    <View style={styles.infoBanner}>
                        <Info size={18} color={Colors.primary} />
                        <Text style={styles.infoText}>
                            Botol Anda akan disimpan maksimal selama 3 bulan dari tanggal penitipan.
                        </Text>
                    </View>

                    {/* Bottles List */}
                    {myBottles.map((bottle) => (
                        <TouchableOpacity key={bottle.id} style={styles.bottleCard} activeOpacity={0.9}>
                            <View style={styles.bottleImageContainer}>
                                <Image source={{ uri: bottle.image }} style={styles.bottleImage} />
                                <View style={styles.statusBadge}>
                                    <Text style={styles.statusText}>{bottle.status}</Text>
                                </View>
                            </View>

                            <View style={styles.bottleInfo}>
                                <Text style={styles.bottleName}>{bottle.name}</Text>
                                <Text style={styles.bottleCode}>{bottle.bottleCode}</Text>

                                <View style={styles.progressSection}>
                                    <View style={styles.progressHeader}>
                                        <Text style={styles.progressLabel}>Volume Tersisa</Text>
                                        <Text style={styles.progressValue}>{bottle.remaining}</Text>
                                    </View>
                                    <View style={styles.progressBarBg}>
                                        <View style={[styles.progressBarFill, { width: bottle.remaining as any }]} />
                                    </View>
                                </View>

                                <View style={styles.metaInfo}>
                                    <View style={styles.metaItem}>
                                        <Calendar size={12} color={Colors.textMuted} />
                                        <Text style={styles.metaText}>Exp: {bottle.expiry}</Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))}

                    {/* Empty State / Bottom Add Button */}
                    <TouchableOpacity style={styles.emptyCard}>
                        <View style={styles.addIconCircle}>
                            <Beer size={24} color={Colors.primary} />
                        </View>
                        <Text style={styles.emptyCardTitle}>Ada botol baru untuk dititipkan?</Text>
                        <Text style={styles.emptyCardSubtitle}>Hubungi staf resepsionis atau server kami di outlet.</Text>
                    </TouchableOpacity>
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
        letterSpacing: 2,
    },
    scrollContent: {
        padding: Spacing.md,
    },
    infoBanner: {
        flexDirection: 'row',
        backgroundColor: 'rgba(198, 162, 52, 0.05)',
        padding: 16,
        borderRadius: 16,
        marginBottom: 24,
        alignItems: 'center',
        gap: 12,
        borderWidth: 1,
        borderColor: 'rgba(198, 162, 52, 0.2)',
    },
    infoText: {
        flex: 1,
        color: Colors.textMuted,
        fontSize: 12,
        lineHeight: 18,
    },
    bottleCard: {
        flexDirection: 'row',
        backgroundColor: Colors.card,
        borderRadius: 24,
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#222',
        alignItems: 'center',
    },
    bottleImageContainer: {
        width: 80,
        height: 100,
        borderRadius: 16,
        backgroundColor: '#1A1A1A',
        overflow: 'hidden',
        position: 'relative',
    },
    bottleImage: {
        width: '100%',
        height: '100%',
    },
    statusBadge: {
        position: 'absolute',
        top: 6,
        left: 6,
        backgroundColor: 'rgba(0,0,0,0.6)',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
    },
    statusText: {
        color: Colors.primary,
        fontSize: 8,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    bottleInfo: {
        flex: 1,
        marginLeft: 20,
    },
    bottleName: {
        color: Colors.text,
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 2,
    },
    bottleCode: {
        color: Colors.primary,
        fontSize: 11,
        fontWeight: '600',
        marginBottom: 12,
    },
    progressSection: {
        marginBottom: 12,
    },
    progressHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 6,
    },
    progressLabel: {
        color: Colors.textMuted,
        fontSize: 10,
    },
    progressValue: {
        color: Colors.text,
        fontSize: 10,
        fontWeight: 'bold',
    },
    progressBarBg: {
        height: 4,
        backgroundColor: '#1A1A1A',
        borderRadius: 2,
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: Colors.primary,
        borderRadius: 2,
    },
    metaInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    metaItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    metaText: {
        color: Colors.textMuted,
        fontSize: 10,
    },
    emptyCard: {
        backgroundColor: 'rgba(255,255,255,0.02)',
        borderRadius: 24,
        padding: 30,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#1A1A1A',
        borderStyle: 'dashed',
        marginTop: 10,
    },
    addIconCircle: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#111',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    emptyCardTitle: {
        color: Colors.text,
        fontSize: 15,
        fontWeight: 'bold',
        marginBottom: 8,
        textAlign: 'center',
    },
    emptyCardSubtitle: {
        color: Colors.textMuted,
        fontSize: 12,
        textAlign: 'center',
        lineHeight: 18,
    },
});

export default MyBottlesScreen;
