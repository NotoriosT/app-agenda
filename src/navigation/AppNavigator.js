// src/navigation/AppNavigator.js

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context'; // 1. Importar o Provider
import { useAuth } from '../contexts/AuthContext';
import LoginScreen from '../screens/Login/LoginScreen';
import MainTabNavigator from './MainTabNavigator';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
    const { isAuth, loading } = useAuth();
    if (loading) return null;

    return (
        // 2. Envolver o NavigationContainer com o SafeAreaProvider
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
