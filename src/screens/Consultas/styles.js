import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';

export default StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: colors.primaryLight, // Fundo principal da tela (azul claro)
    },
    header: {
        paddingHorizontal: 20,
        paddingBottom: 24, // Mais padding para o título ficar bem posicionado
    },
    headerTitle: {
        ...typography.h2,
        color: colors.primaryDark,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    content: {
        flex: 1,
        backgroundColor: colors.background, // Fundo branco para a lista
        borderTopLeftRadius: 24,            // Canto arredondado
        borderTopRightRadius: 24,           // Canto arredondado
        paddingHorizontal: 20,              // Padding lateral para a lista
    },
    emptyListText: {
        textAlign: 'center',
        marginTop: 40,
        ...typography.body1,
        color: colors.textSecondary,
    },
    // Estilos para o Card de Consulta
    card: {
        backgroundColor: colors.white,
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: colors.border,
    },
    cardSelected: {
        borderColor: colors.primary,
        borderWidth: 2,
    },
    badge: {
        alignSelf: 'flex-start',
        paddingVertical: 4,
        paddingHorizontal: 12,
        borderRadius: 20,
        marginBottom: 12,
    },
    badgeText: {
        ...typography.caption,
        textTransform: 'uppercase',
        fontWeight: 'bold',
    },
    cardBody: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    cardMainInfo: {
        flex: 1,
    },
    doctorName: {
        ...typography.h4,
        color: colors.text,
        marginBottom: 4,
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    upsName: {
        ...typography.body2,
        color: colors.textSecondary,
        marginLeft: 4,
    },
    cardDateInfo: {
        alignItems: 'flex-end',
    },
    dateText: {
        ...typography.body2,
        color: colors.textSecondary,
    },
    timeText: {
        ...typography.h4,
        color: colors.text,
    },
    // Estilos para a Barra de Ações
    actionsContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: colors.white,
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 20, // Padding dinâmico será adicionado no componente
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        borderTopWidth: 1,
        borderColor: colors.border,
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
    },
    actionsTitle: {
        ...typography.h4,
        textAlign: 'center',
        color: colors.text,
        marginBottom: 16,
    },
    actionsButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    actionButton: {
        alignItems: 'center',
    },
    actionIconCircle: {
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    actionLabel: {
        ...typography.body2,
        color: colors.textSecondary,
    },
});