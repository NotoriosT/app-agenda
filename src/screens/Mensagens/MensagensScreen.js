// src/screens/Mensagens/MensagensScreen.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import { colors } from '../../theme/colors';

export default function MensagensScreen() {
    return (
        <View style={styles.container}>
            <Text h3 style={{color: colors.text}}>Tela de Mensagens</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background },
});
