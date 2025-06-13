// App.js
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from 'react-native-elements';
import { AuthProvider } from './src/contexts/AuthContext';
import AppNavigator from './src/navigation/AppNavigator';
import { theme } from './src/theme';
import { useFonts } from 'expo-font';
export default function App() {
    const [fontsLoaded] = useFonts({
        Sen_700Bold: require('./assets/fonts/Sen-Bold.ttf'), // Ou use o pacote
        Manrope_600SemiBold: require('./assets/fonts/Manrope-SemiBold.ttf'),
        Manrope_400Regular: require('./assets/fonts/Manrope-Regular.ttf'),
    });
    if (!fontsLoaded) {
        return null; // Ou um <AppLoading />
    }
    return (
        <ThemeProvider theme={theme}>
            <AuthProvider>
                <AppNavigator />
                <StatusBar style="auto" />
            </AuthProvider>
        </ThemeProvider>
    );
}
