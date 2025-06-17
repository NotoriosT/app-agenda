// src/screens/Consultas/ConsultasScreen.js
import React, { useEffect, useState, useCallback } from 'react';
import {
    View,
    StatusBar,
    StyleSheet,
    ScrollView,
    RefreshControl,
    Platform,
} from 'react-native';
import { Text } from 'react-native-elements';
import { Picker } from '@react-native-picker/picker';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '../../contexts/AuthContext';
import { getEspecialidadesByUbs } from '../../services/ubsApi';

export default function ConsultasScreen() {
    const { municipe } = useAuth();
    const insets = useSafeAreaInsets();

    const [especialidades, setEspecialidades] = useState([]);
    const [selectedEsp, setSelectedEsp] = useState('');
    const [refreshing, setRefreshing] = useState(false);

    /* -------------------- carrega especialidades -------------------- */
    const fetchEspecialidades = useCallback(async () => {
        if (!municipe?.upsId) return;
        try {
            const data = await getEspecialidadesByUbs(municipe.upsId);
            setEspecialidades(data);
        } catch (err) {
            console.error('Erro ao carregar especialidades:', err);
        }
    }, [municipe?.upsId]);

    useEffect(() => {
        fetchEspecialidades();
    }, [fetchEspecialidades]);

    /* -------------------- pull-to-refresh --------------------------- */
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        fetchEspecialidades().finally(() => setRefreshing(false));
    }, [fetchEspecialidades]);

    /* -------------------- UI --------------------------------------- */
    return (
        <ScrollView
            contentContainerStyle={[styles.container, { paddingTop: insets.top }]}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            keyboardShouldPersistTaps="handled"
        >
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />

            <Text h4 style={styles.header}>
                {municipe?.upsLogadaNome} ({municipe?.upsId})
            </Text>

            <Text style={styles.label}>Selecione a especialidade</Text>

            {/* ---------- Picker ---------- */}
            <View
                style={
                    Platform.OS === 'android'
                        ? styles.pickerWrapper        // campo fechado
                        : styles.pickerWrapperIOS     // só borda no iOS
                }
            >
                <Picker
                    selectedValue={selectedEsp}
                    onValueChange={setSelectedEsp}
                    style={Platform.OS === 'android' ? styles.picker : styles.pickerIOS}
                    itemStyle={styles.itemStyle}
                    dropdownIconColor="#007AFF"
                    mode={Platform.OS === 'android' ? 'dropdown' : 'dialog'}
                    iosVariant="dialog"            // abre modal nativo no iOS
                >
                    <Picker.Item label="-- escolha --" value="" />
                    {especialidades.map(esp => (
                        <Picker.Item key={esp.id} label={esp.name} value={esp.id} />
                    ))}
                </Picker>
            </View>

            {/* aqui você pode renderizar a lista de consultas filtrada por `selectedEsp` */}
        </ScrollView>
    );
}

/* -------------------- estilos ------------------------------------ */
const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 16,
    },
    header: {
        marginBottom: 24,
        color: '#333',
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
        color: '#444',
        fontWeight: '500',
    },

    /* Android: campo fechado com altura fixa */
    pickerWrapper: {
        borderWidth: 1,
        borderColor: '#D1D1D6',
        borderRadius: 8,
        overflow: 'hidden',
        height: 48,
        justifyContent: 'center',
        marginBottom: 24,
    },
    picker: {
        flex: 1,
        paddingHorizontal: 12,
        color: '#333',
    },

    /* iOS: borda, sem limitar altura (modal) */
    pickerWrapperIOS: {
        borderWidth: 1,
        borderColor: '#D1D1D6',
        borderRadius: 8,
        marginBottom: 24,
    },
    pickerIOS: {
        width: '100%',
        minHeight: 180, // só faz efeito se optar por wheel inline
    },

    itemStyle: {
        fontSize: 16,
    },
});
