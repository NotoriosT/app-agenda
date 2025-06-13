// src/screens/Login/StepNewPassword.jsx

import React, { useState } from 'react';
import { View } from 'react-native';
import { Input, Button, Icon } from 'react-native-elements';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';

export default function StepNewPassword({
    confirm1,
    setConfirm1,
    confirm2,
    setConfirm2,
    onSave,
    onCancel,
}) {
    const [secureText1, setSecureText1] = useState(true);
    const [secureText2, setSecureText2] = useState(true);

    return (
        <>
            {/* Campo Nova Senha */}
            <Input
                label="Nova senha"
                labelStyle={typography.body2}
                placeholder="Crie uma nova senha"
                secureTextEntry={secureText1}
                value={confirm1}
                onChangeText={setConfirm1}
                rightIcon={
                    <Icon
                        name={secureText1 ? 'visibility-off' : 'visibility'}
                        type="material"
                        color={colors.placeholder}
                        onPress={() => setSecureText1(!secureText1)}
                    />
                }
                // Adiciona um espaçamento consistente abaixo deste input
                containerStyle={{ marginBottom: 16 }}
            />

            {/* Campo Confirmar Senha */}
            <Input
                label="Confirmar nova senha"
                labelStyle={typography.body2}
                placeholder="Digite a nova senha novamente"
                secureTextEntry={secureText2}
                value={confirm2}
                onChangeText={setConfirm2}
                rightIcon={
                    <Icon
                        name={secureText2 ? 'visibility-off' : 'visibility'}
                        type="material"
                        color={colors.placeholder}
                        onPress={() => setSecureText2(!secureText2)}
                    />
                }
            />

            {/* Botões de Ação */}
            <View style={{ marginTop: 24 }}>
                <Button
                    title="Salvar senha"
                    onPress={onSave}
                    containerStyle={{ marginBottom: 12 }}
                />
                <Button title="Cancelar" type="outline" onPress={onCancel} />
            </View>
        </>
    );
}
