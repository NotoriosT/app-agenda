// src/screens/Login/StepCpf.jsx

import React from 'react';
import { Input } from 'react-native-elements';
import MaskInput, { Masks } from 'react-native-mask-input';
import PrimaryButton from '../../components/PrimaryButton';
import { typography } from '../../theme/typography';

export default function StepCpf({ cpf, setCpf, onContinue }) {
    return (
        <>
            <Input
                label="CPF"
                labelStyle={typography.body2}
                placeholder="000.000.000-00"
                keyboardType="numeric"
                value={cpf}
                onChangeText={setCpf}
                // Integra o MaskInput diretamente no Input do React Native Elements
                InputComponent={MaskInput}
                // Passa a prop 'mask' para o componente MaskInput
                mask={Masks.BRL_CPF}
            />

            <PrimaryButton
                title="Continuar"
                onPress={onContinue}
                containerStyle={{ marginTop: 24 }}
            />
        </>
    );
}
