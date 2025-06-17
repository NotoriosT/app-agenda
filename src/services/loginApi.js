// src/services/loginApi.js
import api from './api';

/* ------------------------------------------------------------------ */
/*  helper: mantém apenas 0-9                                          */
/* ------------------------------------------------------------------ */
const digits = v => (v ?? '').replace(/\D/g, '');   // “198.200.507-66” → “19820050766”

/* ------------------------------------------------------------------ */
/*  endpoints                                                         */
/* ------------------------------------------------------------------ */

/** Verifica se o CPF existe e se já possui senha cadastrada. */
export async function checkCpf(cpf) {
    const { data } = await api.get(`/auth/check-cpf/${digits(cpf)}`);
    return data;      // { exists: boolean, passwordSet: boolean }
}

/** Dispara OTP (WhatsApp) ─ se já tem senha o back devolve 409. */
export async function sendOtp(cpf) {
    await api.post('/auth/send-otp', { cpf: digits(cpf) });
}

/** Faz login tradicional. */
export async function login(cpf, senha) {
    const { data } = await api.post('/auth/login', {
        cpf: digits(cpf),
        senha
    });
    return data;      // { accessToken, refreshToken }
}

/** Valida código OTP e recebe resetToken. */
export async function verifyOtp(cpf, code) {
    const { data } = await api.post('/auth/verify-otp', {
        cpf : digits(cpf),
        code: digits(code)
    });
    return data;      // { resetToken }
}

/** Define nova senha (Authorization: Bearer <resetToken> já deve estar no header). */
export async function setPassword(senha) {
    await api.post('/auth/set-password', { senha });
}

/** Renova access-token. */
export async function refreshToken(refreshToken) {
    const { data } = await api.post('/auth/refresh', { refreshToken });
    return data;      // { accessToken }
}

/** Busca os dados do munícipe logado (com base no token JWT). */
export async function getMe() {
    const { data } = await api.get('/auth/me');
    return data;      // Municipe completo
}
