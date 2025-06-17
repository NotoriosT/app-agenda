// src/hooks/useEspecialidades.js
import { useCallback, useEffect, useState } from 'react';
import { getEspecialidadesByUbs } from '../services/ubsApi';

export default function useEspecialidades(upsId) {
    const [especialidades, setEspecialidades] = useState([]);
    const [loading, setLoading] = useState(true);   // ⬅️ novo
    const [refreshing, setRefreshing] = useState(false);

    const fetchEspecialidades = useCallback(async () => {
        if (!upsId) return;
        try {
            setLoading(true);                           // ⬅️ novo
            const data = await getEspecialidadesByUbs(upsId);
            setEspecialidades(data);
        } catch (err) {
            console.error('Erro ao carregar especialidades:', err);
        } finally {
            setLoading(false);                          // ⬅️ novo
        }
    }, [upsId]);

    useEffect(() => {
        fetchEspecialidades();
    }, [fetchEspecialidades]);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        fetchEspecialidades().finally(() => setRefreshing(false));
    }, [fetchEspecialidades]);

    return { especialidades, loading, refreshing, onRefresh };
}
