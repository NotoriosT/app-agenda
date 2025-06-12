import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, Button } from 'react-native-elements';

export default function StepCpf({ cpf, onChange, onContinue }) {
    // Log inicial do valor de CPF quando o componente renderiza
    console.log('[StepCpf] Render - CPF atual:', cpf);

    const handleChange = (value) => {
        console.log('[StepCpf] onChangeText:', value);
        onChange(value);
    };

    const handleContinue = () => {
        console.log('[StepCpf] onContinue pressed - CPF final:', cpf);
        onContinue();
    };

    return (
        <View style={styles.wrapper}>
            <Input
                label="CPF"
                value={cpf}
                onChangeText={handleChange}
                keyboardType="numeric"
                placeholder="___.___.___-__"
                containerStyle={styles.input}
            />
            <Button
                title="Continuar"
                onPress={handleContinue}
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
        marginBottom: 24
    },
    button: {
        borderRadius: 8,
        paddingVertical: 12
    }
});
