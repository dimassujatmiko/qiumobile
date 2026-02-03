import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import RootNavigator from './src/navigation/RootNavigator';
import { Colors } from './src/theme/Theme';
import { CartProvider } from './src/context/CartContext';
import { AuthProvider } from './src/context/AuthContext';
import { LinearGradient } from 'expo-linear-gradient';

export default function App() {
  const [fontsLoaded] = useFonts({
    // Add custom fonts here if needed
  });

  return (
    <AuthProvider>
      <CartProvider>
        <NavigationContainer theme={{
          dark: true,
          colors: {
            primary: Colors.primary,
            background: 'transparent',
            card: Colors.card,
            text: Colors.text,
            border: Colors.border,
            notification: Colors.primary,
          },
          fonts: {
            regular: { fontFamily: 'System', fontWeight: '400' },
            medium: { fontFamily: 'System', fontWeight: '500' },
            bold: { fontFamily: 'System', fontWeight: '700' },
            heavy: { fontFamily: 'System', fontWeight: '900' },
          },
        }}>
          <LinearGradient
            colors={['#1A1A1A', '#000000']}
            style={styles.container}
          >
            <StatusBar style="light" />
            <RootNavigator />
          </LinearGradient>
        </NavigationContainer>
      </CartProvider>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});
