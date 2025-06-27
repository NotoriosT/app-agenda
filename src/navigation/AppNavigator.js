// src/navigation/AppNavigator.js

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useAuth } from '../contexts/AuthContext';

// Telas
import LoginScreen from '../screens/Login/LoginScreen';
import MainTabNavigator from './MainTabNavigator';
import SplashScreen from '../screens/Splash/SplashScreen'; // 1. Importe a nova tela

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
    const { isAuth, loading } = useAuth();

    if (loading) {
        return <SplashScreen />;
    }

    return (
        <SafeAreaProvider>
            <NavigationContainer>
                {isAuth ? (
                    <MainTabNavigator />
                ) : (
                    <Stack.Navigator screenOptions={{ headerShown: false }}>
                        <Stack.Screen name="Login" component={LoginScreen} />
                    </Stack.Navigator>
                )}
            </NavigationContainer>
        </SafeAreaProvider>
    );
}
