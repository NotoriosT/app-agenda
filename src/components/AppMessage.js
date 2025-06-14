// src/components/AppMessage.js

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Overlay, Text, Button, Icon } from 'react-native-elements';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

// Ícones atualizados com as cores do tema
const iconsByType = {
    error:   { name: 'error',        color: colors.error },
    success: { name: 'check-circle', color: colors.secondary },
    info:    { name: 'info',         color: colors.primaryMedium }
};

export default function AppMessage({ visible, message, onAction }) {
    if (!message) return null;

    const {
        title   = 'Aviso',
        body    = '',
        type    = 'info',
        // A ação padrão agora é um botão de contorno
        actions = [{ id: 'close', label: 'Fechar', type: 'outline' }]
    } = message;

    const icon = iconsByType[type] || iconsByType.info;

    return (
        <Overlay
            isVisible={visible}
            overlayStyle={styles.card}
            onBackdropPress={() => onAction('close')}
        >
            <View style={styles.content}>
                <Icon {...icon} size={48} containerStyle={styles.icon} />

                <Text style={styles.title}>{title}</Text>
                <Text style={styles.body}>{body}</Text>

                {actions.map((a) => (
                    <Button
                        key={a.id}
                        title={a.label}
                        // O tipo do botão (solid/outline) vem da própria ação
                        type={a.type || 'solid'}
                        onPress={() => onAction(a.id)}
                        // Os estilos agora vêm do tema global, mas podemos adicionar margens
                        containerStyle={{ width: '100%', marginTop: 8 }}
                    />
                ))}
            </View>
        </Overlay>
    );
}

const styles = StyleSheet.create({
    card: {
        width: '85%',
        maxWidth: 340,
        borderRadius: 20,
        padding: 0,
        backgroundColor: colors.white,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 10,
        elevation: 8,
    },
    content: { padding: 24, alignItems: 'center' },
    icon:    { marginBottom: 12 },
    title: {
        ...typography.h3,
        color: colors.text,
        textAlign: 'center',
        marginBottom: 8,
    },
    body: {
        ...typography.body2,
        color: colors.textSecondary,
        textAlign: 'center',
        marginBottom: 24,
    },
});
