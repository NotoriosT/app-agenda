// Localização: src/screens/Consultas/ActionsBar.js

import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text, Icon } from 'react-native-elements';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styles from './styles'; // CORRIGIDO: Importando da mesma pasta
import { colors } from '../../theme/colors';

const ActionsBar = () => {
    const insets = useSafeAreaInsets();

    const handleCancel = () => console.log("Ação: Cancelar");
    const handleReschedule = () => console.log("Ação: Reagendar");

    return (
        <View style={[styles.actionsContainer, { paddingBottom: insets.bottom || 20 }]}>
            <Text style={styles.actionsTitle}>Abrir consulta</Text>
            <View style={styles.actionsButtons}>
                <TouchableOpacity style={styles.actionButton} onPress={handleCancel}>
                    <View style={[styles.actionIconCircle, { backgroundColor: colors.error }]}>
                        <Icon name="close" type="material" color={colors.white} size={28} />
                    </View>
                    <Text style={styles.actionLabel}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton} onPress={handleReschedule}>
                    <View style={[styles.actionIconCircle, { backgroundColor: colors.primary }]}>
                        <Icon name="edit-calendar" type="material" color={colors.white} size={24} />
                    </View>
                    <Text style={styles.actionLabel}>Reagendar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default ActionsBar;