// src/screens/Consultas/styles.js

import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';

export default StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: colors.background,
        paddingHorizontal: 20,
    },
    header: {
        ...typography.h1,
        color: colors.text,
        marginBottom: 32,
        textAlign: 'center',
    },
    label: {
        ...typography.h4,
        color: colors.textSecondary,
        marginBottom: 8,
        marginTop: 24,
    },
    datePickerButton: {
        backgroundColor: colors.white,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 8,
        padding: 16,
        height: 52,
        justifyContent: 'center',
    },
    datePickerText: {
        ...typography.body1,
        color: colors.text,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    calendarWrapper: {
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 10,
        width: '90%',
    },
    slotContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 8,
    },
    slotButton: {
        backgroundColor: colors.white,
        padding: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: colors.border,
        margin: 6,
    },
    slotButtonSelected: {
        backgroundColor: colors.primary,
        borderColor: colors.primaryDark,
    },
    slotText: {
        ...typography.body2,
        color: colors.primary,
    },
    slotTextSelected: {
        color: colors.white,
        fontWeight: 'bold',
    },
});
