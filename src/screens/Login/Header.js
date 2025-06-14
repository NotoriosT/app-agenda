// src/screens/Login/Header.js

import React from 'react';
import { View } from 'react-native';
import styles from './styles';
import { wp } from '../../utils/dimensions'; // Importando wp
import Logo from '../../components/Logo'; // 1. Importe o novo componente

export default function Header() {
    const logoSize = wp('25%'); // Pode ajustar este valor se necessário

    return (
        <View style={styles.header}>
            <Logo width={logoSize} height={logoSize} />
        </View>
    );
}
