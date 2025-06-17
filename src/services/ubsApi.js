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

/**
 * Busca as UPS Destino que aceitam a especialidade dada,
 * a partir da UPS em que o paciente está logado.
 *
 * @param {string} upsId            UPS atual (ex.: "3")
 * @param {string} especialidadeId  Especialidade selecionada (ex.: "9208")
 * @returns {Promise<UPSDTO[]>}     Ex.: [{ id:"3", name:"ESF CRUZEIRO" }, …]
 */
export async function getUpsDestino(upsId, especialidadeId) {
    const { data } = await api.get(
        `/ubs/${upsId}/${especialidadeId}/destinos`
    );
    return data;
}