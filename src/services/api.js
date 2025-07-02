// src/services/api.js
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
    baseURL: 'http://181.191.231.48:8080',
    timeout: 5000,
});

/* ——— Request ——————————————————————————————— */
api.interceptors.request.use(async (cfg) => {
    const token = await AsyncStorage.getItem('@accessToken'); // <- mesmo key do AuthContext!
    if (token) cfg.headers.Authorization = `Bearer ${token}`;

    /* DEBUG ↓↓↓ */
    console.log(
        `[HTTP] ➜ ${cfg.method.toUpperCase()} ${cfg.url}`,
        cfg.data ? '\nbody:' : '',
        cfg.data ?? ''
    );

    return cfg;
});

/* ——— Response / Error ———————————————————— */
api.interceptors.response.use(
    (res) => {
        console.log(
            `[HTTP] ⇐ ${res.status} ${res.config.url}`,
            '\ndata:',
            res.data
        );
        return res;
    },
    (err) => {
        const { response: r } = err || {};
        if (r) {
            console.log(
                `[HTTP] ⇐ ${r.status} ${r.config?.url}`,
                '\nerror:',
                r.data
            );
            if (r.status === 401) {
                // refresh / logout aqui (se quiser)
            }
        } else {
            console.log('[HTTP] ⇐ ERRO DE REDE', err.toString());
        }
        return Promise.reject(err);
    }
);

export default api;
