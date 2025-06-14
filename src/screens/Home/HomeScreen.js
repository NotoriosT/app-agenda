// src/screens/Home/HomeScreen.js

import React, { useState } from 'react';
import { View, FlatList, StatusBar } from 'react-native';
import { Text } from 'react-native-elements';
import { useSafeAreaInsets } from 'react-native-safe-area-context'; // 1. Importar o hook

import { useAuth } from '../../contexts/AuthContext';
import parseJwt from '../../utils/parseJwt';
import Logo from '../../components/Logo';
import styles from './styles';
import ConsultaCard from './ConsultaCard';
import ActionsBar from './ActionsBar';

const consultas = [ // Dados de exemplo
    { id: 'c1', data: '2025-12-10T14:30:00', medico: 'Dr. Bruno Lima', ubs: 'UBS Central', status: 'PENDENTE' },
    { id: 'c2', data: '2025-12-12T09:45:00', medico: 'Dra. Laura Souza', ubs: 'UBS Central', status: 'PENDENTE' },
    { id: 'c3', data: '2025-11-23T11:00:00', medico: 'Dr. Carlos Moura', ubs: 'UBS Central', status: 'CONFIRMADA' },
    { id: 'c4', data: '2025-11-04T08:00:00', medico: 'Dra. Paula Costa', ubs: 'UBS Barroca', status: 'CONFIRMADA' },
];

export default function HomeScreen() {
    const { accessToken } = useAuth();
    const { nome = 'Munícipe' } = parseJwt(accessToken);
    const [selectedConsulta, setSelectedConsulta] = useState(null);
    const insets = useSafeAreaInsets(); // 2. Obter os valores da área segura

    const handleSelectConsulta = (consulta) => {
        setSelectedConsulta(prev => (prev?.id === consulta.id ? null : consulta));
    };

    return (
        <View style={styles.safeArea}>
            <StatusBar barStyle="light-content" backgroundColor={styles.safeArea.backgroundColor} />
            
            {/* 3. Aplicar a margem superior dinamicamente ao cabeçalho */}
            <View style={[styles.header, { paddingTop: insets.top || 16 }]}>
                <Logo width={40} height={40} />
                <Text style={styles.headerTitle}>Olá, {nome.split(' ')[0]}</Text>
            </View>

            <View style={styles.content}>
                <Text style={styles.sectionTitle}>Consultas</Text>
                <FlatList
                    data={consultas}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <ConsultaCard
                            item={item}
                            onPress={() => handleSelectConsulta(item)}
                            isSelected={selectedConsulta?.id === item.id}
                        />
                    )}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 150 }}
                />
            </View>

            {selectedConsulta && <ActionsBar />}
        </View>
    );
}
