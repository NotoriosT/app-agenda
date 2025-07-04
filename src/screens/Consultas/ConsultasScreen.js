// Localização: src/screens/Consultas/ConsultasScreen.js

import React, { useState } from 'react';
import { View, FlatList, StatusBar, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '../../contexts/AuthContext';
import styles from './styles';
import ConsultaCard from './ConsultaCard'; // CORRIGIDO: Importando da mesma pasta
import ActionsBar from './ActionsBar';     // CORRIGIDO: Importando da mesma pasta

export default function ConsultasScreen() {
    const { consultas } = useAuth();
    const [selectedConsulta, setSelectedConsulta] = useState(null);
    const insets = useSafeAreaInsets();

    const handleSelectConsulta = (consulta) => {
        setSelectedConsulta((prev) =>
            prev?.id === consulta.id ? null : consulta
        );
    };

    return (
        <View style={styles.safeArea}>
            <StatusBar
                barStyle="dark-content"
                backgroundColor={styles.safeArea.backgroundColor}
            />
            <View style={[styles.header, { paddingTop: insets.top || 16 }]}>
                <Text style={styles.headerTitle}>Minhas Consultas</Text>
            </View>
            <View style={styles.content}>
                <FlatList
                    data={consultas}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <ConsultaCard
                            item={item}
                            onPress={() => handleSelectConsulta(item)}
                            isSelected={selectedConsulta?.id === item.id}
                        />
                    )}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingTop: 24, paddingBottom: 150 }}
                    ListEmptyComponent={
                        <Text style={styles.emptyListText}>
                            Nenhuma consulta agendada.
                        </Text>
                    }
                />
            </View>
            {selectedConsulta && <ActionsBar />}
        </View>
    );
}