import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Bell, Calendar, Tag, Star, Info, Trash2 } from 'lucide-react-native';
import { Swipeable, GestureHandlerRootView } from 'react-native-gesture-handler';
import { Colors, Spacing } from '../theme/Theme';
import { NOTIFICATIONS } from '../utils/MockData';

const NotificationScreen = ({ navigation }: any) => {
    const [notifications, setNotifications] = useState(NOTIFICATIONS);

    const handleDelete = (id: string) => {
        setNotifications(notifications.filter(item => item.id !== id));
    };

    const getIcon = (type: string) => {
        switch (type) {
            case 'booking': return <Calendar size={20} color={Colors.primary} />;
            case 'promo': return <Tag size={20} color={Colors.primary} />;
            case 'system': return <Star size={20} color={Colors.primary} />;
            default: return <Info size={20} color={Colors.primary} />;
        }
    };

    const renderRightActions = (id: string) => {
        return (
            <TouchableOpacity
                style={styles.deleteAction}
                onPress={() => handleDelete(id)}
                activeOpacity={0.7}
            >
                <Trash2 size={20} color="#FFF" />
                <Text style={styles.deleteText}>Hapus</Text>
            </TouchableOpacity>
        );
    };

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaView style={styles.container}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                        <ArrowLeft size={24} color={Colors.text} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>NOTIFIKASI</Text>
                    <View style={{ width: 40 }} />
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                    {notifications.length === 0 ? (
                        <View style={styles.emptyState}>
                            <Bell size={48} color={Colors.textMuted} />
                            <Text style={styles.emptyText}>Belum ada notifikasi</Text>
                        </View>
                    ) : (
                        notifications.map((item) => (
                            <Swipeable
                                key={item.id}
                                renderRightActions={() => renderRightActions(item.id)}
                                friction={2}
                                rightThreshold={40}
                            >
                                <TouchableOpacity style={[styles.notificationCard, !item.read && styles.unreadCard]}>
                                    <View style={styles.iconContainer}>
                                        {getIcon(item.type)}
                                    </View>
                                    <View style={styles.textContainer}>
                                        <View style={styles.topRow}>
                                            <Text style={styles.title}>{item.title}</Text>
                                            <Text style={styles.date}>{item.date}</Text>
                                        </View>
                                        <Text style={styles.message} numberOfLines={2}>{item.message}</Text>
                                    </View>
                                    {!item.read && <View style={styles.dot} />}
                                </TouchableOpacity>
                            </Swipeable>
                        ))
                    )}
                    <View style={{ height: 100 }} />
                </ScrollView>
            </SafeAreaView>
        </GestureHandlerRootView>
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
        paddingVertical: Spacing.sm,
        borderBottomWidth: 1,
        borderBottomColor: '#1A1A1A',
    },
    backButton: {
        padding: 8,
    },
    headerTitle: {
        color: Colors.text,
        fontSize: 18,
        fontWeight: 'bold',
        letterSpacing: 1,
    },
    scrollContent: {
        padding: Spacing.md,
    },
    emptyState: {
        marginTop: 100,
        alignItems: 'center',
        opacity: 0.5,
        gap: 16,
    },
    emptyText: {
        color: Colors.textMuted,
        fontSize: 16,
    },
    notificationCard: {
        flexDirection: 'row',
        backgroundColor: Colors.card,
        padding: 16,
        borderRadius: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#181818',
        alignItems: 'center',
    },
    unreadCard: {
        backgroundColor: '#1E1E1E',
        borderColor: '#333',
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(198, 162, 52, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    textContainer: {
        flex: 1,
    },
    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 4,
    },
    title: {
        color: Colors.text,
        fontSize: 14,
        fontWeight: 'bold',
    },
    date: {
        color: Colors.textMuted,
        fontSize: 10,
    },
    message: {
        color: Colors.textMuted,
        fontSize: 12,
        lineHeight: 16,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: Colors.danger,
        marginLeft: 8,
    },
    deleteAction: {
        backgroundColor: Colors.danger,
        justifyContent: 'center',
        alignItems: 'center',
        width: 80,
        height: '80%', // Match card height minus margin
        alignSelf: 'center',
        borderRadius: 16,
        marginBottom: 12,
        marginLeft: 10,
    },
    deleteText: {
        color: '#FFF',
        fontSize: 10,
        fontWeight: 'bold',
        marginTop: 4,
    },
});

export default NotificationScreen;
