// src/navigation/AppNavigator.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../contexts/AuthContext';
import LoginScreen from '../screens/Login/LoginScreen';
import PrivateDrawer from './PrivateDrawer';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
    const { isAuth, loading } = useAuth();
    if (loading) return null;

    return (
        <NavigationContainer>
            {isAuth ? (
                /* Drawer com todas as telas protegidas */
                <PrivateDrawer />
            ) : (
                /* Fluxo público só com Login */
                <Stack.Navigator screenOptions={{ headerShown:false }}>
                    <Stack.Screen name="Login" component={LoginScreen}/>
                </Stack.Navigator>
            )}
        </NavigationContainer>
    );
}
