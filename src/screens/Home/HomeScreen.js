// src/screens/Home/HomeScreen.js
import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Text, Card, Badge }         from 'react-native-elements';
import { format }  from 'date-fns';
import ptBR        from 'date-fns/locale/pt-BR';
import Icon        from 'react-native-vector-icons/MaterialIcons';

import { useAuth } from '../../contexts/AuthContext';
import parseJwt    from '../../utils/parseJwt';      // <-- NOVO

/* ---- MOCK – consultas futuras ------------------------------------ */
const consultas = [
    { id: 'c1', data: '2025-06-12 14:00', especialidade: 'Ginecologia'  , status: 'PENDENTE'  },
    { id: 'c2', data: '2025-06-18 09:30', especialidade: 'Oftalmologia' , status: 'CONFIRMADA'},
    { id: 'c3', data: '2025-06-20 11:15', especialidade: 'Clínico Geral', status: 'CANCELADA' },
];

/* cor para o badge -------------------------------------------------- */
const corStatus = s => ({
    PENDENTE  : '#F57C00',
    CONFIRMADA: '#2E7D32',
    CANCELADA : '#D32F2F',
}[s] ?? '#607D8B');

export default function HomeScreen() {
    const { accessToken } = useAuth();
    const { sub: cpf = '---', nome = 'Munícipe' } = parseJwt(accessToken);

    const hoje = format(new Date(), "EEEE, d 'de' MMMM yyyy", { locale: ptBR });

    return (
        <View style={styles.container}>
            <Text h4 style={styles.date}>{hoje}</Text>
            <Text h3 style={styles.welcome}>Olá, {nome.split(' ')[0]}!</Text>

            {/* Próximas consultas ---------------------------------------- */}
            <Text style={styles.section}>Próximas consultas</Text>

            <FlatList
                data={consultas}
                keyExtractor={i => i.id}
                renderItem={({ item }) => (
                    <Card containerStyle={styles.card}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Icon name="event" size={20} color="#009688" />
                            <Text style={styles.cardText}>
                                {format(new Date(item.data), 'dd/MM HH:mm')} – {item.especialidade}
                            </Text>
                            <Badge
                                value={item.status}
                                badgeStyle={{ backgroundColor: corStatus(item.status) }}
                                textStyle={{ fontSize: 11 }}
                            />
                        </View>
                    </Card>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: '#FAFAFA' },
    date     : { color: '#555', marginBottom: 4 },
    welcome  : { marginBottom: 16, color: '#009688' },
    section  : { fontWeight: '700', marginBottom: 8, color: '#424242' },
    card     : { paddingVertical: 12, paddingHorizontal: 16, borderRadius: 12 },
    cardText : { flex: 1, marginLeft: 8, fontSize: 15 },
});
