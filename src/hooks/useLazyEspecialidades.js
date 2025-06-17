import { useCallback, useState } from 'react';
import { getEspecialidadesByUbs } from '../services/ubsApi';

/**
 * Busca apenas quando `load()` é chamado.
 */
export default function useLazyEspecialidades(upsId) {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);

    const load = useCallback(async () => {
        if (!upsId || loading || items.length) return; // já tem dados ou já buscando
        try {
            setLoading(true);
            const data = await getEspecialidadesByUbs(upsId);
            setItems(data);
        } catch (err) {
            console.error('Erro ao carregar especialidades:', err);
        } finally {
            setLoading(false);
        }
    }, [upsId, loading, items.length]);

    return { items, loading, load };
}
