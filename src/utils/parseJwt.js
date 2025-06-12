// src/utils/parseJwt.js
import { decode as b64decode } from 'base-64';

/**
 * Decodifica com segurança o payload de um JWT.
 * Retorna um objeto vazio se o token estiver ausente ou mal-formado.
 * @param {string|undefined|null} token
 * @returns {object}
 */
export default function parseJwt(token) {
    if (!token || typeof token !== 'string' || token.split('.').length !== 3) {
        return {};
    }

    try {
        const [, payload] = token.split('.');
        // O payload pode não estar padded; corrige antes de decodificar
        const pad = '='.repeat((4 - (payload.length % 4)) % 4);
        const json = b64decode(payload + pad);

        return JSON.parse(json);
    } catch (err) {
        console.warn('[JWT] Falha ao decodificar:', err.message);
        return {};
    }
}
