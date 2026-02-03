import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Camera, User, Mail, Phone, Lock, MapPin } from 'lucide-react-native';
import { Colors, Spacing } from '../theme/Theme';
import { useAuth } from '../context/AuthContext';
import { LinearGradient } from 'expo-linear-gradient';

const EditProfileScreen = ({ navigation }: any) => {
    const { user } = useAuth();
    const [name, setName] = useState(user?.name || 'Dimas Anggara');
    const [email, setEmail] = useState(user?.email || 'dimas.anggara@email.com');
    const [phone, setPhone] = useState('+62 812 3456 7890');
    const [address, setAddress] = useState('Jl. Senopati No. 12, Kebayoran Baru, Jakarta Selatan');

    const handleSave = () => {
        Alert.alert('Profil Diperbarui', 'Data profil Anda telah berhasil disimpan.', [
            { text: 'OK', onPress: () => navigation.goBack() }
        ]);
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
                    <Text style={styles.headerTitle}>UBAH PROFIL</Text>
                    <TouchableOpacity onPress={handleSave}>
                        <Text style={styles.saveButtonText}>SIMPAN</Text>
                    </TouchableOpacity>
                </View>

                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={{ flex: 1 }}
                >
                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                        {/* Avatar Section */}
                        <View style={styles.avatarSection}>
                            <View style={styles.avatarContainer}>
                                <Image
                                    source={{ uri: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1000' }}
                                    style={styles.avatar}
                                />
                                <TouchableOpacity style={styles.cameraButton}>
                                    <Camera size={20} color={Colors.background} />
                                </TouchableOpacity>
                            </View>
                            <Text style={styles.changePhotoText}>Ubah Foto Profil</Text>
                        </View>

                        {/* Form Section */}
                        <View style={styles.form}>
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>NAMA LENGKAP</Text>
                                <View style={styles.inputWrapper}>
                                    <User size={20} color={Colors.primary} />
                                    <TextInput
                                        style={styles.input}
                                        value={name}
                                        onChangeText={setName}
                                        placeholderTextColor="#666"
                                        placeholder="Masukkan nama lengkap"
                                    />
                                </View>
                            </View>

                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>ALAMAT EMAIL</Text>
                                <View style={styles.inputWrapper}>
                                    <Mail size={20} color={Colors.primary} />
                                    <TextInput
                                        style={styles.input}
                                        value={email}
                                        onChangeText={setEmail}
                                        placeholderTextColor="#666"
                                        placeholder="Masukkan email"
                                        keyboardType="email-address"
                                        autoCapitalize="none"
                                    />
                                </View>
                            </View>

                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>NOMOR TELEPON</Text>
                                <View style={styles.inputWrapper}>
                                    <Phone size={20} color={Colors.primary} />
                                    <TextInput
                                        style={styles.input}
                                        value={phone}
                                        onChangeText={setPhone}
                                        placeholderTextColor="#666"
                                        placeholder="Masukkan nomor telepon"
                                        keyboardType="phone-pad"
                                    />
                                </View>
                            </View>

                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>ALAMAT</Text>
                                <View style={styles.inputWrapper}>
                                    <MapPin size={20} color={Colors.primary} />
                                    <TextInput
                                        style={styles.input}
                                        value={address}
                                        onChangeText={setAddress}
                                        placeholderTextColor="#666"
                                        placeholder="Masukkan alamat lengkap"
                                        multiline
                                    />
                                </View>
                            </View>

                            <View style={styles.divider} />

                            <TouchableOpacity style={styles.changePasswordButton}>
                                <View style={styles.leftBtn}>
                                    <Lock size={20} color={Colors.textMuted} />
                                    <Text style={styles.changePasswordText}>Ubah Kata Sandi</Text>
                                </View>
                                <ArrowLeft size={20} color={Colors.textMuted} style={{ transform: [{ rotate: '180deg' }] }} />
                            </TouchableOpacity>
                        </View>

                        <View style={{ height: 40 }} />
                    </ScrollView>
                </KeyboardAvoidingView>
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
    saveButtonText: {
        color: Colors.primary,
        fontSize: 14,
        fontWeight: 'bold',
        padding: 8,
    },
    scrollContent: {
        padding: Spacing.md,
    },
    avatarSection: {
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 40,
    },
    avatarContainer: {
        position: 'relative',
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 2,
        borderColor: Colors.primary,
    },
    cameraButton: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: Colors.primary,
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: Colors.background,
    },
    changePhotoText: {
        color: Colors.primary,
        fontSize: 14,
        fontWeight: '600',
        marginTop: 16,
    },
    form: {
        gap: 20,
    },
    inputGroup: {
        gap: 8,
    },
    label: {
        color: Colors.textMuted,
        fontSize: 10,
        fontWeight: 'bold',
        letterSpacing: 1.5,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#1A1A1A',
        paddingHorizontal: 16,
        height: 56,
    },
    input: {
        flex: 1,
        color: Colors.text,
        fontSize: 15,
        marginLeft: 12,
    },
    divider: {
        height: 1,
        backgroundColor: '#1A1A1A',
        marginVertical: 10,
    },
    changePasswordButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.03)',
        padding: 16,
        borderRadius: 16,
    },
    leftBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    changePasswordText: {
        color: Colors.text,
        fontSize: 14,
        fontWeight: '600',
    },
});

export default EditProfileScreen;
