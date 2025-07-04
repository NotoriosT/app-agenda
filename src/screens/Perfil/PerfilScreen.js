// src/screens/Perfil/PerfilScreen.js
import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Button, Card, Icon, Divider, Avatar } from 'react-native-elements';
import { useAuth } from '../../contexts/AuthContext';
import { colors } from '../../theme/colors';

export default function PerfilScreen() {
    const { logout, municipe } = useAuth();

    if (!municipe) {
        return (
            <View style={styles.loadingContainer}>
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
        { label: 'UPS', value: municipe.upsLogadaNome, icon: 'hospital' },
        { label: 'Cartão SUS', value: municipe.cartaoSus, icon: 'hospital-symbol' },
    ];

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Card containerStyle={styles.profileCard} wrapperStyle={styles.profileWrapper}>
                <Avatar
                    size="xlarge"
                    rounded
                    title={initial}
                    containerStyle={styles.avatar}
                />
                <Text h3 style={styles.nameText}>
                    {municipe.nome}
                </Text>
                <Text style={styles.subtitle}>Munícipe Cadastrado</Text>
            </Card>

            <Card containerStyle={styles.infoCard}>
                {fields.map((f, i) => (
                    <View key={i} style={styles.fieldRow}>
                        <Icon
                            name={f.icon}
                            type="font-awesome-5"
                            size={20}
                            color={colors.primary}
                            containerStyle={styles.icon}
                        />
                        <View style={styles.textGroup}>
                            <Text style={styles.fieldLabel}>{f.label}</Text>
                            <Text style={styles.fieldValue}>{f.value || '—'}</Text>
                        </View>
                        {i < fields.length - 1 && <Divider style={styles.divider} />}
                    </View>
                ))}
            </Card>

            <Button
                title="Sair do Aplicativo"
                onPress={logout}
                buttonStyle={styles.logoutButton}
                icon={{ name: 'sign-out-alt', type: 'font-awesome-5', size: 18, color: 'white' }}
                iconRight
            />
        </ScrollView>
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
        color: colors.text,
        fontSize: 16,
    },
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: colors.background,
        alignItems: 'center',
    },
    profileCard: {
        alignItems: 'center',
        borderRadius: 16,
        paddingVertical: 30,
        width: '100%',
        backgroundColor: colors.primaryLight,
        marginBottom: 20,
    },
    profileWrapper: {
        margin: 0,
        padding: 0,
    },
    avatar: {
        backgroundColor: colors.primary,
        marginBottom: 15,
    },
    nameText: {
        color: colors.primaryDark,
        marginBottom: 5,
    },
    subtitle: {
        color: colors.textSecondary,
        fontSize: 14,
    },
    infoCard: {
        width: '100%',
        borderRadius: 12,
        padding: 15,
        marginBottom: 30,
        backgroundColor: colors.cardBackground,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    fieldRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
    },
    icon: {
        width: 30,
        alignItems: 'center',
    },
    textGroup: {
        marginLeft: 12,
        flex: 1,
    },
    fieldLabel: {
        fontSize: 13,
        fontWeight: 'bold',
        color: colors.textSecondary,
    },
    fieldValue: {
        fontSize: 16,
        color: colors.text,
        marginTop: 2,
    },
    divider: {
        position: 'absolute',
        bottom: 0,
        left: 40,
        right: 0,
        backgroundColor: colors.divider,
    },
    logoutButton: {
        backgroundColor: colors.error,
        width: '100%',
        borderRadius: 10,
        paddingVertical: 14,
    },
});
