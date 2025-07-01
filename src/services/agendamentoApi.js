// src/services/agendamentoApi.js
import {
    especialidades,
    todasUPS,
    upsEspecialidades,
} from '../mock/dadosAgendamentoMock';

/**
 * Simula a busca de todas as especialidades disponíveis.
 * @returns {Promise<Array<{id: string, nome: string}>>}
 */
export const getEspecialidades = async () => {
    console.log('Buscando todas as especialidades...');
    await new Promise((resolve) => setTimeout(resolve, 300)); // Simula delay de rede
    return especialidades;
};

/**
 * Simula a busca de UPS que atendem a uma especialidade específica.
 * @param {string} especialidadeId - O ID da especialidade.
 * @returns {Promise<Array<{id: string, nome: string}>>}
 */
export const getUpsPorEspecialidade = async (especialidadeId) => {
    console.log(`Buscando UPS para especialidade ${especialidadeId}`);
    if (!especialidadeId) return [];

    const upsIds = Object.keys(upsEspecialidades).filter((upsId) =>
        upsEspecialidades[upsId].includes(especialidadeId)
    );

    const upsFiltradas = todasUPS.filter((ups) => upsIds.includes(ups.id));

    await new Promise((resolve) => setTimeout(resolve, 400));
    return upsFiltradas;
};

/**
 * Simula a busca de horários disponíveis para uma data e UPS.
 * @param {string} upsId - O ID da UPS.
 * @param {string} dateString - A data no formato 'YYYY-MM-DD'.
 * @returns {Promise<string[]>}
 */
export const getAvailableSlots = async (upsId, dateString) => {
    console.log(`Buscando horários para UPS ${upsId} na data ${dateString}`);
    const weekDay = new Date(dateString).getDay();

    // Não retorna horários para fins de semana (Domingo = 0, Sábado = 6)
    if (weekDay === 0 || weekDay === 6) return [];

    const morningSlots = [
        '08:00',
        '08:30',
        '09:00',
        '09:30',
        '10:00',
        '10:30',
        '11:00',
    ];
    const afternoonSlots = [
        '13:30',
        '14:00',
        '14:30',
        '15:00',
        '15:30',
        '16:00',
        '16:30',
    ];

    const allSlots = [...morningSlots, ...afternoonSlots];

    // Simula que alguns horários já foram agendados (remove 30% aleatoriamente)
    const availableSlots = allSlots.filter(() => Math.random() > 0.3);

    await new Promise((resolve) => setTimeout(resolve, 500));
    return availableSlots;
};

/**
 * Simula o agendamento da consulta, criando um novo registro
 * e adicionando-o à lista de consultas mockada.
 * @param {object} appointmentDetails - Detalhes do agendamento.
 * @returns {Promise<{success: boolean, message: string}>}
 */
export const bookAppointment = async (appointmentDetails) => {
    console.log('Criando objeto de consulta:', appointmentDetails);

    const { upsId, especialidadeId, data, horario } = appointmentDetails;

    const ups = todasUPS.find((u) => u.id === upsId);
    const especialidade = especialidades.find((e) => e.id === especialidadeId);

    const [ano, mes, dia] = data.split('-').map(Number);
    const [hora, minuto] = horario.split(':').map(Number);
    const dataISO = new Date(ano, mes - 1, dia, hora, minuto).toISOString();

    const novaConsulta = {
        id: `c${Date.now()}`,
        data: dataISO,
        medico: especialidade ? especialidade.nome : 'Especialista',
        ups: ups ? ups.nome : 'UPS Desconhecida',
        status: 'PENDENTE',
    };

    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Retorna o objeto da consulta criada e a mensagem de sucesso
    return {
        success: true,
        message: 'Consulta agendada com sucesso!',
        data: novaConsulta,
    };
};
