// src/screens/Login/StepPassword.jsx

import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text, Input, Button, CheckBox, Icon } from 'react-native-elements';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';

export default function StepPassword({
    cpf,
    senha,
    setSenha,
    lembrar,
    setLembrar,
    onLogin,
    onForgot,
}) {
    const [secureText, setSecureText] = useState(true);

    const toggleSecureText = () => {
        setSecureText(!secureText);
    };

    return (
        <>
            <Input
                label="CPF"
                value={cpf}
                editable={false}
                inputContainerStyle={{ backgroundColor: colors.background }}
                containerStyle={{ marginBottom: 8 }}
                inputStyle={{ color: colors.textSecondary }}
                labelStyle={typography.body2}
            />
            <Input
                label="Senha"
                placeholder="Digite sua senha"
                value={senha}
                onChangeText={setSenha}
                secureTextEntry={secureText}
                rightIcon={
                    <Icon
                        name={secureText ? 'visibility-off' : 'visibility'}
                        type="material"
                        color={colors.placeholder}
                        onPress={toggleSecureText}
                    />
                }
                labelStyle={typography.body2}
            />
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: 4,
                    marginBottom: 32, // Espaçamento padrão aplicado
                }}
            >
                <CheckBox
                    title="Lembrar-me"
                    checked={lembrar}
                    onPress={() => setLembrar(!lembrar)}
                    containerStyle={{
                        backgroundColor: 'transparent',
                        borderWidth: 0,
                        padding: 0,
                        marginLeft: 0,
                    }}
                    textStyle={{
                        ...typography.body2,
                        color: colors.textSecondary,
                        fontWeight: 'normal',
                    }}
                    checkedColor={colors.primary}
                />
                <TouchableOpacity onPress={onForgot}>
                    <Text
                        style={{
                            ...typography.body2,
                            color: colors.primary,
                            fontWeight: 'bold',
                        }}
                    >
                        Esqueci minha senha
                    </Text>
                </TouchableOpacity>
            </View>
            <Button title="Entrar" onPress={onLogin} />
        </>
    );
}
