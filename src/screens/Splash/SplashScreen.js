// src/screens/Splash/SplashScreen.js

import React from 'react';
import { View, Image, ActivityIndicator, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import styles from './styles';

export default function SplashScreen() {
    return (
        <View style={styles.container}>
            <Image
                source={require('../../assets/imagens/esteio_logo_full.png')}
                style={styles.logo}
                resizeMode="contain"
            />
            <ActivityIndicator
                size="large"
                color={colors.primary}
                style={styles.spinner}
            />
        </View>
    );
}