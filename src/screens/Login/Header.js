// src/screens/Login/Header.js

import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-elements';
import styles from './styles';
import { wp } from '../../utils/dimensions'; // Importando wp
import Logo from '../../components/Logo'; // 1. Importe o novo componente

export default function Header() {
    const logoSize = wp('25%'); // Pode ajustar este valor se necessário

    return (
        <View style={styles.header}>
            {/* 2. Substitua o Icon pelo Logo, passando o tamanho responsivo */}
            <Logo width={logoSize} height={logoSize} />

            <Text style={styles.title}>Prefeitura de Esteio</Text>
        </View>
    );
}
