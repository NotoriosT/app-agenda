import React, { createContext, useContext, useEffect, useState } from 'react';
import * as authApi         from '../services/loginApi';
import AsyncStorage         from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [loading, setLoading]         = useState(true);
    const [accessToken, setAccessToken] = useState(null);
    const [refreshToken, setRefresh]    = useState(null);

    /* Carrega tokens salvos (auto-login) */
    useEffect(() => {
        (async () => {
            const [at, rt] = await AsyncStorage.multiGet(['@accessToken', '@refreshToken']);
            setAccessToken(at[1]); setRefresh(rt[1]); setLoading(false);
        })();
    }, []);

    /* Helpers ---------------------------------------------------------------- */
    const persistTokens = async ({ accessToken: at, refreshToken: rt }) => {
        await AsyncStorage.multiSet([
            ['@accessToken',  at],
            ['@refreshToken', rt]
        ]);
        setAccessToken(at); setRefresh(rt);
    };

    /* Ações expostas --------------------------------------------------------- */
    const login   = async (cpf, senha)      => persistTokens(await authApi.login(cpf, senha));
    const logout  = async () => {
        await AsyncStorage.multiRemove(['@accessToken', '@refreshToken']);
        setAccessToken(null); setRefresh(null);
    };

    /* OTP flow (sem armazenar token de reset) */
    const sendOtp    = authApi.sendOtp;
    const verifyOtp  = authApi.verifyOtp;      // devolve { resetToken }
    const setPasswd  = authApi.setPassword;    // precisa set header Bearer resetToken antes de chamar

    return (
        <AuthContext.Provider
            value={{
                loading,
                isAuth:  !!accessToken,
                login,
                logout,
                sendOtp,
                verifyOtp,
                setPasswd,
                accessToken,
                refreshToken
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
