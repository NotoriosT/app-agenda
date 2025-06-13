// src/theme/index.js

import { colors } from './colors';
import { typography } from './typography';

/**
 * Tema global para o React Native Elements, com base no UI Kit.
 */
export const theme = {
  // Disponibiliza a paleta de cores no tema
  colors: colors,

  // Estilo padrão para o componente Text
  Text: {
    style: {
      ...typography.body1,      // Estilo padrão é o "Corpo de Texto 1"
      color: colors.text,        // Cor de texto principal
    },
    h1Style: typography.h1,
    h2Style: typography.h2,
    h3Style: typography.h3,
    h4Style: typography.h4,
  },

  // Estilo padrão para o componente Button
  Button: {
    buttonStyle: {
      backgroundColor: colors.primary, // Cor principal para botões
      borderRadius: 8,
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
    titleStyle: {
      ...typography.button,
      color: colors.white,
    },
  },

  // Estilo padrão para o componente Input
  Input: {
    containerStyle: {
      paddingHorizontal: 0,
    },
    inputContainerStyle: {
      backgroundColor: colors.inputBackground,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 8,
      paddingHorizontal: 16,
      height: 52, // Altura fixa para consistência
    },
    inputStyle: {
      ...typography.body1,
      color: colors.text,
    },
    labelStyle: {
      ...typography.body2,
      color: colors.textSecondary,
      marginBottom: 8,
      fontWeight: 'normal',
    },
    placeholderTextColor: colors.placeholder,
  },

  // Estilo padrão para o componente Icon
  Icon: {
    color: colors.textSecondary, // Cor padrão para ícones é o cinza secundário
  },
};
