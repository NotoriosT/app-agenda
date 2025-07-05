// src/screens/Perfil/PerfilScreen.js
import React from 'react';
import { View, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { Text, Button, Icon, Avatar } from 'react-native-elements';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '../../contexts/AuthContext';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';

// Componente para cada item de informação do perfil
const InfoRow = ({ icon, label, value }) => (
    <View style={styles.fieldRow}>
        <Icon
            name={icon}
            type="font-awesome-5"
            size={20}
            color={colors.primary}
            containerStyle={styles.iconContainer}
        />
        <View style={styles.textGroup}>
            <Text style={styles.fieldLabel}>{label}</Text>
            <Text style={styles.fieldValue} numberOfLines={1} ellipsizeMode="tail">
                {value || 'Não informado'}
            </Text>
        </View>
    </View>
);

export default function PerfilScreen() {
    const { logout, municipe } = useAuth();
    const insets = useSafeAreaInsets();

    if (!municipe) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={colors.primary} />
                <Text style={styles.loadingText}>Carregando perfil...</Text>
            </View>
        );
    }

    const initial = municipe.nome
        ? municipe.nome
              .split(' ')
              .map((s) => s[0])
              .slice(0, 2)
              .join('')
        : '';

    const fields = [
        { label: 'CPF', value: municipe.cpf, icon: 'id-card' },
        { label: 'E-mail', value: municipe.email, icon: 'envelope' },
        {
            label: 'Celular',
            value:
                municipe.dddCelular && municipe.celular
                    ? `(${municipe.dddCelular}) ${municipe.celular}`
                    : null,
            icon: 'mobile-alt',
        },
        { label: 'Unidade de Saúde', value: municipe.upsLogadaNome, icon: 'hospital' },
        { label: 'Cartão SUS', value: municipe.cartaoSus, icon: 'hospital-symbol' },
    ];

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            {/* Seção do Cabeçalho */}
            <View style={styles.headerSection}>
                <Avatar
                    size="large"
                    rounded
                    title={initial}
                    containerStyle={styles.avatar}
                    titleStyle={styles.avatarTitle}
                />
                <Text style={styles.nameText} numberOfLines={1} ellipsizeMode="tail">
                    {municipe.nome}
                </Text>
                <Text style={styles.subtitle}>Munícipe de Esteio</Text>
            </View>

            {/* Seção de Informações com Scroll */}
            <ScrollView 
                style={styles.infoSection} 
                contentContainerStyle={styles.infoContentContainer}
                showsVerticalScrollIndicator={false}
            >
                {fields.map((field, index) => (
                    <InfoRow
                        key={index}
                        icon={field.icon}
                        label={field.label}
                        value={field.value}
                    />
                ))}
            </ScrollView>

            {/* Seção do Botão (fixa no final) */}
            <View style={[styles.footerSection, { paddingBottom: insets.bottom > 0 ? insets.bottom : 20 }]}>
                <Button
                    title="Sair do Aplicativo"
                    onPress={logout}
                    buttonStyle={styles.logoutButton}
                    titleStyle={styles.logoutButtonTitle}
                    icon={{
                        name: 'sign-out-alt',
                        type: 'font-awesome-5',
                        size: 18,
                        color: 'white',
                    }}
                    iconRight
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.background,
    },
    loadingText: {
        ...typography.body1,
        color: colors.textSecondary,
        marginTop: 16,
    },
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    // Seção do Cabeçalho
    headerSection: {
        backgroundColor: colors.primaryLight,
        paddingHorizontal: 24,
        paddingBottom: 24,
        paddingTop: 20,
        alignItems: 'center',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    avatar: {
        backgroundColor: colors.primary,
        borderWidth: 3,
        borderColor: colors.white,
    },
    avatarTitle: {
        ...typography.h2,
    },
    nameText: {
        ...typography.h2,
        color: colors.primaryDark,
        marginTop: 16,
        textAlign: 'center',
    },
    subtitle: {
        ...typography.body1,
        color: colors.textSecondary,
        marginTop: 4,
    },
    // Seção de Informações
    infoSection: {
        flex: 1,
        
    },
    infoContentContainer: {
        paddingHorizontal: 20,
        paddingTop: 40,
        paddingBottom: 24,
    },
    fieldRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.white,
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        
    
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: colors.primaryLight,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    textGroup: {
        flex: 1,
    },
    fieldLabel: {
        ...typography.caption,
        color: colors.textSecondary,
        textTransform: 'uppercase',
        marginBottom: 2,
    },
    fieldValue: {
        ...typography.body1,
        color: colors.text,
        fontWeight: '600',
    },
    // Seção do Rodapé
    footerSection: {
        paddingHorizontal: 20,
        paddingTop: 10,
        backgroundColor: colors.background,
    },
    logoutButton: {
        backgroundColor: colors.error,
        borderRadius: 12,
        paddingVertical: 14,
    },
    logoutButtonTitle: {
        ...typography.button,
        marginRight: 10,
    },
});
