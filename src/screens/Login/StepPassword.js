// src/screens/Login/StepPassword.jsx

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, Button, CheckBox, Text } from 'react-native-elements';

export default function StepPassword({
                                         cpf,
                                         senha,
                                         lembrar,
                                         onChangeSenha,
                                         onToggleLembrar,
                                         onLogin,
                                         onForgot
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
                label="Senha"
                placeholder="Digite sua senha"
                secureTextEntry
                value={senha}
                onChangeText={onChangeSenha}
                containerStyle={styles.input}
            />
            <CheckBox
                title="Lembrar-me"
                checked={lembrar}
                onPress={onToggleLembrar}
                containerStyle={styles.checkbox}
            />
            <Text style={styles.link} onPress={onForgot}>
                Esqueceu a senha?
            </Text>
            <Button
                title="Entrar"
                onPress={onLogin}
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
    checkbox: {
        backgroundColor: 'transparent',
        borderWidth: 0,
        marginBottom: 8
    },
    link: {
        color: '#2089dc',
        textAlign: 'right',
        marginBottom: 24
    },
    button: {
        borderRadius: 8,
        paddingVertical: 12
    }
});
