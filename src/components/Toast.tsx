import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import { CheckCircle2, AlertCircle } from 'lucide-react-native';
import { Colors } from '../theme/Theme';

const { width } = Dimensions.get('window');

export interface ToastRef {
    show: (message: string, type?: 'success' | 'error') => void;
}

const Toast = forwardRef<ToastRef>((_, ref) => {
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState('');
    const [type, setType] = useState<'success' | 'error'>('success');

    const translateY = new Animated.Value(-100);
    const opacity = new Animated.Value(0);

    useImperativeHandle(ref, () => ({
        show: (msg, t = 'success') => {
            setMessage(msg);
            setType(t);
            setVisible(true);

            Animated.parallel([
                Animated.spring(translateY, {
                    toValue: 50,
                    useNativeDriver: true,
                    tension: 50,
                    friction: 8
                }),
                Animated.timing(opacity, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true
                })
            ]).start();

            setTimeout(() => {
                hide();
            }, 3000);
        }
    }));

    const hide = () => {
        Animated.parallel([
            Animated.timing(translateY, {
                toValue: -100,
                duration: 300,
                useNativeDriver: true
            }),
            Animated.timing(opacity, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true
            })
        ]).start(() => setVisible(false));
    };

    if (!visible) return null;

    return (
        <Animated.View style={[
            styles.container,
            { transform: [{ translateY }], opacity }
        ]}>
            <View style={[styles.toast, type === 'success' ? styles.success : styles.error]}>
                {type === 'success' ? (
                    <CheckCircle2 size={20} color="#FFF" />
                ) : (
                    <AlertCircle size={20} color="#FFF" />
                )}
                <Text style={styles.text}>{message}</Text>
            </View>
        </Animated.View>
    );
});

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    toast: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 25,
        minWidth: width * 0.8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 10,
    },
    success: {
        backgroundColor: '#4CAF50',
    },
    error: {
        backgroundColor: Colors.danger,
    },
    text: {
        color: '#FFF',
        fontSize: 14,
        fontWeight: 'bold',
        marginLeft: 10,
    }
});

export default Toast;
