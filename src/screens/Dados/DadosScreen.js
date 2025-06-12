// src/screens/Dados/DadosScreen.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';

export default function DadosScreen() {
    return (
        <View style={styles.center}>
            <Text h4>Tela: Meus Dados</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
