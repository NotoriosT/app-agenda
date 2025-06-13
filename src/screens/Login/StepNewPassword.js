// src/screens/Login/StepNewPassword.jsx

import React, { useState } from 'react';
import { View } from 'react-native';
import { Text, Input, Button, Icon } from 'react-native-elements';
import styles from './styles'; // Apenas para o estilo do label
import { colors } from '../../theme/colors';

export default function StepNewPassword({
    confirm1,
    setConfirm1, // Prop correta
    confirm2,
    setConfirm2, // Prop correta
    onSave,
    onCancel,
}) {
    const [secureText1, setSecureText1] = useState(true);
    const [secureText2, setSecureText2] = useState(true);

    return (
        <>
            {/* Campo Nova Senha */}
            <Text style={styles.label}>Nova senha</Text>
            <Input
                placeholder="Crie uma nova senha"
                secureTextEntry={secureText1}
                value={confirm1}
                onChangeText={setConfirm1} // Usando a prop correta
                autoFocus={true}
                rightIcon={
                    <Icon
                        name={secureText1 ? 'visibility-off' : 'visibility'}
                        type="material"
                        color={colors.placeholder}
                        onPress={() => setSecureText1(!secureText1)}
                    />
                }
            />

            {/* Campo Confirmar Senha */}
            <Text style={styles.label}>Confirmar nova senha</Text>
            <Input
                placeholder="Digite a nova senha novamente"
                secureTextEntry={secureText2}
                value={confirm2}
                onChangeText={setConfirm2} // Usando a prop correta
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
