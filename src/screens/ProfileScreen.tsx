import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import {
    User,
    Mail,
    Phone,
    MapPin,
    Camera,
    Star,
    Calendar,
    ChevronRight,
    Crown,
    Receipt,
    CreditCard
} from 'lucide-react-native';
import { Colors, Spacing } from '../theme/Theme';
import { useAuth } from '../context/AuthContext';
import LogoQiuQiu from '../../assets/logo-qiuqiu.png';
import GoldButton from '../components/GoldButton';
import SilverButton from '../components/SilverButton';

const ProfileScreen = ({ navigation }: any) => {
    const { isLoggedIn, logout } = useAuth();

    if (!isLoggedIn) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.loginPromptContainer}>
                    <View style={styles.promoIconContainer}>
                        <Image source={LogoQiuQiu} style={styles.promoLogo} resizeMode="contain" />
                    </View>
                    <Text style={styles.promoTitle}>Member Eksklusif</Text>
                    <Text style={styles.promoSubtitle}>
                        Masuk untuk menikmati fitur reservasi, poin loyalitas, dan penawaran khusus member lainnya.
                    </Text>

                    <GoldButton
                        title="MASUK SEKARANG"
                        onPress={() => navigation.navigate('Login')}
                        style={{ width: '100%', marginBottom: 16 }}
                    />

                    <TouchableOpacity
                        style={styles.outlineRegisterButton}
                        onPress={() => navigation.navigate('Register')}
                    >
                        <Text style={styles.outlineRegisterButtonText}>Daftar Akun Baru</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

                {/* Profile Header Card */}
                <View style={styles.profileCard}>
                    {/* Gold Member Badge */}
                    <View style={styles.memberBadge}>
                        <Text style={styles.memberBadgeText}>ANGGOTA GOLD</Text>
                    </View>

                    {/* Avatar */}
                    <View style={styles.avatarContainer}>
                        <LinearGradient
                            colors={[Colors.primary, '#D4AF37']}
                            style={styles.avatarBorder}
                        >
                            <View style={styles.avatarInner}>
                                <Image
                                    source={{ uri: 'https://i.pravatar.cc/150?img=12' }}
                                    style={styles.avatarImage}
                                />
                            </View>
                        </LinearGradient>
                        <TouchableOpacity style={styles.cameraButton}>
                            <Camera size={16} color={Colors.background} />
                        </TouchableOpacity>
                    </View>

                    {/* User Info */}
                    <Text style={styles.userName}>Dimas Anggara</Text>
                    <Text style={styles.userEmail}>dimas@customer.com</Text>

                    <TouchableOpacity
                        style={styles.editProfileSmallBtn}
                        onPress={() => navigation.navigate('EditProfile')}
                    >
                        <Text style={styles.editProfileSmallBtnText}>Ubah Profil</Text>
                    </TouchableOpacity>

                    {/* Points Badge */}
                    <View style={styles.pointsBadge}>
                        <Star size={16} color={Colors.primary} fill={Colors.primary} />
                        <Text style={styles.pointsText}>2.453 PTS</Text>
                    </View>
                </View>

                {/* Action Buttons */}
                <View style={styles.actionContainer}>
                    <GoldButton
                        title="RESERVASI SAYA"
                        onPress={() => navigation.navigate('MyBooking')}
                        icon={<Calendar size={20} color="#000" />}
                        style={{ marginBottom: 12 }}
                    />
                    <SilverButton
                        title="RIWAYAT TRANSAKSI"
                        onPress={() => navigation.navigate('TransactionHistory')}
                        icon={<Receipt size={20} color="#000" />}
                    />
                </View>

                {/* Account Details Section */}
                <Text style={styles.sectionTitle}>Informasi Pribadi</Text>

                {/* Full Name */}
                <View style={styles.detailCard}>
                    <View style={styles.iconBox}>
                        <User size={20} color={Colors.primary} />
                    </View>
                    <View style={styles.detailContent}>
                        <Text style={styles.detailLabel}>NAMA LENGKAP</Text>
                        <Text style={styles.detailValue}>Dimas Anggara</Text>
                    </View>
                </View>

                {/* Email */}
                <View style={styles.detailCard}>
                    <View style={styles.iconBox}>
                        <Mail size={20} color={Colors.primary} />
                    </View>
                    <View style={styles.detailContent}>
                        <Text style={styles.detailLabel}>ALAMAT EMAIL</Text>
                        <Text style={styles.detailValue}>dimas@customer.com</Text>
                    </View>
                </View>

                {/* Phone */}
                <View style={styles.detailCard}>
                    <View style={styles.iconBox}>
                        <Phone size={20} color={Colors.primary} />
                    </View>
                    <View style={styles.detailContent}>
                        <Text style={styles.detailLabel}>NOMOR TELEPON</Text>
                        <Text style={styles.detailValue}>08123456789</Text>
                    </View>
                </View>

                {/* Address */}
                <View style={styles.detailCard}>
                    <View style={styles.iconBox}>
                        <MapPin size={20} color={Colors.primary} />
                    </View>
                    <View style={styles.detailContent}>
                        <Text style={styles.detailLabel}>ALAMAT</Text>
                        <Text style={styles.detailValue}>Jl. Senopati No. 12, Kebayoran Baru, Jakarta Selatan</Text>
                    </View>
                </View>

                <TouchableOpacity style={styles.logoutButton} onPress={logout}>
                    <Text style={styles.logoutText}>Keluar Akun</Text>
                </TouchableOpacity>

                <View style={{ height: 100 }} />
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    scrollContent: {
        padding: Spacing.md,
    },
    profileCard: {
        backgroundColor: Colors.card,
        borderRadius: 24,
        padding: Spacing.xl,
        alignItems: 'center',
        marginBottom: Spacing.xl,
        borderWidth: 1,
        borderColor: '#222',
        position: 'relative',
    },
    memberBadge: {
        position: 'absolute',
        top: 20,
        right: 20,
        backgroundColor: 'rgba(198, 162, 52, 0.15)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: 'rgba(198, 162, 52, 0.3)',
    },
    memberBadgeText: {
        color: Colors.primary,
        fontSize: 10,
        fontWeight: 'bold',
        letterSpacing: 1,
    },
    avatarContainer: {
        position: 'relative',
        marginTop: 20,
        marginBottom: 16,
    },
    avatarBorder: {
        width: 120,
        height: 120,
        borderRadius: 60,
        padding: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarInner: {
        width: 112,
        height: 112,
        borderRadius: 56,
        backgroundColor: Colors.card,
        overflow: 'hidden',
    },
    avatarImage: {
        width: '100%',
        height: '100%',
    },
    cameraButton: {
        position: 'absolute',
        bottom: 4,
        right: 4,
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: Colors.card,
    },
    userName: {
        color: Colors.text,
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    userEmail: {
        color: Colors.textMuted,
        fontSize: 14,
        marginBottom: 8,
    },
    editProfileSmallBtn: {
        backgroundColor: 'rgba(255,255,255,0.05)',
        paddingHorizontal: 16,
        paddingVertical: 6,
        borderRadius: 12,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#333',
    },
    editProfileSmallBtnText: {
        color: Colors.primary,
        fontSize: 11,
        fontWeight: 'bold',
    },
    pointsBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        backgroundColor: 'rgba(198, 162, 52, 0.1)',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'rgba(198, 162, 52, 0.3)',
    },
    pointsText: {
        color: Colors.primary,
        fontSize: 16,
        fontWeight: 'bold',
    },
    sectionTitle: {
        color: Colors.text,
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: Spacing.md,
    },
    detailCard: {
        flexDirection: 'row',
        backgroundColor: Colors.card,
        padding: Spacing.md,
        borderRadius: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#181818',
    },
    iconBox: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: 'rgba(198, 162, 52, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    detailContent: {
        flex: 1,
        justifyContent: 'center',
    },
    detailLabel: {
        color: Colors.textMuted,
        fontSize: 10,
        fontWeight: 'bold',
        letterSpacing: 0.5,
        marginBottom: 4,
    },
    detailValue: {
        color: Colors.text,
        fontSize: 15,
        fontWeight: '600',
        lineHeight: 20,
    },
    actionContainer: {
        marginBottom: Spacing.xl,
    },
    reservasiButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.primary,
        paddingHorizontal: 20,
        paddingVertical: 18,
        borderRadius: 20,
        justifyContent: 'space-between',
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 15,
        elevation: 8,
    },
    reservasiButtonText: {
        color: Colors.background,
        fontSize: 16,
        fontWeight: '900',
        letterSpacing: 1,
        flex: 1,
        marginLeft: 15,
    },
    loginPromptContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: Spacing.xl,
        backgroundColor: Colors.background,
    },
    promoIconContainer: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: 'rgba(198, 162, 52, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,
    },
    promoLogo: {
        width: 100,
        height: 100,
    },
    promoTitle: {
        color: Colors.text,
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },
    promoSubtitle: {
        color: Colors.textMuted,
        fontSize: 16,
        textAlign: 'center',
        lineHeight: 24,
        marginBottom: 40,
    },
    mainLoginButton: {
        backgroundColor: Colors.primary,
        width: '100%',
        height: 60,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    mainLoginButtonText: {
        color: Colors.background,
        fontSize: 16,
        fontWeight: 'bold',
        letterSpacing: 1,
    },
    outlineRegisterButton: {
        width: '100%',
        height: 60,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#333',
        justifyContent: 'center',
        alignItems: 'center',
    },
    outlineRegisterButtonText: {
        color: Colors.text,
        fontSize: 16,
        fontWeight: '600',
    },
    logoutButton: {
        marginTop: 40,
        padding: 20,
        borderRadius: 16,
        backgroundColor: 'rgba(255, 75, 75, 0.1)',
        borderWidth: 1,
        borderColor: 'rgba(255, 75, 75, 0.2)',
        alignItems: 'center',
    },
    logoutText: {
        color: '#FF4B4B',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ProfileScreen;
