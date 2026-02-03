import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { QrCode, X } from 'lucide-react-native';
import { Colors, Spacing } from '../theme/Theme';

const QRScreen = ({ navigation }: any) => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.overlay}>
                <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
                    <X size={24} color={Colors.text} />
                </TouchableOpacity>

                <View style={styles.scannerFrame}>
                    <View style={styles.cornerTL} />
                    <View style={styles.cornerTR} />
                    <View style={styles.cornerBL} />
                    <View style={styles.cornerBR} />

                    <View style={styles.scannerLine} />
                </View>

                <View style={styles.instructionContainer}>
                    <QrCode size={48} color={Colors.primary} style={{ marginBottom: 16 }} />
                    <Text style={styles.title}>Pindai Kode QR</Text>
                    <Text style={styles.subtitle}>
                        Arahkan kamera Anda ke kode QR meja atau member untuk memindai.
                    </Text>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: Spacing.xl,
    },
    closeButton: {
        position: 'absolute',
        top: Spacing.xl,
        right: Spacing.xl,
        padding: 8,
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: 20,
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
        top: '50%',
        left: 0,
        right: 0,
        height: 2,
        backgroundColor: Colors.danger,
        opacity: 0.7,
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
});

export default QRScreen;
