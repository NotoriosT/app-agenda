// src/screens/Login/LoginScreen.jsx

import React, { useState } from 'react';
import {
    Keyboard,
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

// Importe todos os seus componentes e hooks
import Header from './Header';
import StepCpf from './StepCpf';
import StepPassword from './StepPassword';
import StepSms from './StepSms';
import StepNewPassword from './StepNewPassword';
import AppMessage from '../../components/AppMessage';
import { useAuth } from '../../contexts/AuthContext';
import * as authApi from '../../services/loginApi';
import api from '../../services/api';
import styles from './styles';

export default function LoginScreen() {
    // Seus hooks e estados (sem alterações)
    const { login, sendOtp, verifyOtp, setPasswd } = useAuth();
    const [cpf, setCpf] = useState('');
    const [senha, setSenha] = useState('');
    const [lembrar, setLembrar] = useState(false);
    const [codigo, setCodigo] = useState('');
    const [confirm1, setConfirm1] = useState('');
    const [confirm2, setConfirm2] = useState('');
    const [step, setStep] = useState('cpf');
    const [resetToken, setResetToken] = useState(null);
    const [msg, setMsg] = useState(null);
    const [visible, setVis] = useState(false);
    
    // Funções de lógica
    const openMsg = (m) => { setMsg(m); setVis(true); };
    const closeMsg = () => setVis(false);

    /**
     * CORREÇÃO APLICADA AQUI
     * A função de erro agora define o botão como 'outline'.
     */
    const errMsg = (err, fallback = 'Erro inesperado') => ({
        title: 'Erro',
        body: err?.response?.data?.message ?? fallback,
        type: 'error',
        actions: [{ id: 'close', label: 'Fechar', type: 'outline' }],
    });
    
    const handleContinueCpf = async () => { try { const { exists, passwordSet } = await authApi.checkCpf(cpf); if (!exists) { return openMsg({ title: 'CPF não encontrado', body: 'Este CPF não está cadastrado.', type: 'error', actions: [{ id: 'close', label: 'Ok', type: 'outline' }] }); } if (passwordSet) { setStep('password'); } else { await handleSendOtp(true); setStep('sms'); } } catch (err) { openMsg(errMsg(err, 'Falha na verificação do CPF')); } };
    const handleSendOtp = async (isInitialFlow = false) => { try { await sendOtp(cpf); if (!isInitialFlow) { openMsg({ title: 'Código enviado', body: 'Verifique seu WhatsApp.', type: 'success', actions: [{ id: 'close', label: 'Ok', type: 'outline' }] }); } } catch (err) { openMsg(errMsg(err, 'Erro ao enviar código')); } };
    const handleLogin = async () => { try { await login(cpf, senha); } catch (err) { openMsg(errMsg(err, 'CPF ou senha inválidos')); } };
    const handleVerifySms = async () => { try { const { resetToken } = await verifyOtp(cpf, codigo); setResetToken(resetToken); setStep('newPass'); } catch (err) { openMsg(errMsg(err, 'Código inválido, tente novamente')); } };

    /**
     * CORREÇÃO APLICADA AQUI
     * A mensagem de sucesso agora define o botão principal como 'solid'.
     */
    const handleSetPassword = async () => {
        if (!confirm1 || confirm1 !== confirm2) {
            return openMsg({ title: 'Senhas diferentes', body: 'Digite a mesma senha nos dois campos.', type: 'error', actions: [{ id: 'close', label: 'Fechar', type: 'outline' }] });
        }
        try {
            api.defaults.headers.common.Authorization = `Bearer ${resetToken}`;
            await setPasswd(confirm1);
            delete api.defaults.headers.common.Authorization;
            setSenha('');
            openMsg({
                title: 'Senha definida',
                body: 'Agora você já pode fazer login.',
                type: 'success',
                actions: [
                    {
                        id: 'goToLogin',
                        label: 'Ir para login',
                        action: () => { setStep('password'); closeMsg(); },
                        type: 'solid', // Define como botão primário
                    },
                ],
            });
        } catch (err) {
            openMsg(errMsg(err, 'Não foi possível definir a senha'));
        }
    };
    
    const cancelNewPass = () => { setConfirm1(''); setConfirm2(''); setCodigo(''); setStep('cpf'); };
    const backToCpf = () => { setCodigo(''); setStep('cpf'); };
    const handleMessageAction = (actionId) => { const action = msg?.actions?.find(a => a.id === actionId); if (action && typeof action.action === 'function') { action.action(); } else { closeMsg(); } };


    return (
        <KeyboardAvoidingView
            style={styles.avoiding}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView
                    contentContainerStyle={styles.container}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    <Header />

                    <Animated.View entering={FadeIn} exiting={FadeOut} style={styles.content}>
                        {step === 'cpf' && (
                            <StepCpf cpf={cpf} setCpf={setCpf} onContinue={handleContinueCpf} />
                        )}
                        {step === 'password' && (
                            <StepPassword cpf={cpf} senha={senha} setSenha={setSenha} lembrar={lembrar} setLembrar={setLembrar} onLogin={handleLogin} onForgot={() => setStep('sms')} />
                        )}
                        {step === 'sms' && (
                            <StepSms cpf={cpf} codigo={codigo} setCodigo={setCodigo} onSendOtp={handleSendOtp} onVerify={handleVerifySms} onBack={backToCpf} />
                        )}
                        {step === 'newPass' && (
                            <StepNewPassword confirm1={confirm1} setConfirm1={setConfirm1} confirm2={confirm2} setConfirm2={setConfirm2} onSave={handleSetPassword} onCancel={cancelNewPass} />
                        )}
                    </Animated.View>
                </ScrollView>
            </TouchableWithoutFeedback>

            <AppMessage
                visible={visible}
                message={msg}
                onAction={handleMessageAction}
            />
        </KeyboardAvoidingView>
    );
}
