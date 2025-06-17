import { useCallback, useState } from 'react';
import { getUpsDestino } from '../services/ubsApi';

/**
 * Lazy-load das UPS destino: só busca quando `load(especialidadeId)` é chamado.
 */
export default function useLazyUpsDestino(upsPacienteId) {
    const [items,   setItems]   = useState([]);
    const [loading, setLoading] = useState(false);

    const load = useCallback(async (especialidadeId) => {
        if (!upsPacienteId || !especialidadeId || loading) return;
        try {
            setLoading(true);
            const data = await getUpsDestino(upsPacienteId, especialidadeId);
            setItems(data);
        } catch (err) {
            console.error('Erro ao carregar UPS destino:', err);
        } finally {
            setLoading(false);
        }
    }, [upsPacienteId, loading]);

    return { items, loading, load };
}
