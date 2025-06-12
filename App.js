// App.js
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from 'react-native-elements';
import { AuthProvider }  from './src/contexts/AuthContext';
import AppNavigator      from './src/navigation/AppNavigator';
import { theme }         from './src/theme';

export default function App() {
    return (
        <ThemeProvider theme={theme}>
            <AuthProvider>
                <AppNavigator />
                <StatusBar style="auto" />
            </AuthProvider>
        </ThemeProvider>
    );
}
