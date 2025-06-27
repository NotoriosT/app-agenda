// src/components/UpsDestinoPicker.js

import React from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { View, StyleSheet } from 'react-native';

export default function UpsDestinoPicker({
    value,
    onChange,
    items = [],
    enabled = false,
    placeholder = {
        label: '-- escolha UPS destino --',
        value: null,
        color: '#9A9A9A',
    },
    primary = '#4fa7d8',
    border = '#D1D1D6',
}) {
    return (
        <View
            style={[
                styles.container,
                {
                    borderColor: value ? primary : border,
                    opacity: enabled ? 1 : 0.4,
                },
            ]}
        >
            <RNPickerSelect
                value={value}
                onValueChange={onChange}
                // --- CORREÇÃO AQUI ---
                // Adicionamos a propriedade "key" a cada item
                items={items.map((item) => ({
                    label: item.nome,
                    value: item.id,
                    key: item.id,
                }))}
                // ---------------------
                disabled={!enabled}
                placeholder={placeholder}
                useNativeAndroidPickerStyle={false}
                Icon={null}
                style={{
                    inputIOS: {
                        color: '#333',
                        fontSize: 16,
                        paddingVertical: 0,
                    },
                    inputAndroid: {
                        color: '#333',
                        fontSize: 16,
                        paddingVertical: 0,
                    },
                    placeholder: { color: '#9A9A9A' },
                }}
                touchableWrapperProps={{ style: styles.touchable }}
            />
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        height: 48,
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 24,
        paddingHorizontal: 12,
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    touchable: { flex: 1, justifyContent: 'center' },
});
