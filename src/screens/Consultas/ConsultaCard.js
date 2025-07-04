// Localização: src/screens/Consultas/ConsultaCard.js

import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text, Icon } from 'react-native-elements';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import styles from './styles'; // CORRIGIDO: Importando da mesma pasta
import { colors } from '../../theme/colors';

const ConsultaCard = ({ item, onPress, isSelected }) => {
    const statusInfo = {
        PENDENTE: { bg: colors.warningBackground, text: colors.accentDark },
        CONFIRMADA: {
            bg: colors.successBackground,
            text: colors.secondaryDark,
        },
        CANCELADA: { bg: colors.errorBackground, text: colors.error },
    };

    const statusStyle = statusInfo[item.status] || statusInfo.PENDENTE;

    return (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.card, isSelected && styles.cardSelected]}
        >
            <View style={[styles.badge, { backgroundColor: statusStyle.bg }]}>
                <Text style={[styles.badgeText, { color: statusStyle.text }]}>
                    {item.status}
                </Text>
            </View>

            <View style={styles.cardBody}>
                <View style={styles.cardMainInfo}>
                    <Text style={styles.doctorName}>{item.medico}</Text>
                    <View style={styles.locationContainer}>
                        <Icon
                            name="location-pin"
                            type="material"
                            size={14}
                            color={colors.textSecondary}
                        />
                        <Text style={styles.upsName}>{item.ups}</Text>
                    </View>
                </View>
                <View style={styles.cardDateInfo}>
                    <Text style={styles.dateText}>
                        {format(new Date(item.data), 'dd MMM yyyy', {
                            locale: ptBR,
                        })}
                    </Text>
                    <Text style={styles.timeText}>
                        {format(new Date(item.data), 'HH:mm')}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default ConsultaCard;