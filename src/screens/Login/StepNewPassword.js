// src/screens/Login/StepNewPassword.jsx

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, Button } from 'react-native-elements';

export default function StepNewPassword({
                                            confirm1,
                                            confirm2,
                                            onChangeConfirm1,
                                            onChangeConfirm2,
                                            onSave,
                                            onCancel
                                        }) {
    return (
        <View style={styles.wrapper}>
            <Input
                label="Nova senha"
                secureTextEntry
                value={confirm1}
                onChangeText={onChangeConfirm1}
                containerStyle={styles.input}
            />
            <Input
                label="Confirmar senha"
                secureTextEntry
                value={confirm2}
                onChangeText={onChangeConfirm2}
                containerStyle={styles.input}
            />
            <Button
                title="Salvar senha"
                onPress={onSave}
                buttonStyle={[styles.button, { marginBottom: 12 }]}
            />
            <Button
                title="Cancelar"
                type="outline"
                onPress={onCancel}
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
