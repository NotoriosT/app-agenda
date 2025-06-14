
import React from 'react';
import { View } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';

export default function StepSms({ cpf, codigo, setCodigo, onSendOtp, onVerify, onBack }) {
    return (
        <>
            <Input
                label="CPF"
                labelStyle={typography.body2}
                value={cpf}
                editable={false}
                inputContainerStyle={{ backgroundColor: colors.background, marginBottom: 16 }}
                inputStyle={{ color: colors.textSecondary }}
            />
            <Input
                label="Código de verificação"
                labelStyle={typography.body2}
                placeholder="Insira o código recebido"
                keyboardType="numeric"
                maxLength={6}
                value={codigo}
                onChangeText={setCodigo}
            />
            <View style={{ marginTop: 32 }}>
                <Button title="Verificar" onPress={onVerify} containerStyle={{ marginBottom: 12 }} />
                <Button title="Reenviar código" onPress={onSendOtp} type="outline" containerStyle={{ marginBottom: 12 }} />
                <Button title="Digitar CPF novamente" onPress={onBack} type="outline" containerStyle={{ marginBottom: 12 }} />
            </View>
        </>
    );
}