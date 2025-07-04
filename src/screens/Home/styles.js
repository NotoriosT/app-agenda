import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';

export default StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: colors.primaryLight,
    },
    // Estilo do cabeçalho ajustado para o layout com logo
    header: {
        flexDirection: 'row', // Alinha os itens horizontalmente
        alignItems: 'center',  // Centraliza os itens verticalmente
        paddingHorizontal: 20,
        paddingBottom: 24,
    },
    headerTitle: {
        ...typography.h2,
        color: colors.primaryDark,
        fontWeight: 'bold',
        marginLeft: 16, // Adiciona espaço entre o logo e o texto
    },
    content: {
        flex: 1,
        backgroundColor: colors.background,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        paddingHorizontal: 16,
        paddingTop: 12,
    },
    sectionTitle: {
        ...typography.h3,
        color: colors.text,
        marginTop: 24,
        marginBottom: 16,
        paddingHorizontal: 4,
    },
    actionsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    actionCard: {
        backgroundColor: colors.white,
        borderRadius: 16,
        width: '48%',
        padding: 16,
        marginBottom: 16,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: colors.border,
        minHeight: 120,
    },
    actionCardTitle: {
        ...typography.body2,
        color: colors.textSecondary,
        marginTop: 12,
        textAlign: 'center',
        fontWeight: '600',
    },
});