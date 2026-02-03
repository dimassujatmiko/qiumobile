import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Colors, Spacing } from '../theme/Theme';
import { TriangleAlert, Inbox, RefreshCw } from 'lucide-react-native';

export const LoadingView = () => (
    <View style={styles.center}>
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text style={styles.text}>Loading amazing things...</Text>
    </View>
);

export const EmptyState = ({ title = 'No data found', message = 'Check back later!' }: { title?: string, message?: string }) => (
    <View style={styles.center}>
        <View style={styles.iconContainer}>
            <Inbox size={48} color="#333" />
        </View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.message}>{message}</Text>
    </View>
);

export const ErrorView = ({ onRetry, error = 'Something went wrong' }: { onRetry: () => void, error?: string }) => (
    <View style={styles.center}>
        <View style={[styles.iconContainer, { backgroundColor: 'rgba(255, 68, 68, 0.1)' }]}>
            <TriangleAlert size={48} color={Colors.danger} />
        </View>
        <Text style={styles.title}>Oops!</Text>
        <Text style={styles.message}>{error}</Text>
        <TouchableOpacity style={styles.button} onPress={onRetry}>
            <RefreshCw size={18} color={Colors.background} style={{ marginRight: 8 }} />
            <Text style={styles.buttonText}>Retry</Text>
        </TouchableOpacity>
    </View>
);

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: Spacing.xl,
        backgroundColor: Colors.background,
    },
    text: {
        color: Colors.textMuted,
        marginTop: 16,
        fontSize: 14,
        fontWeight: '500',
    },
    iconContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#111',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
    },
    title: {
        color: Colors.text,
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    message: {
        color: Colors.textMuted,
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 32,
    },
    button: {
        flexDirection: 'row',
        backgroundColor: Colors.primary,
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 12,
        alignItems: 'center',
    },
    buttonText: {
        color: Colors.background,
        fontSize: 16,
        fontWeight: 'bold',
    },
});
