import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Overlay, Text, Button, Icon } from 'react-native-elements';
import { colors } from '../theme/colors'; // precisa ter primary & primaryLight

/* ícones por tipo de mensagem */
const iconsByType = {
    error:   { name: 'error',        color: '#D32F2F' },
    success: { name: 'check-circle', color: '#2E7D32' },
    info:    { name: 'info',         color: colors.primary }
};

const neutral = '#607D8B';

export default function AppMessage({ visible, message, onAction }) {
    if (!message) return null;

    /* valores-padrão caso o chamador mande algo parcial */
    const {
        title   = 'Aviso',
        body    = '',
        type    = 'info',
        actions = [{ id: 'close', label: 'Fechar' }]
    } = message;

    const icon = iconsByType[type] || iconsByType.info;

    /* cor do botão por id */
    const colorFor = (id) => {
        if (id === 'findUbs') return colors.primary;
        if (id === 'close')   return colors.primaryLight;
        return neutral;
    };

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
                        type="solid"
                        buttonStyle={[
                            styles.button,
                            { backgroundColor: colorFor(a.id) }
                        ]}
                        titleStyle={{ fontWeight: '600' }}
                        onPress={() => onAction(a.id)}
                    />
                ))}
            </View>
        </Overlay>
    );
}

const styles = StyleSheet.create({
    card: {
        width: 300,
        borderRadius: 20,
        padding: 0,
        backgroundColor: '#F5F5F7',
        shadowColor: '#000',
        shadowOpacity: 0.15,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 10,
        elevation: 6
    },
    content: { padding: 24, alignItems: 'center' },
    icon:    { marginBottom: 8 },
    title: {
        fontSize: 18,
        fontWeight: '700',
        textAlign: 'center',
        color: '#212121',
        marginBottom: 4
    },
    body: {
        fontSize: 14,
        color: '#424242',
        textAlign: 'center',
        marginBottom: 16
    },
    button: {
        alignSelf: 'stretch',
        borderRadius: 12,
        height: 44,
        marginTop: 6
    }
});
