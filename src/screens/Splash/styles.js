// src/screens/Splash/styles.js

import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import { wp } from '../../utils/dimensions';

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.background,
    },
    logo: {
        width: wp('100%'), // O logo ocupará 70% da largura da tela
        height: undefined,
        aspectRatio: 2, // Ajuste este valor para a proporção da sua imagem
        marginBottom: 60,
    },
    spinner: {
        position: 'absolute',
        bottom: '20%',
    },
});
