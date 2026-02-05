import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Users, Music } from 'lucide-react-native';
import { Colors, Spacing } from '../theme/Theme';
import { bookingService } from '../services/bookingService';
import { ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import SilverButton from '../components/SilverButton';

const TableListScreen = ({ navigation }: any) => {
    const [tables, setTables] = React.useState<any[]>([]);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchTables = async () => {
            try {
                const data = await bookingService.getRooms('TABLE');
                setTables(data);
            } catch (error) {
                console.error('Failed to fetch tables:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchTables();
    }, []);
    const renderTableItem = ({ item }: { item: any }) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('BookingForm', { roomName: item.name })}
        >
            <Image source={{ uri: item.image || 'https://images.unsplash.com/photo-1574096079513-d8259312b785?q=80&w=1000' }} style={styles.image} />
            <View style={styles.info}>
                <View style={styles.rowBetween}>
                    <Text style={styles.name}>{item.name}</Text>
                </View>

                <View style={styles.tagRow}>
                    <View style={styles.tag}>
                        <Users size={12} color="#AAA" />
                        <Text style={styles.tagText}>{item.pax || 'Tersedia'}</Text>
                    </View>
                    <View style={styles.tag}>
                        <Text style={[styles.tagText, { color: Colors.text }]}>{item.price || item.status}</Text>
                    </View>
                </View>

                <Text style={styles.desc} numberOfLines={2}>
                    {item.description}
                </Text>

                <SilverButton
                    title="AMANKAN MEJA"
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
                <Text style={styles.headerTitle}>Semua Meja Lounge</Text>
                <View style={{ width: 40 }} />
            </View>

            {isLoading ? (
                <ActivityIndicator color={Colors.primary} style={{ marginTop: 40 }} />
            ) : (
                <FlatList
                    data={tables}
                    renderItem={renderTableItem}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={() => (
                        <Text style={styles.subHeader}>Reservasi meja favorit Anda di area lounge kami yang semarak.</Text>
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
    card: {
        backgroundColor: Colors.card,
        borderRadius: 20,
        overflow: 'hidden',
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#1A1A1A',
    },
    image: {
        width: '100%',
        height: 180,
    },
    info: {
        padding: 16,
    },
    rowBetween: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    name: {
        color: Colors.text,
        fontSize: 18,
        fontWeight: 'bold',
    },
    tagRow: {
        flexDirection: 'row',
        marginBottom: 12,
        gap: 8,
    },
    tag: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 8,
        gap: 6,
        borderWidth: 1,
        borderColor: '#333',
    },
    tagText: {
        color: '#E0E0E0',
        fontSize: 11,
        fontWeight: 'bold',
    },
    desc: {
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

export default TableListScreen;
