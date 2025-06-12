// src/screens/Login/StepSms.jsx

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, Button, Divider } from 'react-native-elements';

export default function StepSms({
                                    cpf,
                                    codigo,
                                    onChangeCodigo,
                                    onSendOtp,
                                    onVerify,
                                    onBack
                                }) {
    return (
        <View style={styles.wrapper}>
            <Input
                label="CPF"
                value={cpf}
                editable={false}
                containerStyle={styles.input}
            />
            <Input
                label="Código de verificação"
                placeholder="123456"
                keyboardType="numeric"
                maxLength={6}
                value={codigo}
                onChangeText={onChangeCodigo}
                containerStyle={styles.input}
            />

            <Divider style={{ marginVertical: 16 }} />

            <Button
                title="Receber código"
                onPress={onSendOtp}
                buttonStyle={[styles.button, { marginBottom: 12 }]}
            />
            <Button
                title="Verificar"
                onPress={onVerify}
                buttonStyle={[styles.button, { marginBottom: 12 }]}
            />
            <Button
                title="Voltar"
                type="outline"
                onPress={onBack}
                buttonStyle={styles.button}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
        marginVertical: 16
    },
    input: {
        marginBottom: 16
    },
    button: {
        borderRadius: 8,
        paddingVertical: 12
    }
});
