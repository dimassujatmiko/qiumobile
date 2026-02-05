import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Users, Info } from 'lucide-react-native';
import { Colors, Spacing } from '../theme/Theme';
import { bookingService } from '../services/bookingService';
import { ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import SilverButton from '../components/SilverButton';
import { ImageBackground } from 'react-native';

const RoomListScreen = ({ navigation }: any) => {
    const [rooms, setRooms] = React.useState<any[]>([]);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchRooms = async () => {
            try {
                const data = await bookingService.getRooms('KTV');
                setRooms(data);
            } catch (error) {
                console.error('Failed to fetch rooms:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchRooms();
    }, []);
    const renderRoomItem = ({ item }: { item: any }) => (
        <TouchableOpacity
            style={styles.roomCard}
            onPress={() => navigation.navigate('BookingForm', { roomName: item.name })}
        >
            <Image source={{ uri: item.image || 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=1000' }} style={styles.roomImage} />
            <View style={styles.roomInfo}>
                <View style={styles.rowBetween}>
                    <Text style={styles.roomName}>{item.name}</Text>
                    <Text style={styles.roomPrice}>{item.price || item.status}</Text>
                </View>

                <View style={styles.tagRow}>
                    <View style={styles.tag}>
                        <Users size={12} color={Colors.primary} />
                        <Text style={styles.tagText}>{item.pax || 'Tersedia'}</Text>
                    </View>
                </View>

                <Text style={styles.roomDesc} numberOfLines={2}>
                    {item.description}
                </Text>

                <SilverButton
                    title="PESAN SEKARANG"
                    onPress={() => navigation.navigate('BookingForm', { roomName: item.name })}
                />
            </View>

            {/* Decorative Silver Footer Line */}
            <LinearGradient
                colors={Colors.silverGradient as any}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.cardFooterLine}
            />
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" />

            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <ArrowLeft size={24} color={Colors.text} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Semua Kamar KTV</Text>
                <View style={{ width: 40 }} />
            </View>

            {isLoading ? (
                <ActivityIndicator color={Colors.primary} style={{ marginTop: 40 }} />
            ) : (
                <FlatList
                    data={rooms}
                    renderItem={renderRoomItem}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={() => (
                        <Text style={styles.subHeader}>Pilih ruang pribadi Anda untuk pengalaman karaoke terbaik.</Text>
                    )}
                />
            )}
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
        fontSize: 20,
        fontWeight: 'bold',
    },
    subHeader: {
        color: Colors.textMuted,
        fontSize: 14,
        marginBottom: 20,
        lineHeight: 20,
    },
    listContent: {
        paddingHorizontal: Spacing.md,
        paddingBottom: 40,
    },
    roomCard: {
        backgroundColor: Colors.card,
        borderRadius: 20,
        overflow: 'hidden',
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#1A1A1A',
    },
    roomImage: {
        width: '100%',
        height: 180,
    },
    roomInfo: {
        padding: 16,
    },
    rowBetween: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    roomName: {
        color: Colors.text,
        fontSize: 18,
        fontWeight: 'bold',
    },
    roomPrice: {
        color: Colors.primary,
        fontSize: 15,
        fontWeight: 'bold',
    },
    tagRow: {
        flexDirection: 'row',
        marginBottom: 12,
    },
    tag: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
        gap: 6,
        borderWidth: 1,
        borderColor: '#333',
    },
    tagText: {
        color: '#E0E0E0',
        fontSize: 11,
        fontWeight: 'bold',
    },
    roomDesc: {
        color: Colors.textMuted,
        fontSize: 13,
        lineHeight: 18,
        marginBottom: 16,
    },
    bookBtn: {
        backgroundColor: Colors.primary,
        height: 44,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bookBtnText: {
        color: Colors.background,
        fontSize: 13,
        fontWeight: '900',
        letterSpacing: 1,
    },
    cardFooterLine: {
        height: 4,
        width: '100%',
    },
});

export default RoomListScreen;
