// src/mock/dadosAgendamentoMock.js

export const especialidades = [
    { id: '1', nome: 'Clínico Geral' },
    { id: '2', nome: 'Pediatria' },
    { id: '3', nome: 'Ginecologia' },
    { id: '4', nome: 'Odontologia' },
    { id: '5', nome: 'Enfermagem (Acolhimento)' },
];

export const todasUPS = [
    { id: '3', nome: 'ESF CRUZEIRO' },
    { id: '4', nome: 'ESF DR. PEDRO ERNESTO' },
    { id: '9', nome: 'UBS NICKOLLAS GOMES-CENTRO' },
    { id: '6', nome: 'ESF PLANALTO' },
    { id: '12', nome: 'ESF PREFEITO JUAN PIO GERMANO' },
    { id: '11', nome: 'ESF VEREADOR PAULO DOS SANTOS' },
    { id: '1', nome: 'UBS DR. LUIZ F. P. CACHOEIRA' },
    { id: '2', nome: 'UBS FATIMA GORETE' },
    { id: '14', nome: 'UBS JOSE MARIO DE CARVALHO' },
    { id: '7', nome: 'UBS PAULO JUSTINIANO' },
    { id: '18', nome: 'UBS VOTORANTIM' },
    { id: '84', nome: 'ESF PADRE ANDRE CARBONERA' },
    { id: '13', nome: 'ESF PARQUE DO SABIA' },
];

// Mapeia quais especialidades (pelo id) estão disponíveis em cada UPS (pelo id)
export const upsEspecialidades = {
    '3': ['1', '2', '5'], // ESF Cruzeiro: Clínico, Pediatria, Enfermagem
    '4': ['1', '2', '5'], // ESF Dr. Pedro Ernesto: Clínico, Pediatria, Enfermagem
    '9': ['1', '3', '5'], // UBS Centro: Clínico, Ginecologia, Enfermagem
    '6': ['1', '4', '5'], // ESF Planalto: Clínico, Odontologia, Enfermagem
    '12': ['1', '5'],     // ESF Ezequiel: Clínico, Enfermagem
    '11': ['1', '2', '3', '5'], // ESF Novo Esteio: Todas menos Odonto
    '1': ['1', '5'],      // UBS Esperança: Clínico, Enfermagem
    '2': ['1', '3', '5'], // UBS Pedreira: Clínico, Ginecologia, Enfermagem
    '14': ['1', '2', '3', '4', '5'], // UBS Tamandaré: Todas
    '7': ['1', '3', '5'],  // UBS Claret: Clínico, Ginecologia, Enfermagem
    '18': ['1', '4', '5'], // UBS Votorantim: Clínico, Odontologia, Enfermagem
    '84': ['1', '5'],     // ESF Galvany Guedes: Clínico, Enfermagem
    '13': ['1', '2', '5'], // ESF Parque do Sabiá: Clínico, Pediatria, Enfermagem
};