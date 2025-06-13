// src/utils/dimensions.js
import { Dimensions, PixelRatio } from 'react-native';

// Obtém a largura e altura da tela do dispositivo
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

/**
 * Converte uma porcentagem da largura da tela em pixels independentes de densidade (DP).
 * @param {string} widthPercent - A porcentagem da largura (ex: '50%').
 * @returns {number} O valor em DP.
 */
export const widthPercentageToDP = (widthPercent) => {
    const elemWidth =
        typeof widthPercent === 'number'
            ? widthPercent
            : parseFloat(widthPercent);
    return PixelRatio.roundToNearestPixel((screenWidth * elemWidth) / 100);
};

/**
 * Converte uma porcentagem da altura da tela em pixels independentes de densidade (DP).
 * @param {string} heightPercent - A porcentagem da altura (ex: '20%').
 * @returns {number} O valor em DP.
 */
export const heightPercentageToDP = (heightPercent) => {
    const elemHeight =
        typeof heightPercent === 'number'
            ? heightPercent
            : parseFloat(heightPercent);
    return PixelRatio.roundToNearestPixel((screenHeight * elemHeight) / 100);
};

// Para conveniência, podemos exportar apelidos mais curtos
export const wp = widthPercentageToDP;
export const hp = heightPercentageToDP;
