import api from './api';

/**
 * Busca as especialidades da UBS informada.
 * GET /ubs/{ubsId}/especialidades/list
 * @param {string} ubsId
 * @returns {Promise<EspecialidadeDTO[]>}
 */
export async function getEspecialidadesByUbs(ubsId) {
    const { data } = await api.get(`/ubs/${ubsId}/especialidades/list`);
    return data;
}
