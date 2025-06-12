import React from "react";
import { View } from "react-native";
import { Text, Icon } from "react-native-elements";
import { colors } from "../../theme/colors";
import styles from "./styles";

export default function Header() {
    return (
        <View style={styles.header}>
            <Icon name="medical-services" type="material" size={80} color={colors.primary} />
            <Text style={styles.title}>Prefeitura de Esteio</Text>
        </View>
    );
}
