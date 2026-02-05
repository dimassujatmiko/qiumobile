import React from 'react';
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    ImageBackground,
    View,
    TextStyle,
    ViewStyle,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../theme/Theme';

interface SilverButtonProps {
    title: string;
    onPress: () => void;
    style?: ViewStyle;
    textStyle?: TextStyle;
    disabled?: boolean;
    icon?: React.ReactNode;
}

const SilverButton: React.FC<SilverButtonProps> = ({
    title,
    onPress,
    style,
    textStyle,
    disabled,
    icon
}) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled}
            activeOpacity={0.8}
            style={[styles.container, style]}
        >
            <LinearGradient
                colors={Colors.silverGradient as any}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.gradient}
            >
                <View style={styles.content}>
                    {icon && <View style={styles.iconContainer}>{icon}</View>}
                    <Text style={[styles.text, textStyle]}>{title}</Text>
                </View>
            </LinearGradient>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 12,
        overflow: 'hidden',
        height: 44,
        shadowColor: '#fff',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    gradient: {
        flex: 1,
    },
    content: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 16,
    },
    iconContainer: {
        marginRight: 8,
    },
    text: {
        color: '#000',
        fontSize: 13,
        fontWeight: '900',
        letterSpacing: 1,
    }
});

export default SilverButton;
