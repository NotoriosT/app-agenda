// src/theme/typography.js

/**
 * Definições de fontes e hierarquia de texto baseadas no UI Kit.
 * Requer que as fontes 'Sen' e 'Manrope' estejam carregadas no projeto.
 */

// Nomes das famílias de fontes carregadas via expo-font
const fontFamilySenBold = 'Sen_700Bold';
const fontFamilyManropeSemiBold = 'Manrope_600SemiBold';
const fontFamilyManropeRegular = 'Manrope_400Regular';

export const typography = {
    // Mapeamento das famílias para facilitar o uso
    fonts: {
        sen: {
            bold: fontFamilySenBold,
        },
        manrope: {
            semiBold: fontFamilyManropeSemiBold,
            regular: fontFamilyManropeRegular,
        },
    },

    // Hierarquia de texto para Mobile
    h1: {
        fontFamily: fontFamilySenBold,
        fontSize: 28,
    },
    h2: {
        fontFamily: fontFamilySenBold,
        fontSize: 24,
    },
    h3: {
        fontFamily: fontFamilyManropeSemiBold,
        fontSize: 20,
    },
    h4: {
        fontFamily: fontFamilyManropeSemiBold,
        fontSize: 18,
    },
    body1: {
        fontFamily: fontFamilyManropeRegular,
        fontSize: 16,
        lineHeight: 16 * 1.5,
    },
    body2: {
        fontFamily: fontFamilyManropeRegular,
        fontSize: 14,
        lineHeight: 14 * 1.5,
    },
    caption: {
        fontFamily: fontFamilyManropeRegular,
        fontSize: 12,
    },
    button: {
        fontFamily: fontFamilyManropeSemiBold,
        fontSize: 16,
    },
};
