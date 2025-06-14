// src/screens/Perfil/PerfilScreen.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-elements';
import { useAuth } from '../../contexts/AuthContext';
import { colors } from '../../theme/colors';

export default function PerfilScreen() {
    const { logout } = useAuth();
    return (
        <View style={styles.container}>
            <Text h3 style={{color: colors.text, marginBottom: 20}}>Tela de Perfil</Text>
            <Button
                title="Sair do Aplicativo"
                onPress={logout}
                buttonStyle={{backgroundColor: colors.error}}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background },
});
