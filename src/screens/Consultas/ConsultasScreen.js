// src/screens/Consultas/ConsultasScreen.js
import React, { useState } from 'react';
import { ScrollView, StatusBar, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '../../contexts/AuthContext';

import useLazyEspecialidades from '../../hooks/useLazyEspecialidades';
import EspecialidadePicker   from '../../components/EspecialidadePicker';
import UpsDestinoPicker      from '../../components/UpsDestinoPicker';

const flattenUbs = (raw) => {
    if (!Array.isArray(raw)) return [];
    if (Array.isArray(raw[0])) return raw.flat().filter(u => u && u.id);
    return raw.filter(u => u && u.id);
};

export default function ConsultasScreen() {
    const { municipe }    = useAuth();
    const insets          = useSafeAreaInsets();

    const [selectedEspId, setSelectedEspId] = useState('');
    const [selectedUpsId, setSelectedUpsId] = useState('');
    const [destinoItems,  setDestinoItems]  = useState([]);

    /* especialidades lazy */
    const { items: especialidades, loading, load } =
        useLazyEspecialidades(municipe?.upsId);

    const handleSelectEsp = (espId) => {
        setSelectedEspId(espId);
        setSelectedUpsId('');
        const espObj   = especialidades.find(e => e.id === espId);
        const destinos = flattenUbs(espObj?.ubsdestino);
        setDestinoItems(destinos);
    };

    return (
        <ScrollView
            contentContainerStyle={[styles.container, { paddingTop: insets.top }]}
            keyboardShouldPersistTaps="handled"
        >
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />

            <Text h4 style={styles.header}>
                {municipe?.upsLogadaNome} ({municipe?.upsId})
            </Text>

            {/* --- Especialidade --- */}
            <Text style={styles.label}>Selecione a especialidade</Text>

            <EspecialidadePicker
                value={selectedEspId}
                onChange={handleSelectEsp}
                items={especialidades}
                loading={loading}
                onOpenLoad={load}
            />

            {/* --- UPS destino --- */}
            <Text style={styles.label}>Selecione a UPS destino</Text>

            <UpsDestinoPicker
                value={selectedUpsId}
                onChange={setSelectedUpsId}
                items={destinoItems}
                enabled={destinoItems.length > 0}
            />

            {/* aqui você segue com a lista de consultas filtradas */}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flexGrow: 1, backgroundColor: '#fff', paddingHorizontal: 16 },
    header:    { marginBottom: 24, color: '#333' },
    label:     { fontSize: 16, marginBottom: 8, color: '#444', fontWeight: '500' },
});
