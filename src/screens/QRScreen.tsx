import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Animated, Easing } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { QrCode, X, Zap, ZapOff } from 'lucide-react-native';
import { Colors, Spacing } from '../theme/Theme';

const QRScreen = ({ navigation }: any) => {
    const scanLineAnim = React.useRef(new Animated.Value(0)).current;
    const [permission, requestPermission] = useCameraPermissions();
    const [scanned, setScanned] = React.useState(false);

    React.useEffect(() => {
        const animation = Animated.loop(
            Animated.sequence([
                Animated.timing(scanLineAnim, {
                    toValue: 250,
                    duration: 2000,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
                Animated.timing(scanLineAnim, {
                    toValue: 0,
                    duration: 2000,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                })
            ])
        );
        animation.start();
        return () => animation.stop();
    }, [scanLineAnim]);

    const animatedLineStyle = {
        transform: [{ translateY: scanLineAnim }],
    };

    const handleBarcodeScanned = ({ type, data }: any) => {
        if (scanned) return;
        setScanned(true);
        Alert.alert(
            'QR Terdeteksi',
            `Data: ${data}`,
            [{ text: 'OK', onPress: () => setScanned(false) }]
        );
    };

    if (!permission) {
        // Camera permissions are still loading.
        return <View style={styles.container} />;
    }

    if (!permission.granted) {
        // Camera permissions are not granted yet.
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.permissionContainer}>
                    <Text style={styles.permissionText}>Kami memerlukan izin kamera untuk fitur ini</Text>
                    <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
                        <Text style={styles.permissionButtonText}>Berikan Izin</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.backLink} onPress={() => navigation.goBack()}>
                        <Text style={styles.backLinkText}>Kembali</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <View style={styles.container}>
            <CameraView
                style={StyleSheet.absoluteFill}
                facing="back"
                onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
                barcodeScannerSettings={{
                    barcodeTypes: ['qr'],
                }}
            />
            <View style={styles.overlay}>
                <View style={styles.topActions}>
                    <TouchableOpacity style={styles.iconButton} onPress={() => navigation.goBack()}>
                        <X size={24} color={Colors.text} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconButton}>
                        <ZapOff size={24} color={Colors.text} />
                    </TouchableOpacity>
                </View>

                <View style={styles.scannerFrame}>
                    <View style={styles.cornerTL} />
                    <View style={styles.cornerTR} />
                    <View style={styles.cornerBL} />
                    <View style={styles.cornerBR} />

                    <Animated.View style={[styles.scannerLine, animatedLineStyle]} />
                </View>

                <View style={styles.instructionContainer}>
                    <QrCode size={48} color={Colors.primary} style={{ marginBottom: 16 }} />
                    <Text style={styles.title}>Pindai Kode QR</Text>
                    <Text style={styles.subtitle}>
                        Arahkan kamera Anda ke kode QR meja atau member untuk memindai.
                    </Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: Spacing.xl,
    },
    topActions: {
        position: 'absolute',
        top: Spacing.xl,
        left: Spacing.xl,
        right: Spacing.xl,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    iconButton: {
        padding: 10,
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: 25,
    },
    scannerFrame: {
        width: 250,
        height: 250,
        position: 'relative',
        marginBottom: 60,
    },
    cornerTL: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: 40,
        height: 40,
        borderTopWidth: 4,
        borderLeftWidth: 4,
        borderColor: Colors.primary,
        borderTopLeftRadius: 16,
    },
    cornerTR: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: 40,
        height: 40,
        borderTopWidth: 4,
        borderRightWidth: 4,
        borderColor: Colors.primary,
        borderTopRightRadius: 16,
    },
    cornerBL: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: 40,
        height: 40,
        borderBottomWidth: 4,
        borderLeftWidth: 4,
        borderColor: Colors.primary,
        borderBottomLeftRadius: 16,
    },
    cornerBR: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 40,
        height: 40,
        borderBottomWidth: 4,
        borderRightWidth: 4,
        borderColor: Colors.primary,
        borderBottomRightRadius: 16,
    },
    scannerLine: {
        position: 'absolute',
        top: 0,
        left: 10,
        right: 10,
        height: 3,
        backgroundColor: Colors.primary,
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 10,
        elevation: 10,
    },
    instructionContainer: {
        alignItems: 'center',
    },
    title: {
        color: Colors.text,
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    subtitle: {
        color: Colors.textMuted,
        fontSize: 14,
        textAlign: 'center',
        maxWidth: 260,
        lineHeight: 20,
    },
    permissionContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30,
    },
    permissionText: {
        color: Colors.text,
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 30,
    },
    permissionButton: {
        backgroundColor: Colors.primary,
        paddingHorizontal: 30,
        paddingVertical: 15,
        borderRadius: 30,
        marginBottom: 20,
    },
    permissionButtonText: {
        color: Colors.background,
        fontSize: 16,
        fontWeight: 'bold',
    },
    backLink: {
        padding: 10,
    },
    backLinkText: {
        color: Colors.primary,
        fontSize: 14,
    },
});

export default QRScreen;
