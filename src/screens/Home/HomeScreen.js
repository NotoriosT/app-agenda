// src/screens/Home/HomeScreen.js

import React, { useState } from 'react';
import { View, FlatList, StatusBar, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
// O useFocusEffect não é mais necessário aqui
import { useAuth } from '../../contexts/AuthContext';
import Logo from '../../components/Logo';
import styles from './styles';
import ConsultaCard from './ConsultaCard';
import ActionsBar from './ActionsBar';
// A importação direta do mock também não é mais necessária

export default function HomeScreen() {
    // 1. Obtenha a lista de 'consultas' diretamente do contexto
    const { municipe, consultas } = useAuth();
    const nome = municipe?.nome?.split(' ')[0] || 'Munícipe';

    // 2. O estado local 'listaConsultas' foi removido.
    const [selectedConsulta, setSelectedConsulta] = useState(null);
    const insets = useSafeAreaInsets();

    // 3. O useFocusEffect foi completamente removido. O contexto já cuida da atualização.

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
                <Logo width={55} height={55} />
                <Text style={styles.headerTitle}>Olá, {nome}</Text>
            </View>

            <View style={styles.content}>
                <Text style={styles.sectionTitle}>Minhas Consultas</Text>
                <FlatList
                    // 4. A FlatList consome os dados diretamente das 'consultas' do contexto.
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
                    contentContainerStyle={{ paddingBottom: 150 }}
                    ListEmptyComponent={
                        <Text
                            style={{
                                textAlign: 'center',
                                marginTop: 20,
                                color: styles.sectionTitle.color,
                            }}
                        >
                            Nenhuma consulta agendada.
                        </Text>
                    }
                />
            </View>

            {selectedConsulta && <ActionsBar />}
        </View>
    );
}
