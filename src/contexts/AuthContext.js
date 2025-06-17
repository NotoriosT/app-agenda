import React, { createContext, useContext, useEffect, useState } from 'react';
import * as authApi from '../services/loginApi';
import api from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [loading, setLoading] = useState(true);
    const [accessToken, setAccessToken] = useState(null);
    const [refreshToken, setRefresh] = useState(null);
    const [municipe, setMunicipe] = useState(null);

    /* Auto-login: carrega tokens e usuário salvos */
    useEffect(() => {
        (async () => {
            const [[, at], [, rt], [, userJson]] = await AsyncStorage.multiGet([
                '@accessToken',
                '@refreshToken',
                '@municipe'
            ]);
            if (at) {
                setAccessToken(at);
                api.defaults.headers.common.Authorization = `Bearer ${at}`;
            }
            if (rt) setRefresh(rt);
            if (userJson) setMunicipe(JSON.parse(userJson));
            setLoading(false);
        })();
    }, []);

    /* Helpers ---------------------------------------------------------------- */
    const persistTokens = async ({ accessToken: at, refreshToken: rt }) => {
        await AsyncStorage.multiSet([
            ['@accessToken', at],
            ['@refreshToken', rt]
        ]);
        setAccessToken(at);
        setRefresh(rt);
        api.defaults.headers.common.Authorization = `Bearer ${at}`;
    };

    /* Fetch Munícipe atual */
    const fetchMe = async () => {
        try {
            const { data: user } = await api.get('/auth/me');
            setMunicipe(user);
            await AsyncStorage.setItem('@municipe', JSON.stringify(user));
        } catch (err) {
            console.error('Falha ao buscar munícipe:', err);
        }
    };

    /* Ações expostas --------------------------------------------------------- */
    const login = async (cpf, senha) => {
        await persistTokens(await authApi.login(cpf, senha));
        await fetchMe();
    };

    const logout = async () => {
        await AsyncStorage.multiRemove([
            '@accessToken',
            '@refreshToken',
            '@municipe'
        ]);
        delete api.defaults.headers.common.Authorization;
        setAccessToken(null);
        setRefresh(null);
        setMunicipe(null);
    };

    /* OTP flow --------------------------------------------------------------- */
    const sendOtp = authApi.sendOtp;
    const verifyOtp = authApi.verifyOtp;  // devolve { resetToken }
    const setPasswd = authApi.setPassword; // precisa header Bearer resetToken

    return (
        <AuthContext.Provider
            value={{
                loading,
                isAuth: !!accessToken,
                accessToken,
                refreshToken,
                municipe,
                login,
                logout,
                sendOtp,
                verifyOtp,
                setPasswd
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
