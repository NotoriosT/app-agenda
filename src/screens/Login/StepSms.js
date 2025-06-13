// src/screens/Login/StepSms.jsx

import React from 'react';
import { View } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';

export default function StepSms({
    cpf,
    codigo,
    setCodigo,
    onSendOtp,
    onVerify,
    onBack,
}) {
    return (
        <>
            {/* Campo de CPF (desabilitado) */}
            <Input
                label="CPF"
                labelStyle={typography.body2}
                value={cpf}
                editable={false}
                inputContainerStyle={{
                    backgroundColor: colors.background,
                    marginBottom: 16, // Espaçamento entre os inputs
                }}
                inputStyle={{ color: colors.textSecondary }}
            />

            {/* Campo do Código de Verificação */}
            <Input
                label="Código de verificação"
                labelStyle={typography.body2}
                placeholder="Insira o código recebido"
                keyboardType="numeric"
                maxLength={6}
                value={codigo}
                onChangeText={setCodigo}
            />

            {/* Botões de Ação */}
            <View style={{ marginTop: 24 }}>
                <Button
                    title="Verificar"
                    onPress={onVerify}
                    containerStyle={{ marginBottom: 12 }}
                />
                <Button
                    title="Reenviar código"
                    onPress={onSendOtp}
                    type="outline"
                    containerStyle={{ marginBottom: 12 }}
                />
                <Button
                    title="Digitar CPF novamente"
                    onPress={onBack}
                    type="clear"
                    titleStyle={{ color: colors.textSecondary }}
                />
            </View>
        </>
    );
}
