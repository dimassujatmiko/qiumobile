import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, StatusBar, ActivityIndicator, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Users, Calendar, Clock, Phone, User, CheckCircle2, ChevronLeft, ChevronRight, Check, X, AlertCircle } from 'lucide-react-native';
import { Colors, Spacing } from '../theme/Theme';
import GoldButton from '../components/GoldButton';
const { width } = Dimensions.get('window');

const BookingFormScreen = ({ navigation, route }: any) => {
    const { roomName } = route.params || { roomName: 'General Table' };

    // Form State
    const [fullName, setFullName] = useState('Dimas Anggara');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [guestCount, setGuestCount] = useState('2');

    // Date Generation Logic
    const monthNames = [
        'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
        'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];
    const dayNames = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];

    const now = new Date();
    const [selectedMonth, setSelectedMonth] = useState(now.getMonth());
    const [selectedYear, setSelectedYear] = useState(now.getFullYear());
    const [selectedDate, setSelectedDate] = useState(now.getDate());

    const getDaysInMonth = (month: number, year: number) => {
        const date = new Date(year, month, 1);
        const days = [];
        while (date.getMonth() === month) {
            const d = new Date(date);
            days.push({
                dayNum: d.getDate(),
                dayName: dayNames[d.getDay()],
                fullDate: `${d.getDate()} ${monthNames[month]}`,
                fullDisplay: `${dayNames[d.getDay()]}, ${d.getDate()} ${monthNames[month]} ${year}`
            });
            date.setDate(date.getDate() + 1);
        }
        return days;
    };

    const currentMonthDays = getDaysInMonth(selectedMonth, selectedYear);

    const changeMonth = (delta: number) => {
        let newMonth = selectedMonth + delta;
        let newYear = selectedYear;
        if (newMonth < 0) {
            newMonth = 11;
            newYear--;
        } else if (newMonth > 11) {
            newMonth = 0;
            newYear++;
        }
        setSelectedMonth(newMonth);
        setSelectedYear(newYear);
        // Reset selected date to 1 if we change month, or keep if valid? 
        // Let's just keep it simple.
    };

    const [selectedTime, setSelectedTime] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<any>({});

    // Mock Time Slots with Availability
    const timeSlots = [
        { time: '19:00', available: true },
        { time: '19:30', available: false },
        { time: '20:00', available: true },
        { time: '20:30', available: true },
        { time: '21:00', available: false },
        { time: '21:30', available: true },
        { time: '22:00', available: true },
        { time: '22:30', available: true },
        { time: '23:00', available: false },
        { time: '23:30', available: true },
        { time: '00:00', available: true },
        { time: '00:30', available: true }
    ];

    const validate = () => {
        let newErrors: any = {};
        if (!fullName) newErrors.fullName = 'Nama wajib diisi';
        if (!phoneNumber) newErrors.phoneNumber = 'Nomor telepon wajib diisi';
        else if (phoneNumber.length < 10) newErrors.phoneNumber = 'Masukkan nomor telepon yang valid';

        if (!guestCount) newErrors.guestCount = 'Jumlah tamu wajib diisi';
        if (!selectedTime) newErrors.selectedTime = 'Silakan pilih jam terlebih dahulu';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (validate()) {
            setIsLoading(true);
            // Simulate API call with 20% chance of failure to show error animation
            setTimeout(() => {
                setIsLoading(false);
                const isRandomError = Math.random() < 0.2;

                if (isRandomError) {
                    navigation.navigate('Success', {
                        type: 'error',
                        title: 'Booking Gagal',
                        message: 'Maaf, slot waktu ini baru saja dipesan oleh orang lain. Silakan pilih waktu atau tanggal lain.'
                    });
                } else {
                    navigation.navigate('Success', {
                        type: 'success',
                        title: 'Booking Berhasil!',
                        message: `Reservasi Anda untuk ${roomName} pada ${selectedDate} ${monthNames[selectedMonth]} jam ${selectedTime} telah berhasil ditempatkan.`
                    });
                }
            }, 2000);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" />
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <ArrowLeft size={24} color={Colors.text} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Booking Baru</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.formContent}>
                <Text style={styles.sectionTitle}>Detail Booking untuk {roomName}</Text>

                {/* Date Selection */}
                <View style={styles.inputGroup}>
                    <View style={styles.monthSelector}>
                        <TouchableOpacity onPress={() => changeMonth(-1)} style={styles.monthNavBtn}>
                            <ChevronLeft size={20} color={Colors.text} />
                        </TouchableOpacity>
                        <Text style={styles.monthYearText}>{monthNames[selectedMonth]} {selectedYear}</Text>
                        <TouchableOpacity onPress={() => changeMonth(1)} style={styles.monthNavBtn}>
                            <ChevronRight size={20} color={Colors.text} />
                        </TouchableOpacity>
                    </View>

                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.dateScroll}>
                        {currentMonthDays.map((item) => (
                            <TouchableOpacity
                                key={item.dayNum}
                                style={[styles.dateChip, selectedDate === item.dayNum && styles.activeDateChip]}
                                onPress={() => setSelectedDate(item.dayNum)}
                            >
                                <Text style={[styles.dateLabel, selectedDate === item.dayNum && styles.activeDateLabel]}>{item.dayName}</Text>
                                <Text style={[styles.dateValue, selectedDate === item.dayNum && styles.activeDateValue]}>{item.dayNum}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                {/* Time Selection */}
                <View style={styles.inputGroup}>
                    <View style={styles.rowBetween}>
                        <Text style={styles.label}>PILIH WAKTU</Text>
                        <View style={styles.legendRow}>
                            <View style={[styles.dot, { backgroundColor: '#4CAF50' }]} />
                            <Text style={styles.legendText}>Tersedia</Text>
                            <View style={[styles.dot, { backgroundColor: Colors.danger, marginLeft: 10 }]} />
                            <Text style={styles.legendText}>Terisi</Text>
                        </View>
                    </View>
                    <View style={styles.timeGrid}>
                        {timeSlots.map((item) => (
                            <TouchableOpacity
                                key={item.time}
                                style={[
                                    styles.timeChip,
                                    selectedTime === item.time && styles.activeTimeChip,
                                    !item.available && styles.bookedTimeChip
                                ]}
                                onPress={() => {
                                    if (item.available) {
                                        setSelectedTime(item.time);
                                        if (errors.selectedTime) {
                                            setErrors({ ...errors, selectedTime: null });
                                        }
                                    }
                                }}
                                disabled={!item.available}
                            >
                                <Text style={[
                                    styles.timeText,
                                    selectedTime === item.time && styles.activeTimeText,
                                    !item.available && styles.bookedTimeText,
                                    item.available && selectedTime !== item.time && { color: '#4CAF50' }
                                ]}>
                                    {item.time}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                    {errors.selectedTime && <Text style={styles.errorText}>{errors.selectedTime}</Text>}
                </View>

                <View style={styles.row}>
                    {/* Guest Count */}
                    <View style={[styles.inputGroup, { flex: 1 }]}>
                        <Text style={styles.label}>JUMLAH TAMU</Text>
                        <View style={[styles.inputWrapper, { height: 50 }]}>
                            <Users size={18} color="#666" />
                            <TextInput
                                style={styles.input}
                                value={guestCount}
                                onChangeText={setGuestCount}
                                placeholder="0"
                                placeholderTextColor="#444"
                                keyboardType="number-pad"
                            />
                        </View>
                    </View>
                </View>

                {/* Full Name */}
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>NAMA LENGKAP</Text>
                    <View style={[styles.inputWrapper, errors.fullName && styles.inputError]}>
                        <User size={20} color={errors.fullName ? Colors.danger : "#666"} />
                        <TextInput
                            style={styles.input}
                            value={fullName}
                            onChangeText={setFullName}
                            placeholder="Masukkan nama Anda"
                            placeholderTextColor="#444"
                        />
                    </View>
                    {errors.fullName && <Text style={styles.errorText}>{errors.fullName}</Text>}
                </View>

                {/* Phone Number */}
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>NOMOR TELEPON</Text>
                    <View style={[styles.inputWrapper, errors.phoneNumber && styles.inputError]}>
                        <Phone size={20} color={errors.phoneNumber ? Colors.danger : "#666"} />
                        <TextInput
                            style={styles.input}
                            value={phoneNumber}
                            onChangeText={setPhoneNumber}
                            placeholder="Misal: 08123456789"
                            placeholderTextColor="#444"
                            keyboardType="phone-pad"
                        />
                    </View>
                    {errors.phoneNumber && <Text style={styles.errorText}>{errors.phoneNumber}</Text>}
                </View>

                <View style={{ height: 40 }} />

                {/* Submit Button */}
                <View style={styles.footer}>
                    <GoldButton
                        title={isLoading ? 'MEMPROSES...' : 'KONFIRMASI RESERVASI'}
                        onPress={handleSubmit}
                        disabled={isLoading}
                    />
                </View>

                <View style={{ height: 100 }} />
            </ScrollView>
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
        fontSize: 18,
        fontWeight: 'bold',
    },
    formContent: {
        paddingHorizontal: Spacing.lg,
        paddingTop: Spacing.md,
    },
    sectionTitle: {
        color: Colors.primary,
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 24,
    },
    inputGroup: {
        marginBottom: 20,
    },
    label: {
        color: Colors.textMuted,
        fontSize: 11,
        fontWeight: 'bold',
        marginBottom: 8,
        letterSpacing: 1,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#0A0A0A',
        borderWidth: 1,
        borderColor: '#1A1A1A',
        borderRadius: 12,
        paddingHorizontal: 16,
        height: 56,
    },
    inputError: {
        borderColor: Colors.danger,
    },
    input: {
        flex: 1,
        color: Colors.text,
        fontSize: 15,
        marginLeft: 12,
    },
    errorText: {
        color: Colors.danger,
        fontSize: 11,
        marginTop: 4,
        marginLeft: 4,
    },
    row: {
        flexDirection: 'row',
    },
    monthSelector: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#0A0A0A',
        borderRadius: 12,
        paddingHorizontal: 15,
        paddingVertical: 12,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#1A1A1A',
    },
    monthNavBtn: {
        padding: 5,
    },
    monthYearText: {
        color: Colors.text,
        fontSize: 16,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    dateScroll: {
        marginHorizontal: -Spacing.lg,
        paddingHorizontal: Spacing.lg,
        marginBottom: 10,
    },
    dateChip: {
        width: 70,
        height: 80,
        backgroundColor: '#0A0A0A',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
        borderWidth: 1,
        borderColor: '#1A1A1A',
    },
    activeDateChip: {
        borderColor: Colors.primary,
        backgroundColor: 'rgba(198, 162, 52, 0.1)',
    },
    dateLabel: {
        color: Colors.textMuted,
        fontSize: 10,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    activeDateLabel: {
        color: Colors.primary,
    },
    dateValue: {
        color: Colors.text,
        fontSize: 16,
        fontWeight: 'bold',
    },
    activeDateValue: {
        color: Colors.primary,
    },
    timeGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
    },
    timeChip: {
        width: (width - (Spacing.lg * 2) - 30) / 4,
        height: 44,
        backgroundColor: '#0A0A0A',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#1A1A1A',
    },
    activeTimeChip: {
        borderColor: Colors.primary,
        backgroundColor: 'rgba(198, 162, 52, 0.1)',
    },
    bookedTimeChip: {
        borderColor: 'rgba(244, 67, 54, 0.2)',
        backgroundColor: 'rgba(244, 67, 54, 0.05)',
        opacity: 0.6,
    },
    timeText: {
        color: Colors.textMuted,
        fontSize: 13,
        fontWeight: 'bold',
    },
    activeTimeText: {
        color: Colors.primary,
    },
    bookedTimeText: {
        color: Colors.danger,
        textDecorationLine: 'line-through',
    },
    rowBetween: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    legendRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    dot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        marginRight: 4,
    },
    legendText: {
        color: Colors.textMuted,
        fontSize: 10,
        fontWeight: 'bold',
    },
    footer: {
        marginTop: 20,
        marginBottom: 30,
    },
    submitButton: {
        backgroundColor: Colors.primary,
        height: 60,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    submitButtonText: {
        color: Colors.background,
        fontSize: 16,
        fontWeight: '900',
        letterSpacing: 1,
    },
    successContainer: {
        flex: 1,
        backgroundColor: Colors.background,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30,
    },
    successCard: {
        alignItems: 'center',
        width: '100%',
    },
    successTitle: {
        color: Colors.text,
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 24,
        marginBottom: 8,
    },
    successMessage: {
        color: Colors.textMuted,
        fontSize: 15,
        textAlign: 'center',
        lineHeight: 22,
        marginBottom: 32,
    },
    backHomeButton: {
        backgroundColor: '#111',
        borderWidth: 1,
        borderColor: '#333',
        paddingHorizontal: 32,
        paddingVertical: 16,
        borderRadius: 12,
    },
    backHomeText: {
        color: Colors.text,
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default BookingFormScreen;
