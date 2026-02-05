import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';

interface AuthContextType {
    isLoggedIn: boolean;
    user: any | null;
    login: (authData: any) => Promise<void>;
    logout: () => Promise<void>;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState<any | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Load session on startup
        loadSession();
    }, []);

    const loadSession = async () => {
        try {
            const token = await SecureStore.getItemAsync('access_token');
            const userData = await SecureStore.getItemAsync('user_data');

            if (token && userData) {
                setIsLoggedIn(true);
                setUser(JSON.parse(userData));
            }
        } catch (error) {
            console.error('Failed to load session:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const login = async (authData: any) => {
        const { session, user } = authData;

        try {
            // Save to SecureStore
            await SecureStore.setItemAsync('access_token', session.access_token);
            await SecureStore.setItemAsync('refresh_token', session.refresh_token);
            await SecureStore.setItemAsync('user_data', JSON.stringify(user));

            setIsLoggedIn(true);
            setUser(user);
        } catch (error) {
            console.error('Failed to save session:', error);
            throw error;
        }
    };

    const logout = async () => {
        try {
            await SecureStore.deleteItemAsync('access_token');
            await SecureStore.deleteItemAsync('refresh_token');
            await SecureStore.deleteItemAsync('user_data');

            setIsLoggedIn(false);
            setUser(null);
        } catch (error) {
            console.error('Failed to clear session:', error);
        }
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, user, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
