// src/screens/Consultas/ConsultasScreen.js
import React, { useState, useCallback } from 'react';
import {
    View,
    ActivityIndicator,
    StyleSheet,
    ScrollView,
    Modal,
    TouchableOpacity,
    Linking,
} from 'react-native';
import { Text, Button, ListItem, Icon } from 'react-native-elements';
import { useFocusEffect } from '@react-navigation/native';

import { getPerguntasPreConsulta } from '../../services/agendamentoApi';
import { colors } from '../../theme/colors';

export default function ConsultasScreen() {
    const [loading, setLoading] = useState(false);
    const [perguntas, setPerguntas] = useState([]);
    const [index, setIndex] = useState(0);
    const [step, setStep] = useState('QUESTION');       // 'QUESTION' | 'INSTRUCT' | 'SCHEDULE'
    const [error, setError] = useState('');
    const [instruction, setInstruction] = useState(null);

    useFocusEffect(
        useCallback(() => {
            let active = true;
            const fetchAll = async () => {
                setLoading(true);
                setError('');
                setInstruction(null);
                setStep('QUESTION');
                setPerguntas([]);
                setIndex(0);
                try {
                    const data = await getPerguntasPreConsulta();
                    if (!active) return;
                    if (data?.length) setPerguntas(data);
                    else setStep('SCHEDULE');
                } catch {
                    if (!active) return;
                    setError('Não foi possível carregar as perguntas. Tente novamente.');
                } finally {
                    if (active) setLoading(false);
                }
            };
            fetchAll();
            return () => { active = false; };
        }, [])
    );

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color={colors.primary} />
            </View>
        );
    }
    if (error) {
        return (
            <View style={styles.center}>
                <Text style={styles.errorText}>{error}</Text>
                <Button
                    title="Tentar Novamente"
                    onPress={() => setStep('QUESTION')}
                    buttonStyle={styles.retryButton}
                    titleStyle={styles.retryTitle}
                />
            </View>
        );
    }

    // placeholder do agendamento em background
    const schedulingUI = (
        <View style={styles.center}>
            <Text style={styles.header}>Agendar Consulta</Text>
            <Text style={styles.infoText}>
                Aqui você verá o formulário de agendamento.
            </Text>
        </View>
    );

    return (
        <View style={styles.flex}>
            {schedulingUI}

            {/* Pergunta Modal */}
            <Modal visible={step === 'QUESTION'} transparent animationType="fade">
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        {/* close button */}
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => setStep('SCHEDULE')}
                        >
                            <Icon name="close" size={24} />
                        </TouchableOpacity>

                        {perguntas.length > 0 && (
                            <>
                                <Text style={styles.header}>
                                    {perguntas[index].tipoConsulta === 'PRE_CONSULTA'
                                        ? 'Pré-Consulta'
                                        : 'Pós-Consulta'}
                                </Text>
                                <ScrollView contentContainerStyle={styles.questionScroll}>
                                    <Text style={styles.question}>
                                        {perguntas[index].texto}
                                    </Text>
                                    <Text style={styles.instruction}>Selecione uma opção:</Text>
                                    {perguntas[index].respostas.map((r, i) => (
                                        <Button
                                            key={`resp-${index}-${i}`}
                                            title={r.titulo}
                                            onPress={() => {
                                                setInstruction(r);
                                                setStep('INSTRUCT');
                                            }}
                                            buttonStyle={styles.responseButton}
                                            titleStyle={styles.responseTitle}
                                            containerStyle={styles.responseContainer}
                                        />
                                    ))}
                                </ScrollView>
                            </>
                        )}
                    </View>
                </View>
            </Modal>

            {/* Instrução Modal */}
            <Modal
                visible={step === 'INSTRUCT' && !!instruction}
                transparent
                animationType="fade"
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        {/* close button */}
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => setStep('SCHEDULE')}
                        >
                            <Icon name="close" size={24} />
                        </TouchableOpacity>

                        {instruction && (
                            <ScrollView contentContainerStyle={styles.questionScroll}>
                                <Text style={styles.header}>Detalhes</Text>
                                <Text style={styles.subHeader}>
                                    {instruction.descricao || instruction.link.titulo}
                                </Text>
                                {(instruction.passoAPasso || []).map((stepText, i) => (
                                    <ListItem
                                        key={`passo-${index}-${i}`}
                                        bottomDivider
                                        containerStyle={styles.stepItem}
                                    >
                                        <Icon name="chevron-right" />
                                        <ListItem.Content>
                                            <ListItem.Title style={styles.stepText}>
                                                {stepText}
                                            </ListItem.Title>
                                        </ListItem.Content>
                                    </ListItem>
                                ))}
                                <Text style={styles.linkValue}>{instruction.link.url}</Text>
                                <Button
                                    title="Abrir Link"
                                    onPress={() => Linking.openURL(instruction.link.url)}
                                    buttonStyle={styles.linkButton}
                                    titleStyle={styles.linkTitle}
                                    containerStyle={styles.responseContainer}
                                />
                                {instruction.proximaAcao === 'AGENDAR_CONSULTA' && (
                                    <Button
                                        title="Continuar"
                                        onPress={() => {
                                            if (index < perguntas.length - 1) {
                                                setIndex(index + 1);
                                                setStep('QUESTION');
                                            } else {
                                                setStep('SCHEDULE');
                                            }
                                        }}
                                        buttonStyle={styles.continueButton}
                                        titleStyle={styles.continueTitle}
                                        containerStyle={styles.responseContainer}
                                    />
                                )}
                                <Button
                                    title="Voltar às Perguntas"
                                    type="outline"
                                    onPress={() => {
                                        setInstruction(null);
                                        setStep('QUESTION');
                                    }}
                                    containerStyle={styles.responseContainer}
                                />
                            </ScrollView>
                        )}
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    flex: {
        flex: 1,
        backgroundColor: colors.background,
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.primary,
        marginBottom: 12,
        textAlign: 'center',
    },
    subHeader: {
        fontSize: 18,
        color: colors.textPrimary,
        marginBottom: 16,
        textAlign: 'center',
    },
    closeButton: {
        position: 'absolute',
        top: 12,
        right: 12,
        zIndex: 10,
    },
    linkValue: {
        fontSize: 14,
        color: colors.primary,
        marginBottom: 8,
        textAlign: 'center',
    },
    questionScroll: {
        alignItems: 'stretch',
    },
    question: {
        fontSize: 20,
        color: colors.textPrimary,
        marginBottom: 12,
        textAlign: 'center',
    },
    instruction: {
        fontSize: 16,
        color: colors.textSecondary,
        marginBottom: 20,
        textAlign: 'center',
    },
    responseContainer: {
        marginBottom: 12,
    },
    responseButton: {
        backgroundColor: colors.primary,
        paddingVertical: 14,
        borderRadius: 6,
    },
    responseTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#fff',
    },
    linkButton: {
        backgroundColor: colors.secondary,
        paddingVertical: 14,
        borderRadius: 6,
    },
    linkTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#fff',
    },
    continueButton: {
        backgroundColor: colors.primary,
        paddingVertical: 14,
        borderRadius: 6,
    },
    continueTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#fff',
    },
    retryButton: {
        backgroundColor: colors.error,
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 6,
        marginTop: 16,
    },
    retryTitle: {
        fontSize: 16,
        fontWeight: '600',
    },
    errorText: {
        color: colors.error,
        textAlign: 'center',
        marginBottom: 12,
    },
    infoText: {
        fontSize: 18,
        color: colors.textSecondary,
        textAlign: 'center',
        marginTop: 8,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    modalContainer: {
        width: '100%',
        maxWidth: 400,
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
    },
    stepItem: {
        backgroundColor: '#fafafa',
        borderRadius: 4,
        marginVertical: 4,
    },
    stepText: {
        fontSize: 14,
        color: colors.textPrimary,
    },
});
