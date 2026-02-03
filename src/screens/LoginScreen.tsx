import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Dimensions, StatusBar, KeyboardAvoidingView, Platform, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Spacing } from '../theme/Theme';
import { useAuth } from '../context/AuthContext';
import LogoImage from '../../assets/icon.png';
import GoldButton from '../components/GoldButton';

const { width, height } = Dimensions.get('window');

const LoginScreen = ({ navigation }: any) => {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<any>({});

    const handleLogin = () => {
        let newErrors: any = {};
        if (!email) newErrors.email = 'Email wajib diisi';
        if (!password) newErrors.password = 'Kata sandi wajib diisi';

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            setIsLoading(true);
            // Simulate login
            setTimeout(() => {
                setIsLoading(false);
                login({ email, name: 'Dimas Anggara' });
                navigation.navigate('Main');
            }, 1500);
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />

            {/* Background Image / Gradient */}
            <Image
                source={{ uri: 'https://images.unsplash.com/photo-1514525253361-b8748333c5ed?q=80&w=1000' }}
                style={styles.backgroundImage}
            />
            <LinearGradient
                colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.8)', Colors.background]}
                style={styles.gradient}
            />

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                    <View style={styles.headerSection}>
                        <View style={styles.logoContainer}>
                            <Image source={LogoImage} style={styles.logoImage} resizeMode="contain" />
                        </View>
                        <Text style={styles.welcomeTitle}>Selamat Datang</Text>
                        <Text style={styles.welcomeSubtitle}>Masuk untuk melanjutkan pengalaman premium Anda</Text>
                    </View>

                    <View style={styles.formContainer}>
                        {/* Email Input */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>ALAMAT EMAIL</Text>
                            <View style={[styles.inputWrapper, errors.email && styles.inputError]}>
                                <Mail size={20} color={errors.email ? Colors.danger : "#666"} />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Masukkan email"
                                    placeholderTextColor="#444"
                                    value={email}
                                    onChangeText={setEmail}
                                    autoCapitalize="none"
                                    keyboardType="email-address"
                                />
                            </View>
                            {errors.email && <Text style={{ color: Colors.danger, fontSize: 10, marginTop: 4 }}>{errors.email}</Text>}
                        </View>

                        {/* Password Input */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>KATA SANDI</Text>
                            <View style={[styles.inputWrapper, errors.password && styles.inputError]}>
                                <Lock size={20} color={errors.password ? Colors.danger : "#666"} />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Masukkan kata sandi"
                                    placeholderTextColor="#444"
                                    value={password}
                                    onChangeText={setPassword}
                                    secureTextEntry={!showPassword}
                                />
                                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <EyeOff size={20} color="#666" /> : <Eye size={20} color="#666" />}
                                </TouchableOpacity>
                            </View>
                            {errors.password && <Text style={{ color: Colors.danger, fontSize: 10, marginTop: 4 }}>{errors.password}</Text>}
                        </View>

                        <TouchableOpacity style={styles.forgotPassword}>
                            <Text style={styles.forgotPasswordText}>Lupa Kata Sandi?</Text>
                        </TouchableOpacity>

                        <GoldButton
                            title="MASUK"
                            onPress={handleLogin}
                            disabled={isLoading}
                            icon={!isLoading && <ArrowRight size={20} color="#000" />}
                            style={{ marginTop: 10 }}
                        />

                        <View style={styles.footer}>
                            <Text style={styles.footerText}>Belum punya akun? </Text>
                            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                                <Text style={styles.signUpText}>Daftar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    backgroundImage: {
        position: 'absolute',
        width: width,
        height: height * 0.6,
        top: 0,
    },
    gradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: height,
    },
    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: Spacing.lg,
        paddingBottom: 40,
    },
    headerSection: {
        marginTop: height * 0.15,
        alignItems: 'center',
        marginBottom: 40,
    },
    logoContainer: {
        width: 120,
        height: 120,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
    },
    logoImage: {
        width: '100%',
        height: '100%',
    },
    welcomeTitle: {
        color: Colors.text,
        fontSize: 32,
        fontWeight: 'bold',
    },
    welcomeSubtitle: {
        color: Colors.textMuted,
        fontSize: 14,
        marginTop: 8,
        textAlign: 'center',
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
        backgroundColor: 'rgba(255,255,255,0.05)',
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
        fontSize: 16,
        marginLeft: 15,
    },
    forgotPassword: {
        alignSelf: 'flex-end',
        marginBottom: 30,
    },
    forgotPasswordText: {
        color: Colors.primary,
        fontSize: 14,
        fontWeight: '600',
    },
    loginButton: {
        backgroundColor: Colors.primary,
        height: 64,
        borderRadius: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.2,
        shadowRadius: 15,
        elevation: 8,
    },
    loginButtonText: {
        color: Colors.background,
        fontSize: 16,
        fontWeight: '900',
        letterSpacing: 1,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 30,
    },
    footerText: {
        color: Colors.textMuted,
        fontSize: 14,
    },
    signUpText: {
        color: Colors.primary,
        fontSize: 14,
        fontWeight: 'bold',
    },
});

export default LoginScreen;
