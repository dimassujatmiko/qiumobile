import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Dimensions, StatusBar, KeyboardAvoidingView, Platform, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Mail, Lock, User, Phone, ArrowLeft, CheckCircle2 } from 'lucide-react-native';
import { Colors, Spacing } from '../theme/Theme';

const { width } = Dimensions.get('window');

const RegisterScreen = ({ navigation }: any) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<any>({});

    const handleRegister = () => {
        let newErrors: any = {};
        if (!formData.name) newErrors.name = 'Nama lengkap wajib diisi';
        if (!formData.email) newErrors.email = 'Email wajib diisi';
        if (!formData.phone) newErrors.phone = 'Nomor telepon wajib diisi';
        if (!formData.password) newErrors.password = 'Kata sandi wajib diisi';
        if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Kata sandi tidak cocok';

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            setIsLoading(true);
            setTimeout(() => {
                setIsLoading(false);
                Alert.alert("Berhasil", "Akun berhasil dibuat", [
                    { text: "OK", onPress: () => navigation.navigate('Login') }
                ]);
            }, 2000);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" />

            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <ArrowLeft size={24} color={Colors.text} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Daftar Akun</Text>
                <View style={{ width: 40 }} />
            </View>

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                    <Text style={styles.subtitle}>Bergabunglah dengan klub member eksklusif kami dan dapatkan keuntungan premium.</Text>

                    <View style={styles.formContainer}>
                        {/* Name */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>NAMA LENGKAP</Text>
                            <View style={[styles.inputWrapper, errors.name && styles.inputError]}>
                                <User size={20} color="#666" />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Masukkan nama lengkap"
                                    placeholderTextColor="#444"
                                    value={formData.name}
                                    onChangeText={(val) => setFormData({ ...formData, name: val })}
                                />
                            </View>
                            {errors.name && <Text style={{ color: Colors.danger, fontSize: 10, marginTop: 4 }}>{errors.name}</Text>}
                        </View>

                        {/* Email */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>ALAMAT EMAIL</Text>
                            <View style={[styles.inputWrapper, errors.email && styles.inputError]}>
                                <Mail size={20} color="#666" />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Masukkan email"
                                    placeholderTextColor="#444"
                                    value={formData.email}
                                    onChangeText={(val) => setFormData({ ...formData, email: val })}
                                    autoCapitalize="none"
                                />
                            </View>
                            {errors.email && <Text style={{ color: Colors.danger, fontSize: 10, marginTop: 4 }}>{errors.email}</Text>}
                        </View>

                        {/* Phone */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>NOMOR TELEPON</Text>
                            <View style={[styles.inputWrapper, errors.phone && styles.inputError]}>
                                <Phone size={20} color="#666" />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Masukkan nomor telepon"
                                    placeholderTextColor="#444"
                                    value={formData.phone}
                                    onChangeText={(val) => setFormData({ ...formData, phone: val })}
                                    keyboardType="phone-pad"
                                />
                            </View>
                            {errors.phone && <Text style={{ color: Colors.danger, fontSize: 10, marginTop: 4 }}>{errors.phone}</Text>}
                        </View>

                        {/* Password */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>KATA SANDI</Text>
                            <View style={[styles.inputWrapper, errors.password && styles.inputError]}>
                                <Lock size={20} color="#666" />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Buat kata sandi"
                                    placeholderTextColor="#444"
                                    secureTextEntry
                                    value={formData.password}
                                    onChangeText={(val) => setFormData({ ...formData, password: val })}
                                />
                            </View>
                            {errors.password && <Text style={{ color: Colors.danger, fontSize: 10, marginTop: 4 }}>{errors.password}</Text>}
                        </View>

                        {/* Confirm Password */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>KONFIRMASI KATA SANDI</Text>
                            <View style={[styles.inputWrapper, errors.confirmPassword && styles.inputError]}>
                                <CheckCircle2 size={20} color="#666" />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Ulangi kata sandi Anda"
                                    placeholderTextColor="#444"
                                    secureTextEntry
                                    value={formData.confirmPassword}
                                    onChangeText={(val) => setFormData({ ...formData, confirmPassword: val })}
                                />
                            </View>
                            {errors.confirmPassword && <Text style={{ color: Colors.danger, fontSize: 10, marginTop: 4 }}>{errors.confirmPassword}</Text>}
                        </View>

                        <TouchableOpacity
                            style={styles.registerButton}
                            onPress={handleRegister}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <ActivityIndicator color={Colors.background} size="small" />
                            ) : (
                                <Text style={styles.registerButtonText}>DAFTAR SEKARANG</Text>
                            )}
                        </TouchableOpacity>

                        <View style={styles.footer}>
                            <Text style={styles.footerText}>Sudah punya akun? </Text>
                            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                                <Text style={styles.loginText}>Masuk</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
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
        paddingBottom: Spacing.md,
    },
    backButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
    },
    headerTitle: {
        color: Colors.text,
        fontSize: 18,
        fontWeight: 'bold',
    },
    scrollContent: {
        paddingHorizontal: Spacing.lg,
        paddingTop: Spacing.md,
    },
    subtitle: {
        color: Colors.textMuted,
        fontSize: 15,
        lineHeight: 22,
        marginBottom: 32,
    },
    formContainer: {
        width: '100%',
    },
    inputGroup: {
        marginBottom: 20,
    },
    label: {
        color: Colors.textMuted,
        fontSize: 10,
        fontWeight: 'bold',
        letterSpacing: 1.5,
        marginBottom: 10,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#0A0A0A',
        borderWidth: 1,
        borderColor: '#1A1A1A',
        borderRadius: 16,
        paddingHorizontal: 20,
        height: 60,
    },
    inputError: {
        borderColor: Colors.danger,
    },
    input: {
        flex: 1,
        color: Colors.text,
        fontSize: 15,
        marginLeft: 15,
    },
    registerButton: {
        backgroundColor: Colors.primary,
        height: 64,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.2,
        shadowRadius: 15,
        elevation: 8,
    },
    registerButtonText: {
        color: Colors.background,
        fontSize: 16,
        fontWeight: '900',
        letterSpacing: 1,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 30,
        paddingBottom: 40,
    },
    footerText: {
        color: Colors.textMuted,
        fontSize: 14,
    },
    loginText: {
        color: Colors.primary,
        fontSize: 14,
        fontWeight: 'bold',
    },
});

export default RegisterScreen;
