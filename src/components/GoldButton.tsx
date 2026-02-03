import React from 'react';
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    ImageBackground,
    View,
    TextStyle,
    ViewStyle,
    Animated
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../theme/Theme';

interface GoldButtonProps {
    title: string;
    onPress: () => void;
    style?: ViewStyle;
    textStyle?: TextStyle;
    disabled?: boolean;
    loading?: boolean;
    icon?: React.ReactNode;
}

const GoldButton: React.FC<GoldButtonProps> = ({
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
                colors={Colors.goldGradient as any}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.gradient}
            >
                <ImageBackground
                    source={require('../../assets/gold_texture.png')}
                    style={styles.texture}
                    imageStyle={{ opacity: 0.15, resizeMode: 'cover' }}
                >
                    <View style={styles.content}>
                        {icon && <View style={styles.iconContainer}>{icon}</View>}
                        <Text style={[styles.text, textStyle]}>{title}</Text>
                    </View>
                </ImageBackground>
            </LinearGradient>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 16,
        overflow: 'hidden',
        height: 56,
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    gradient: {
        flex: 1,
    },
    texture: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    iconContainer: {
        marginRight: 10,
    },
    text: {
        color: '#000',
        fontSize: 16,
        fontWeight: '900',
        letterSpacing: 1,
    }
});

export default GoldButton;
