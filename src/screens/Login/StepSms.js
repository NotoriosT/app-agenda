// src/screens/Login/StepSms.jsx

import React from 'react';
import { View } from 'react-native';
import { Text, Input, Button } from 'react-native-elements';
import styles from './styles'; // Apenas para o estilo do label
import { colors } from '../../theme/colors';

export default function StepSms({
    cpf,
    codigo,
    setCodigo, // Nome correto da prop vinda do LoginScreen
    onSendOtp,
    onVerify,
    onBack,
}) {
    return (
        <>
            {/* Campo de CPF (desabilitado) */}
            <Text style={styles.label}>CPF</Text>
            <Input
                value={cpf}
                editable={false}
                // O tema global estiliza o input, mas sobrescrevemos o fundo
                // para que pareça um campo desabilitado, conforme o UI Kit.
                inputContainerStyle={{ backgroundColor: colors.background }}
                inputStyle={{ color: colors.textSecondary }}
            />

            {/* Campo do Código de Verificação */}
            <Text style={styles.label}>Código de verificação</Text>
            <Input
                placeholder="Insira o código recebido"
                keyboardType="numeric"
                maxLength={6}
                value={codigo}
                onChangeText={setCodigo} // Handler correto para atualizar o estado
                autoFocus={true} // Melhora a experiência do usuário
                // Este input será completamente estilizado pelo tema global.
            />

            {/* Botões de Ação */}
            <View style={{ marginTop: 24 }}>
                <Button
                    title="Verificar"
                    onPress={onVerify}
                    // O estilo de botão primário vem do tema global
                    containerStyle={{ marginBottom: 12 }}
                />

                <Button
                    title="Reenviar código"
                    onPress={onSendOtp}
                    type="outline" // Estilo de ação secundária
                    containerStyle={{ marginBottom: 12 }}
                />

                <Button
                    title="Digitar CPF novamente"
                    onPress={onBack}
                    type="clear" // Estilo de ação terciária (menos proeminente)
                    titleStyle={{ color: colors.textSecondary }}
                />
            </View>
        </>
    );
}
