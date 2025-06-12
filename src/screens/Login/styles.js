// src/screens/Login/styles.js

import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

export default StyleSheet.create({
    avoiding: {
        flex: 1,
        backgroundColor: '#fff',      // garante fundo branco durante o ajuste
    },
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: colors.bg,    // cor de fundo original
        justifyContent: 'center',      // mantém o form centralizado
    },
    content: {
        width: '100%',                // ocupa toda a largura disponível
    },

    /* Cabeçalho */
    header: {
        alignItems: 'center',
        marginBottom: 32,
    },
    title: {
        fontSize: 22,
        fontWeight: '700',
        color: colors.primary,
        marginTop: 8,
    },

    /* Inputs */
    label: {
        fontSize: 14,
        color: colors.text,
        marginBottom: 4,
        marginTop: 8,
    },
    maskInput: {
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 12,
        paddingHorizontal: 12,
        height: 48,
        fontSize: 16,
        marginBottom: 24,
    },

    /* Checkbox + link */
    checkbox: {
        backgroundColor: 'transparent',
        borderWidth: 0,
        paddingLeft: 0,
        marginVertical: 8,
    },
    link: {
        color: colors.primary,
        marginBottom: 24,
        textAlign: 'right',
    },
});
