import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { Overlay, Text, Button, Icon } from 'react-native-elements';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';

const PreConsultaModal = ({ modalData, onClose }) => {
    const [view, setView] = useState('question');

    useEffect(() => {
        if (modalData) {
            setView('question');
        }
    }, [modalData]);

    if (!modalData) {
        return null;
    }

    const { title, question, options, result, directLink } = modalData.modal;

    const handleOptionPress = (option) => {
        if (option.toLowerCase().includes('sim') && result) {
            setView('result');
        } 
        else if (directLink && option === directLink.linkText) {
            Linking.openURL(directLink.linkUrl);
            onClose();
        }
        else {
            onClose();
        }
    };

    const handleLinkPress = () => {
        if (result && result.linkUrl) {
            Linking.openURL(result.linkUrl);
        }
        onClose();
    };

    // Ação positiva (Sim) terá o estilo primário, a negativa (Não) terá o estilo secundário.
    const isPrimaryAction = (option) => {
        const positiveKeywords = ['sim', 'ver', 'agendar'];
        return positiveKeywords.some(keyword => option.toLowerCase().includes(keyword));
    };

    const renderQuestionView = () => (
        <>
            <Text style={styles.question}>{question}</Text>
            <Text style={styles.subText}>Selecione uma opção:</Text>
            <View style={styles.buttonContainer}>
                {options.map((option) => (
                    <Button
                        key={option}
                        title={option}
                        onPress={() => handleOptionPress(option)}
                        // Define o estilo (sólido ou contorno) com base na ação
                        buttonStyle={isPrimaryAction(option) ? styles.button : styles.buttonOutline}
                        titleStyle={isPrimaryAction(option) ? styles.buttonTitle : styles.buttonOutlineTitle}
                        containerStyle={{ width: '100%', marginTop: 12 }}
                    />
                ))}
            </View>
        </>
    );

    const renderResultView = () => (
        <>
            <Text style={styles.question}>{result.message}</Text>
            <View style={styles.buttonContainer}>
                <Button
                    title={result.linkText}
                    onPress={handleLinkPress}
                    buttonStyle={[styles.button, { backgroundColor: colors.secondary }]}
                    titleStyle={styles.buttonTitle}
                    icon={<Icon name="open-in-new" color={colors.white} style={{ marginRight: 8 }} />}
                    containerStyle={{ width: '100%', marginTop: 24 }}
                />
                <Button
                    title="Voltar"
                    onPress={onClose}
                    buttonStyle={styles.button}
                    titleStyle={styles.buttonTitle}
                    containerStyle={{ width: '100%', marginTop: 12 }}
                />
            </View>
        </>
    );

    return (
        <Overlay
            isVisible={!!modalData}
            onBackdropPress={onClose}
            overlayStyle={styles.card}
        >
            <View style={styles.content}>
                <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                    <Icon name="close" size={24} color={colors.textSecondary} />
                </TouchableOpacity>

                <Text style={styles.title}>{title}</Text>
                
                {view === 'question' ? renderQuestionView() : renderResultView()}

            </View>
        </Overlay>
    );
};

const styles = StyleSheet.create({
    card: {
        width: '90%',
        maxWidth: 400,
        borderRadius: 20,
        padding: 24,
        backgroundColor: colors.white,
    },
    content: {
        alignItems: 'center',
    },
    closeButton: {
        position: 'absolute',
        top: -10,
        right: -10,
    },
    title: {
        ...typography.h3,
        color: colors.primary,
        textAlign: 'center',
        marginBottom: 16,
    },
    question: {
        ...typography.body1,
        color: colors.text,
        textAlign: 'center',
        marginBottom: 8,
    },
    subText: {
        ...typography.body2,
        color: colors.textSecondary,
        textAlign: 'center',
        marginBottom: 24,
    },
    buttonContainer: {
        width: '100%',
        alignItems: 'center',
    },
    button: {
        backgroundColor: colors.primary,
        borderRadius: 8,
        paddingVertical: 14,
    },
    buttonTitle: {
        ...typography.button,
    },
    // Estilos para o botão secundário (ex: "Não")
    buttonOutline: {
        backgroundColor: 'transparent',
        borderColor: colors.primary,
        borderWidth: 1,
        borderRadius: 8,
        paddingVertical: 14,
    },
    buttonOutlineTitle: {
        ...typography.button,
        color: colors.primary,
    },
});

export default PreConsultaModal;