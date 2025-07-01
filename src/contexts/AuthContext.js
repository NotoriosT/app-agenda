// src/contexts/AuthContext.js

import React, { createContext, useContext, useEffect, useState } from 'react';
import * as authApi from '../services/loginApi';
import api from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { consultas as consultasIniciais } from '../mock/consultasMock'; // 1. Importa os dados iniciais do mock

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [loading, setLoading] = useState(true);
    const [accessToken, setAccessToken] = useState(null);
    const [refreshToken, setRefresh] = useState(null);
    const [municipe, setMunicipe] = useState(null);

    // 2. ADICIONA O ESTADO DAS CONSULTAS AQUI
    const [consultas, setConsultas] = useState(consultasIniciais);

    /* Auto-login */
    useEffect(() => {
        (async () => {
            const loadAppData = async () => {
                const [[, at], [, rt], [, userJson]] =
                    await AsyncStorage.multiGet([
                        '@accessToken',
                        '@refreshToken',
                        '@municipe',
                    ]);
                if (at) {
                    setAccessToken(at);
                    api.defaults.headers.common.Authorization = `Bearer ${at}`;
                }
                if (rt) setRefresh(rt);
                if (userJson) setMunicipe(JSON.parse(userJson));
            };

            const minimumTime = new Promise((resolve) =>
                setTimeout(resolve, 2000)
            );
            await Promise.all([loadAppData(), minimumTime]);
            setLoading(false);
        })();
    }, []);

    /* Helpers e Ações */
    const persistTokens = async ({ accessToken: at, refreshToken: rt }) => {
        /* ... código existente ... */
    };
    const fetchMe = async () => {
        /* ... código existente ... */
    };
    const login = async (cpf, senha) => {
        /* ... código existente ... */
    };
    const logout = async () => {
        /* ... código existente ... */
    };
    const sendOtp = authApi.sendOtp;
    const verifyOtp = authApi.verifyOtp;
    const setPasswd = authApi.setPassword;

    // 3. CRIA A FUNÇÃO PARA ADICIONAR UMA NOVA CONSULTA
    const adicionarConsulta = (novaConsulta) => {
        // Adiciona a nova consulta no topo da lista
        setConsultas((listaAtual) => [novaConsulta, ...listaAtual]);
    };

    return (
        <AuthContext.Provider
            value={{
                loading,
                isAuth: !!accessToken,
                accessToken,
                refreshToken,
                municipe,
                consultas, // 4. EXPORTA A LISTA DE CONSULTAS
                adicionarConsulta, // 5. EXPORTA A FUNÇÃO
                login,
                logout,
                sendOtp,
                verifyOtp,
                setPasswd,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
