// src/screens/Login/StepPassword.jsx

import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text, Input, Button, CheckBox, Icon } from 'react-native-elements';
import styles from './styles'; // Usado para o estilo do label
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';

export default function StepPassword({
    cpf,
    senha,
    setSenha, // Prop correta para atualizar a senha
    lembrar,
    setLembrar, // Prop correta para atualizar o "lembrar-me"
    onLogin,
    onForgot,
}) {
    const [secureText, setSecureText] = useState(true);

    const toggleSecureText = () => {
        setSecureText(!secureText);
    };

    return (
        <>
            {/* Campo de CPF (desabilitado) */}
            <Text style={styles.label}>CPF</Text>
            <Input
                value={cpf}
                editable={false}
                inputContainerStyle={{ backgroundColor: colors.background }}
                inputStyle={{ color: colors.textSecondary }}
            />

            {/* Campo de Senha */}
            <Text style={styles.label}>Senha</Text>
            <Input
                placeholder="Digite sua senha"
                value={senha}
                onChangeText={setSenha} // Corrigido: Usando a prop correta
                secureTextEntry={secureText}
                autoFocus={true}
                rightIcon={
                    <Icon
                        name={secureText ? 'visibility-off' : 'visibility'}
                        type="material"
                        color={colors.placeholder}
                        onPress={toggleSecureText}
                    />
                }
            />

            {/* Opções 'Lembrar-me' e 'Esqueci a senha' */}
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: 8,
                    marginBottom: 24,
                }}
            >
                <CheckBox
                    title="Lembrar-me"
                    checked={lembrar}
                    onPress={() => setLembrar(!lembrar)} // Corrigido: Usando a prop correta
                    containerStyle={{
                        backgroundColor: 'transparent',
                        borderWidth: 0,
                        marginLeft: -10,
                        padding: 0,
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
                        style={{ ...typography.body2, color: colors.primary }}
                    >
                        Esqueci minha senha
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Botão de Login */}
            <Button title="Entrar" onPress={onLogin} />
        </>
    );
}
