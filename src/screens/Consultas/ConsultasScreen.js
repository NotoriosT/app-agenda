// src/screens/Consultas/ConsultasScreen.js
import React, { useState, useEffect } from 'react';
import {
    ScrollView,
    View,
    Modal,
    ActivityIndicator,
    TouchableOpacity,
} from 'react-native';
import { Text, Button } from 'react-native-elements';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { colors } from '../../theme/colors';
import AppMessage from '../../components/AppMessage';
import EspecialidadePicker from '../../components/EspecialidadePicker';
import UpsDestinoPicker from '../../components/UpsDestinoPicker';
import {
    getEspecialidades,
    getUpsPorEspecialidade,
    getAvailableSlots,
    bookAppointment,
} from '../../services/agendamentoApi';
import { useAuth } from '../../contexts/AuthContext'; // 1. Importar o useAuth
import styles from './styles';

// Configuração do calendário para português
LocaleConfig.locales['pt-br'] = {
    monthNames: [
        'Janeiro',
        'Fevereiro',
        'Março',
        'Abril',
        'Maio',
        'Junho',
        'Julho',
        'Agosto',
        'Setembro',
        'Outubro',
        'Novembro',
        'Dezembro',
    ],
    dayNames: [
        'Domingo',
        'Segunda',
        'Terça',
        'Quarta',
        'Quinta',
        'Sexta',
        'Sábado',
    ],
    dayNamesShort: ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB'],
    today: 'Hoje',
};
LocaleConfig.defaultLocale = 'pt-br';

export default function ConsultasScreen() {
    const { adicionarConsulta } = useAuth(); // 2. Obter a função do contexto
    const insets = useSafeAreaInsets();

    // Estados de dados
    const [especialidades, setEspecialidades] = useState([]);
    const [destinoItems, setDestinoItems] = useState([]);
    const [slots, setSlots] = useState({ loading: false, items: [] });

    // Estados do formulário
    const [selectedEspId, setSelectedEspId] = useState('');
    const [selectedUpsId, setSelectedUpsId] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedSlot, setSelectedSlot] = useState('');

    // Estados de controle da UI
    const [isLoading, setIsLoading] = useState({
        especialidades: false,
        ups: false,
    });
    const [isCalendarVisible, setCalendarVisible] = useState(false);
    const [isBooking, setIsBooking] = useState(false);
    const [message, setMessage] = useState(null);

    // Carrega as especialidades na primeira vez que a tela é aberta
    useEffect(() => {
        const fetchEspecialidades = async () => {
            setIsLoading((prev) => ({ ...prev, especialidades: true }));
            const data = await getEspecialidades();
            setEspecialidades(data);
            setIsLoading((prev) => ({ ...prev, especialidades: false }));
        };
        fetchEspecialidades();
    }, []);

    // Busca as UPS de destino sempre que uma especialidade é selecionada
    useEffect(() => {
        const fetchUps = async () => {
            if (!selectedEspId) return;
            setIsLoading((prev) => ({ ...prev, ups: true }));
            setDestinoItems([]);
            const data = await getUpsPorEspecialidade(selectedEspId);
            setDestinoItems(data);
            setIsLoading((prev) => ({ ...prev, ups: false }));
        };
        fetchUps();
    }, [selectedEspId]);

    const handleSelectEsp = (espId) => {
        setSelectedEspId(espId);
        setSelectedUpsId('');
        setSelectedDate('');
        setSelectedSlot('');
        setSlots({ loading: false, items: [] });
    };

    // Busca os horários sempre que a data ou UPS mudam
    useEffect(() => {
        const fetchSlots = async () => {
            if (!selectedUpsId || !selectedDate) return;
            setSlots({ loading: true, items: [] });
            setSelectedSlot('');
            try {
                const availableSlots = await getAvailableSlots(
                    selectedUpsId,
                    selectedDate
                );
                setSlots({ loading: false, items: availableSlots });
            } catch (error) {
                console.error('Erro ao buscar horários:', error);
                setSlots({ loading: false, items: [] });
            }
        };
        fetchSlots();
    }, [selectedDate, selectedUpsId]);

    const handleAgendar = async () => {
        setIsBooking(true);
        try {
            // 3. A API agora retorna o objeto da consulta
            const response = await bookAppointment({
                upsId: selectedUpsId,
                especialidadeId: selectedEspId,
                data: selectedDate,
                horario: selectedSlot,
            });

            if (response.success && response.data) {
                // 4. CHAMA A FUNÇÃO DO CONTEXTO para atualizar o estado global
                adicionarConsulta(response.data);

                setMessage({
                    title: 'Sucesso!',
                    body: `Sua consulta foi agendada para ${format(
                        new Date(selectedDate),
                        'dd/MM/yyyy'
                    )} às ${selectedSlot}.`,
                    type: 'success',
                });
                // Limpa o formulário após o sucesso
                setSelectedEspId('');
                setSelectedUpsId('');
                setSelectedDate('');
                setSelectedSlot('');
                setDestinoItems([]);
                setSlots({ loading: false, items: [] });
            } else {
                throw new Error(
                    response.message || 'Ocorreu um erro desconhecido.'
                );
            }
        } catch (error) {
            setMessage({
                title: 'Erro',
                body: 'Não foi possível agendar a consulta. Tente novamente.',
                type: 'error',
            });
        } finally {
            setIsBooking(false);
        }
    };

    const isFormReady =
        selectedEspId && selectedUpsId && selectedDate && selectedSlot;

    return (
        <View style={{ flex: 1, backgroundColor: colors.background }}>
            <ScrollView
                contentContainerStyle={[
                    styles.container,
                    {
                        paddingTop: insets.top + 16,
                        paddingBottom: insets.bottom + 16,
                    },
                ]}
                keyboardShouldPersistTaps="handled"
            >
                <Text style={styles.header}>Agendar Consulta</Text>

                <Text style={styles.label}>1. Selecione a especialidade</Text>
                <EspecialidadePicker
                    value={selectedEspId}
                    onChange={handleSelectEsp}
                    items={especialidades}
                    loading={isLoading.especialidades}
                />

                <Text style={styles.label}>2. Selecione a UPS de destino</Text>
                <UpsDestinoPicker
                    value={selectedUpsId}
                    onChange={setSelectedUpsId}
                    items={destinoItems}
                    enabled={!!selectedEspId && !isLoading.ups}
                    placeholder={
                        isLoading.ups
                            ? { label: 'Carregando...', value: null }
                            : {
                                  label: '-- escolha UPS destino --',
                                  value: null,
                              }
                    }
                />

                {selectedUpsId && (
                    <>
                        <Text style={styles.label}>3. Escolha a data</Text>
                        <TouchableOpacity
                            style={styles.datePickerButton}
                            onPress={() => setCalendarVisible(true)}
                        >
                            <Text style={styles.datePickerText}>
                                {selectedDate
                                    ? format(
                                          new Date(selectedDate),
                                          "EEEE, dd 'de' MMMM 'de' yyyy",
                                          { locale: ptBR }
                                      )
                                    : 'Clique para selecionar uma data'}
                            </Text>
                        </TouchableOpacity>
                    </>
                )}

                {slots.loading && (
                    <ActivityIndicator
                        style={{ marginVertical: 20 }}
                        size="large"
                        color={colors.primary}
                    />
                )}

                {!slots.loading && selectedDate && slots.items.length === 0 && (
                    <Text
                        style={{
                            textAlign: 'center',
                            marginTop: 20,
                            color: colors.textSecondary,
                        }}
                    >
                        Nenhum horário disponível para esta data.
                    </Text>
                )}

                {slots.items.length > 0 && (
                    <>
                        <Text style={styles.label}>4. Escolha o horário</Text>
                        <View style={styles.slotContainer}>
                            {slots.items.map((slot) => (
                                <TouchableOpacity
                                    key={slot}
                                    style={[
                                        styles.slotButton,
                                        selectedSlot === slot &&
                                            styles.slotButtonSelected,
                                    ]}
                                    onPress={() => setSelectedSlot(slot)}
                                >
                                    <Text
                                        style={[
                                            styles.slotText,
                                            selectedSlot === slot &&
                                                styles.slotTextSelected,
                                        ]}
                                    >
                                        {slot}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </>
                )}

                <Button
                    title="Confirmar Agendamento"
                    onPress={handleAgendar}
                    disabled={!isFormReady || isBooking}
                    loading={isBooking}
                    containerStyle={{ marginTop: 40 }}
                />
            </ScrollView>

            <Modal
                visible={isCalendarVisible}
                transparent={true}
                animationType="fade"
            >
                <View style={styles.modalContainer}>
                    <View style={styles.calendarWrapper}>
                        <Calendar
                            onDayPress={(day) => {
                                setSelectedDate(day.dateString);
                                setCalendarVisible(false);
                            }}
                            minDate={new Date().toISOString().split('T')[0]}
                            markedDates={{
                                [selectedDate]: {
                                    selected: true,
                                    selectedColor: colors.primary,
                                },
                            }}
                        />
                        <Button
                            title="Fechar"
                            type="clear"
                            onPress={() => setCalendarVisible(false)}
                        />
                    </View>
                </View>
            </Modal>

            <AppMessage
                visible={!!message}
                message={message}
                onAction={() => setMessage(null)}
            />
        </View>
    );
}
