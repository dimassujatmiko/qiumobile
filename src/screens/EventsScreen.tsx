import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, StatusBar, TextInput, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, ChevronDown } from 'lucide-react-native';
import { Colors, Spacing } from '../theme/Theme';
import { EVENTS } from '../utils/MockData';
import { LoadingView, EmptyState, ErrorView } from '../components/StateViews';

const { width } = Dimensions.get('window');
const COLUMN_WIDTH = (width - Spacing.md * 3) / 2;

const EventsScreen = ({ navigation }: any) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    React.useEffect(() => {
        // Simulate data fetching
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    const handleRetry = () => {
        setIsError(false);
        setIsLoading(true);
        setTimeout(() => setIsLoading(false), 1500);
    };

    const filteredEvents = EVENTS.filter(event =>
        event.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (isLoading) return <LoadingView />;
    if (isError) return <ErrorView onRetry={handleRetry} />;

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" />

            {/* Header with Location Filter */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Acara</Text>
                <TouchableOpacity style={styles.locationFilter}>
                    <Text style={styles.locationText}>Semua kota</Text>
                    <ChevronDown size={16} color={Colors.text} />
                </TouchableOpacity>
            </View>

            {/* Search Bar */}
            <View style={styles.searchContainer}>
                <View style={styles.searchBar}>
                    <TextInput
                        placeholder="Outlet pencarian / alamat"
                        placeholderTextColor="#666"
                        style={styles.searchInput}
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                    <Search size={20} color="#666" />
                </View>
            </View>

            {filteredEvents.length === 0 ? (
                <EmptyState
                    title="Tidak Ada Acara Ditemukan"
                    message={`Kami tidak dapat menemukan acara yang sesuai dengan "${searchQuery}"`}
                />
            ) : (
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                    <Text style={styles.resultCount}>{filteredEvents.length} ditemukan</Text>

                    <View style={styles.gridContainer}>
                        {filteredEvents.map((event) => (
                            <TouchableOpacity
                                key={event.id}
                                style={styles.eventCard}
                                onPress={() => navigation.navigate('EventDetail', { event })}
                            >
                                <View style={styles.imageWrapper}>
                                    <Image source={{ uri: event.image }} style={styles.eventImage} />
                                </View>
                                <View style={styles.eventInfo}>
                                    <Text style={styles.eventTitle} numberOfLines={2}>
                                        {event.title.toLowerCase()} breakb...
                                    </Text>
                                    <Text style={styles.eventLocation} numberOfLines={1}>
                                        {event.location || 'GOLDEN TIGER KEMANG'}
                                    </Text>
                                    <Text style={styles.eventDate}>
                                        Mon, 02 Feb 2026
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <View style={{ height: 100 }} />
                </ScrollView>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.md,
        position: 'relative',
    },
    headerTitle: {
        color: Colors.text,
        fontSize: 18,
        fontWeight: 'bold',
    },
    locationFilter: {
        position: 'absolute',
        right: Spacing.md,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#333',
        backgroundColor: '#0A0A0A',
    },
    locationText: {
        color: Colors.text,
        fontSize: 12,
        marginRight: 4,
    },
    searchContainer: {
        paddingHorizontal: Spacing.md,
        marginBottom: 20,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#111',
        borderRadius: 12,
        paddingHorizontal: 16,
        height: 50,
        borderWidth: 1,
        borderColor: '#222',
    },
    searchInput: {
        flex: 1,
        color: Colors.text,
        fontSize: 14,
    },
    scrollContent: {
        paddingHorizontal: Spacing.md,
    },
    resultCount: {
        color: '#888',
        fontSize: 14,
        marginBottom: 16,
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    eventCard: {
        width: COLUMN_WIDTH,
        marginBottom: 24,
    },
    imageWrapper: {
        width: '100%',
        aspectRatio: 3 / 4,
        borderRadius: 8,
        overflow: 'hidden',
        backgroundColor: '#111',
    },
    eventImage: {
        width: '100%',
        height: '100%',
    },
    eventInfo: {
        marginTop: 10,
    },
    eventTitle: {
        color: Colors.text,
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 4,
        textTransform: 'lowercase',
    },
    eventLocation: {
        color: '#AAA',
        fontSize: 12,
        fontWeight: 'bold',
        marginBottom: 2,
    },
    eventDate: {
        color: '#666',
        fontSize: 11,
    },
});

export default EventsScreen;
