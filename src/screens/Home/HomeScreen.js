import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '../../contexts/AuthContext';
import Logo from '../../components/Logo'; // 1. Re-importar o Logo
import PreConsultaModal from './PreConsultaModal';
import styles from './styles';
import { Icon } from 'react-native-elements';
import { colors } from '../../theme/colors';

// O array homeActions permanece o mesmo, sem alterações
const homeActions = [
    {
        key: 'receitaBranca',
        title: 'Renovação de Receita Branca',
        icon: 'receipt-long',
        modal: {
            title: 'Pré-Consulta',
            question: 'Deseja renovar receitas contínuas (receitas brancas)?',
            options: ['Sim', 'Não'],
            result: {
                message: 'Será direcionado ao Pronto atendimento virtual de Esteio',
                linkText: 'Abrir Link',
                linkUrl: 'https://wa.me/558008889622'
            }
        },
    },
    {
        key: 'receitaAzul',
        title: 'Renovação de Receita Azul/Amarela',
        icon: 'receipt-long',
        modal: {
            title: 'Pré-Consulta',
            question: 'Renovação de receitas Azul ou amarela?',
            options: ['Sim', 'Não'],
            result: {
                message: 'Deverá se dirigir a uma UBS para agendamento presencial',
                linkText: 'Abrir Mapa de UBS',
                linkUrl: 'https://www.google.com/maps/search/?api=1&query=UBS+em+Esteio+RS'
            }
        },
    },
    {
        key: 'queixas',
        title: 'Queixas do Dia (Leve/Moderada)',
        icon: 'sick',
        modal: {
            title: 'Pré-Consulta',
            question: 'Queixas do dia de gravidade leve e moderada?',
            options: ['Sim', 'Não'],
            result: {
                message: 'Será encaminhado para atendimento do Pronto atendimento virtual de Esteio',
                linkText: 'Abrir Link',
                linkUrl: 'https://wa.me/558008889622'
            }
        },
    },
    {
        key: 'gravidez',
        title: 'Suspeita de Gravidez',
        icon: 'pregnant-woman',
        modal: {
            title: 'Pré-Consulta',
            question: 'Suspeita de Gravidez?',
            options: ['Sim', 'Não'],
            result: {
                message: 'Em caso de suspeita de gravidez, procure a sua UBS de referência para realizar o teste e iniciar o pré-natal.',
                linkText: 'Encontrar minha UBS',
                linkUrl: 'https://www.esteio.rs.gov.br/saude'
            }
        },
    },
    {
        key: 'agendamento',
        title: 'Agendamento de Consulta',
        icon: 'event',
        modal: {
            title: 'Pré-Consulta',
            question: 'Agendamento de consulta médica?',
            options: ['Sim', 'Não'],
            result: {
                message: 'As agendas serão liberadas a partir de 07/08/2025',
                linkText: 'Abrir Link',
                linkUrl: 'https://www.esteio.rs.gov.br/saude'
            }
        },
    },
    {
        key: 'duvidas',
        title: 'Demais Queixas e Dúvidas',
        icon: 'help-outline',
        modal: {
            title: 'Pré-Consulta',
            question: 'Demais queixas e dúvidas?',
            options: ['Sim', 'Não'],
            result: {
                message: 'Para demais queixas e dúvidas, o munícipe deve se dirigir a sua UBS de referência.',
                linkText: 'Encontrar minha UBS',
                linkUrl: 'https://www.esteio.rs.gov.br/saude'
            }
        },
    },
];

export default function HomeScreen() {
    const { municipe } = useAuth();
    const nome = municipe?.nome?.split(' ')[0] || 'Munícipe';
    const insets = useSafeAreaInsets();
    const [activeModalData, setActiveModalData] = useState(null);

    return (
        <View style={styles.safeArea}>
            {/* 2. Cabeçalho com Logo e Texto */}
            <View style={[styles.header, { paddingTop: insets.top || 16 }]}>
                <Logo width={55} height={55} />
                <Text style={styles.headerTitle}>Olá, {nome}</Text>
            </View>

            <View style={styles.content}>
                <Text style={styles.sectionTitle}>Como podemos te ajudar?</Text>
                <View style={styles.actionsGrid}>
                    {homeActions.map((action) => (
                        <TouchableOpacity
                            key={action.key}
                            style={styles.actionCard}
                            onPress={() => setActiveModalData(action)}
                        >
                            <Icon name={action.icon} type="material" size={32} color={colors.primary} />
                            <Text style={styles.actionCardTitle}>{action.title}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
            
            <PreConsultaModal
                modalData={activeModalData}
                onClose={() => setActiveModalData(null)}
            />
        </View>
    );
}