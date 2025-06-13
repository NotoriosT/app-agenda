// src/screens/Login/StepCpf.jsx

import React from 'react';
import { Text } from 'react-native-elements';
import MaskInput, { Masks } from 'react-native-mask-input';
import PrimaryButton from '../../components/PrimaryButton';
import styles from './styles';

export default function StepCpf({ cpf, setCpf, onContinue }) {
    return (
        <>
            <Text style={styles.label}>CPF</Text>
            <MaskInput
                value={cpf}
                onChangeText={(masked) => setCpf(masked)}
                mask={Masks.BRL_CPF}
                keyboardType="numeric"
                placeholder="Digite seu CPF"
                style={styles.maskInput}
                placeholderTextColor="#9E9E9E"
            />
            <PrimaryButton title="Continuar" onPress={onContinue} />
        </>
    );
}
