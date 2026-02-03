import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Search, X, SlidersHorizontal, MapPin, Beer, Calendar } from 'lucide-react-native';
import { Colors, Spacing } from '../theme/Theme';
import { LinearGradient } from 'expo-linear-gradient';

const SearchScreen = ({ navigation }: any) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [recentSearches, setRecentSearches] = useState(['Blue Label', 'KTV VIP', 'Ladies Night']);

    // Mock search results
    const results = [
        { id: '1', name: 'Premium VIP Room', type: 'Ruangan', category: 'KTV', image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=1000' },
        { id: '2', name: 'Hennessy VSOP', type: 'Menu', category: 'Cognac', image: 'https://images.unsplash.com/photo-1599542424508-344f68694039?q=80&w=1000' },
        { id: '3', name: 'Weekend Party', type: 'Acara', category: 'Live Music', image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1000' },
    ];

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#1A1A1A', '#000000']}
                style={StyleSheet.absoluteFill}
            />

            <SafeAreaView style={{ flex: 1 }}>
                {/* Search Header */}
                <View style={styles.searchHeader}>
                    <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                        <ArrowLeft size={24} color={Colors.text} />
                    </TouchableOpacity>

                    <View style={styles.searchInputContainer}>
                        <Search size={18} color={Colors.textMuted} />
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Cari Menu, Event, atau Room..."
                            placeholderTextColor="#666"
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                            autoFocus
                        />
                        {searchQuery.length > 0 && (
                            <TouchableOpacity onPress={() => setSearchQuery('')}>
                                <X size={18} color={Colors.textMuted} />
                            </TouchableOpacity>
                        )}
                    </View>

                    <TouchableOpacity style={styles.filterButton}>
                        <SlidersHorizontal size={20} color={Colors.primary} />
                    </TouchableOpacity>
                </View>

                {searchQuery.length === 0 ? (
                    <View style={styles.recentSection}>
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>PENCARIAN TERAKHIR</Text>
                            <TouchableOpacity onPress={() => setRecentSearches([])}>
                                <Text style={styles.clearText}>Hapus</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.recentList}>
                            {recentSearches.map((item, index) => (
                                <TouchableOpacity key={index} style={styles.recentItem} onPress={() => setSearchQuery(item)}>
                                    <Text style={styles.recentText}>{item}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        <Text style={[styles.sectionTitle, { marginTop: 40 }]}>KATEGORI POPULER</Text>
                        <View style={styles.categoryGrid}>
                            <TouchableOpacity style={styles.categoryCard}>
                                <Beer size={24} color={Colors.primary} />
                                <Text style={styles.categoryLabel}>Minuman</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.categoryCard}>
                                <MapPin size={24} color={Colors.primary} />
                                <Text style={styles.categoryLabel}>Ruangan</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.categoryCard}>
                                <Calendar size={24} color={Colors.primary} />
                                <Text style={styles.categoryLabel}>Acara</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ) : (
                    <FlatList
                        data={results}
                        keyExtractor={(item) => item.id}
                        contentContainerStyle={styles.resultsList}
                        renderItem={({ item }) => (
                            <TouchableOpacity style={styles.resultItem}>
                                <Image source={{ uri: item.image }} style={styles.resultImage} />
                                <View style={styles.resultInfo}>
                                    <Text style={styles.resultType}>{item.type} • {item.category}</Text>
                                    <Text style={styles.resultName}>{item.name}</Text>
                                </View>
                                <ChevronRight size={20} color={Colors.textMuted} />
                            </TouchableOpacity>
                        )}
                    />
                )}
            </SafeAreaView>
        </View>
    );
};

// Simplified Chevron icon
const ChevronRight = ({ size, color }: any) => (
    <View style={{ transform: [{ rotate: '-90deg' }] }}>
        <Text style={{ color, fontSize: size, fontWeight: 'bold' }}>⌄</Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    searchHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.sm,
        gap: 12,
    },
    backButton: {
        padding: 4,
    },
    searchInputContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.08)',
        borderRadius: 12,
        paddingHorizontal: 12,
        height: 48,
    },
    searchInput: {
        flex: 1,
        color: Colors.text,
        fontSize: 14,
        marginLeft: 8,
    },
    filterButton: {
        padding: 8,
        backgroundColor: 'rgba(198, 162, 52, 0.1)',
        borderRadius: 12,
    },
    recentSection: {
        padding: Spacing.lg,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    sectionTitle: {
        color: Colors.textMuted,
        fontSize: 10,
        fontWeight: 'bold',
        letterSpacing: 1.5,
    },
    clearText: {
        color: Colors.danger,
        fontSize: 10,
        fontWeight: 'bold',
    },
    recentList: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
    },
    recentItem: {
        backgroundColor: '#1A1A1A',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#222',
    },
    recentText: {
        color: Colors.text,
        fontSize: 13,
    },
    categoryGrid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 16,
    },
    categoryCard: {
        width: '30%',
        backgroundColor: Colors.card,
        borderRadius: 20,
        padding: 16,
        alignItems: 'center',
        gap: 8,
        borderWidth: 1,
        borderColor: '#1A1A1A',
    },
    categoryLabel: {
        color: Colors.text,
        fontSize: 12,
        fontWeight: 'bold',
    },
    resultsList: {
        padding: Spacing.md,
    },
    resultItem: {
        flexDirection: 'row',
        backgroundColor: Colors.card,
        borderRadius: 16,
        padding: 12,
        marginBottom: 12,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#1A1A1A',
    },
    resultImage: {
        width: 50,
        height: 50,
        borderRadius: 10,
    },
    resultInfo: {
        flex: 1,
        marginLeft: 12,
    },
    resultType: {
        color: Colors.primary,
        fontSize: 10,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    resultName: {
        color: Colors.text,
        fontSize: 14,
        fontWeight: '600',
        marginTop: 2,
    },
});

export default SearchScreen;
