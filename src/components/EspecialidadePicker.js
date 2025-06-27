// src/components/EspecialidadePicker.js

import React from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { StyleSheet, View, ActivityIndicator } from 'react-native';

export default function EspecialidadePicker({
    value,
    onChange,
    items = [],
    onOpenLoad,
    loading = false,
    placeholder = { label: '-- escolha --', value: null, color: '#9A9A9A' },
    primary = '#4fa7d8',
    border = '#D1D1D6',
}) {
    return (
        <View
            style={[
                styles.container,
                { borderColor: value ? primary : border },
            ]}
        >
            {loading && (
                <ActivityIndicator
                    size="small"
                    color={primary}
                    style={styles.spinner}
                />
            )}

            <RNPickerSelect
                value={value}
                onValueChange={onChange}
                // --- CORREÇÃO AQUI ---
                items={items.map(({ id, nome }) => ({
                    label: nome,
                    value: id,
                    key: id,
                }))}
                // ---------------------
                placeholder={placeholder}
                useNativeAndroidPickerStyle={false}
                style={{
                    ...pickerSelectStyles,
                    placeholder: { color: '#9A9A9A' },
                    inputIOS: { color: '#333' },
                    inputAndroid: { color: '#333' },
                }}
                Icon={null}
                onOpen={onOpenLoad}
                touchableWrapperProps={{
                    style: styles.touchable,
                    activeOpacity: 0.8,
                    hitSlop: { top: 15, bottom: 15, left: 15, right: 15 },
                }}
            />
        </View>
    );
}
/* ---------- estilos ---------- */
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

    spinner: {
        position: 'absolute',
        right: 12,
        zIndex: 10,
    },
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: { fontSize: 16, paddingVertical: 0 },
    inputAndroid: { fontSize: 16, paddingVertical: 0 },
});
