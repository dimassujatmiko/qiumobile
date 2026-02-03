import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity, Vibration } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Check, X, AlertCircle } from 'lucide-react-native';
import { Colors, Spacing } from '../theme/Theme';
import { LinearGradient } from 'expo-linear-gradient';
import GoldButton from '../components/GoldButton';

const SuccessScreen = ({ route, navigation }: any) => {
    const {
        title = 'Berhasil!',
        message = 'Transaksi Anda telah berhasil diproses.',
        type = 'success' // 'success' or 'error'
    } = route.params || {};

    const isSuccess = type === 'success';

    // Animation Values
    const scaleValue = useRef(new Animated.Value(0)).current;
    const opacityValue = useRef(new Animated.Value(0)).current;
    const translateY = useRef(new Animated.Value(30)).current;
    const circleScale = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // Haptic feedback
        if (isSuccess) {
            Vibration.vibrate([0, 100, 50, 100]);
        } else {
            Vibration.vibrate(400);
        }

        Animated.sequence([
            Animated.delay(200),
            Animated.parallel([
                Animated.spring(circleScale, {
                    toValue: 1,
                    tension: 50,
                    friction: 6,
                    useNativeDriver: true,
                }),
                Animated.spring(scaleValue, {
                    toValue: 1,
                    tension: 40,
                    friction: 7,
                    useNativeDriver: true,
                }),
                Animated.timing(opacityValue, {
                    toValue: 1,
                    duration: 600,
                    useNativeDriver: true,
                }),
                Animated.timing(translateY, {
                    toValue: 0,
                    duration: 600,
                    useNativeDriver: true,
                })
            ])
        ]).start();
    }, []);

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={isSuccess ? ['#0A1A0A', '#000000'] : ['#1A0A0A', '#000000']}
                style={StyleSheet.absoluteFill}
            />

            <SafeAreaView style={styles.content}>
                <View style={styles.iconContainer}>
                    {/* Pulsing Outer Circle */}
                    <Animated.View style={[
                        styles.pulseCircle,
                        { transform: [{ scale: circleScale }], opacity: opacityValue.interpolate({ inputRange: [0, 1], outputRange: [0, 0.2] }) },
                        { backgroundColor: isSuccess ? '#4CAF50' : Colors.danger }
                    ]} />

                    {/* Main Icon Circle */}
                    <Animated.View style={[
                        styles.iconCircle,
                        { transform: [{ scale: scaleValue }], opacity: opacityValue },
                        !isSuccess && { backgroundColor: Colors.danger, shadowColor: Colors.danger }
                    ]}>
                        {isSuccess ? (
                            <LinearGradient
                                colors={Colors.goldLight as any}
                                style={StyleSheet.absoluteFill}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                            >
                                <View style={styles.iconInner}>
                                    <Check size={50} color="#000" strokeWidth={4} />
                                </View>
                            </LinearGradient>
                        ) : (
                            <X size={50} color="#fff" strokeWidth={4} />
                        )}
                    </Animated.View>
                </View>

                <Animated.View style={{
                    opacity: opacityValue,
                    transform: [{ translateY: translateY }],
                    alignItems: 'center'
                }}>
                    <Text style={[styles.title, { color: isSuccess ? '#fff' : Colors.danger }]}>{title}</Text>
                    <Text style={styles.message}>{message}</Text>
                </Animated.View>

                <Animated.View style={[styles.buttonContainer, { opacity: opacityValue, transform: [{ translateY: translateY }] }]}>
                    {isSuccess ? (
                        <GoldButton
                            title="KEMBALI KE BERANDA"
                            onPress={() => navigation.navigate('Main')}
                            style={{ width: '100%' }}
                        />
                    ) : (
                        <TouchableOpacity
                            style={[styles.button, { backgroundColor: Colors.danger }]}
                            onPress={() => navigation.goBack()}
                        >
                            <Text style={styles.buttonText}>COBA LAGI</Text>
                        </TouchableOpacity>
                    )}
                </Animated.View>
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: Spacing.xl,
    },
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 40,
    },
    pulseCircle: {
        position: 'absolute',
        width: 160,
        height: 160,
        borderRadius: 80,
    },
    iconCircle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.5,
        shadowRadius: 20,
        elevation: 15,
    },
    title: {
        fontSize: 32,
        fontWeight: '900',
        marginBottom: 16,
        textAlign: 'center',
        letterSpacing: 1,
    },
    message: {
        color: Colors.textMuted,
        fontSize: 16,
        textAlign: 'center',
        lineHeight: 24,
        marginBottom: 60,
        maxWidth: '85%',
    },
    buttonContainer: {
        width: '100%',
    },
    iconInner: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        backgroundColor: Colors.danger,
        width: '100%',
        height: 60,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFF',
        fontSize: 14,
        fontWeight: 'bold',
        letterSpacing: 2,
    },
});

export default SuccessScreen;
