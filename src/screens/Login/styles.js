// src/screens/Login/styles.js

import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import { wp, hp } from '../../utils/dimensions'; // Importando o utilitário

export default StyleSheet.create({
    // Container principal que se ajusta ao teclado
    avoiding: {
        flex: 1,
        backgroundColor: colors.bg || '#F7F8FA', // Cor de fundo consistente
    },
    // Container que centraliza o conteúdo na tela
    container: {
        flex: 1,
        justifyContent: 'center', // Centraliza verticalmente
        alignItems: 'center', // Centraliza horizontalmente
        paddingHorizontal: wp('8%'), // Espaçamento lateral responsivo
        backgroundColor: colors.bg || '#F7F8FA',
    },
    // Wrapper para o conteúdo do formulário
    content: {
        width: '100%', // Ocupa toda a largura do container pai
        maxWidth: 400, // Largura máxima para telas maiores (tablets)
    },

    /* Cabeçalho */
    header: {
        alignItems: 'center',
        marginBottom: hp('5%'), // Espaçamento inferior responsivo
    },
    title: {
        fontSize: wp('6%'), // Tamanho da fonte responsivo
        fontWeight: '700',
        color: colors.primary,
        marginTop: hp('2%'), // Margem superior responsiva
        textAlign: 'center',
    },

    /* Inputs */
    label: {
        fontSize: wp('4%'), // Tamanho da fonte responsivo
        color: colors.text,
        marginBottom: hp('1%'),
        marginTop: hp('2%'),
    },
    maskInput: {
        borderWidth: 1,
        borderColor: '#E0E0E0',
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        paddingHorizontal: wp('4%'),
        height: hp('6.5%'), // Altura responsiva
        fontSize: wp('4.2%'), // Tamanho da fonte responsivo
        color: '#333',
        marginBottom: hp('3%'), // Espaçamento inferior responsivo
    },

    /* Link (se necessário) */
    link: {
        color: colors.primary,
        fontSize: wp('3.8%'),
        textAlign: 'right',
        paddingVertical: hp('1%'),
    },
});
