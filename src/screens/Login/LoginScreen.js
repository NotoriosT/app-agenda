// src/screens/Login/LoginScreen.jsx

import React, { useState } from 'react';
import {
    SafeAreaView,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    View,
    StyleSheet
} from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import Header from './Header';
import StepCpf from './StepCpf';
import StepPassword from './StepPassword';
import StepSms from './StepSms';
import StepNewPassword from './StepNewPassword';
import AppMessage from '../../components/AppMessage';
import api from "../../services/api";
import * as authApi from "../../services/loginApi";

export default function LoginScreen() {
    const { login, sendOtp, verifyOtp, setPasswd } = useAuth();
    const [step, setStep] = useState('cpf');
    const [form, setForm] = useState({
        cpf: '',
        senha: '',
        lembrar: false,
        codigo: '',
        confirm1: '',
        confirm2: ''
    });
    const [resetToken, setResetToken] = useState(null);
    const [msg, setMsg] = useState(null);
    const [visible, setVis] = useState(false);

    const openMsg = m => { setMsg(m); setVis(true); };
    const closeMsg = () => setVis(false);

    const errMsg = (err, fallback) => ({
        title: 'Erro',
        body: err?.response?.data?.message ?? fallback,
        type: 'error',
        actions: [{ id: 'close', label: 'Fechar' }]
    });

    // ── Handlers ────────────────────────────────────────────────────────────
    const handleContinueCpf = async () => {
        console.log('[DEBUG] baseURL ->', api.defaults.baseURL);

        try {
            const { exists, passwordSet } = await authApi.checkCpf(form.cpf);
            if (!exists) {
                return openMsg({
                    title: 'CPF não encontrado',
                    body: 'Cadastre-se primeiro.',
                    type: 'error',
                    actions: [{ id: 'close', label: 'Ok' }]
                });
            }
            setStep(passwordSet ? 'password' : 'sms');
        } catch (err) {
            openMsg(errMsg(err, 'Falha na verificação do CPF'));
        }
    };

    const handleLogin = async () => {
        try {
            await login(form.cpf, form.senha, form.lembrar);
            // redirecionamento via AuthProvider
        } catch (err) {
            openMsg(errMsg(err, 'CPF ou senha inválidos'));
        }
    };

    const handleSendOtp = async () => {
        try {
            await sendOtp(form.cpf);
            openMsg({
                title: 'Código enviado',
                body: 'Verifique seu WhatsApp.',
                type: 'success',
                actions: [{ id: 'close', label: 'Ok' }]
            });
        } catch (err) {
            openMsg(errMsg(err, 'Erro ao enviar código'));
        }
    };

    const handleVerify = async () => {
        try {
            const { resetToken } = await verifyOtp(form.cpf, form.codigo);
            setResetToken(resetToken);
            setStep('newPass');
        } catch (err) {
            openMsg(errMsg(err, 'Código inválido, tente novamente'));
        }
    };

    const handleSave = async () => {
        if (!form.confirm1 || form.confirm1 !== form.confirm2) {
            return openMsg({
                title: 'Senhas diferentes',
                body: 'Digite a mesma senha nos dois campos.',
                type: 'error',
                actions: [{ id: 'close', label: 'Fechar' }]
            });
        }
        try {
            api.defaults.headers.common.Authorization = `Bearer ${resetToken}`;
            await setPasswd(form.confirm1);
            delete api.defaults.headers.common.Authorization;

            openMsg({
                title: 'Senha definida',
                body: 'Agora você já pode fazer login.',
                type: 'success',
                actions: [{ id: 'close', label: 'Ir para login' }]
            });
            setForm({ ...form, senha: '' });
            setStep('password');
        } catch (err) {
            openMsg(errMsg(err, 'Não foi possível definir a senha'));
        }
    };

    // ── Render ───────────────────────────────────────────────────────────────
    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView
                style={styles.flex}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
            >
                <ScrollView
                    contentContainerStyle={styles.container}
                    keyboardShouldPersistTaps="handled"
                >
                    <Header />

                    <View style={styles.content}>
                        {step === 'cpf' && (
                            <StepCpf
                                cpf={form.cpf}
                                onChange={cpf => setForm({ ...form, cpf })}
                                onContinue={handleContinueCpf}
                            />
                        )}
                        {step === 'password' && (
                            <StepPassword
                                cpf={form.cpf}
                                senha={form.senha}
                                lembrar={form.lembrar}
                                onChangeSenha={senha => setForm({ ...form, senha })}
                                onToggleLembrar={() => setForm({ ...form, lembrar: !form.lembrar })}
                                onLogin={handleLogin}
                                onForgot={() => setStep('sms')}
                            />
                        )}
                        {step === 'sms' && (
                            <StepSms
                                cpf={form.cpf}
                                codigo={form.codigo}
                                onChangeCodigo={codigo => setForm({ ...form, codigo })}
                                onSendOtp={handleSendOtp}
                                onVerify={handleVerify}
                                onBack={() => setStep('password')}
                            />
                        )}
                        {step === 'newPass' && (
                            <StepNewPassword
                                confirm1={form.confirm1}
                                confirm2={form.confirm2}
                                onChangeConfirm1={confirm1 => setForm({ ...form, confirm1 })}
                                onChangeConfirm2={confirm2 => setForm({ ...form, confirm2 })}
                                onSave={handleSave}
                                onCancel={() => setStep('password')}
                            />
                        )}
                    </View>

                    <AppMessage visible={visible} message={msg} onAction={closeMsg} />
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff'
    },
    flex: { flex: 1 },
    container: {
        flexGrow: 1,
        padding: 24,
        justifyContent: 'center'
    },
    content: {
        width: '100%',
        maxWidth: 400,
        alignSelf: 'center'
    }
});
