// src/navigation/MainTabNavigator.js

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-elements';

import HomeScreen from '../screens/Home/HomeScreen';
import ConsultasScreen from '../screens/Consultas/ConsultasScreen';
import MensagensScreen from '../screens/Mensagens/MensagensScreen';
import PerfilScreen from '../screens/Perfil/PerfilScreen';

import { colors } from '../theme/colors';

const Tab = createBottomTabNavigator();

export default function MainTabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false, // O cabeçalho é gerido por cada ecrã
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Início') {
                        iconName = 'home';
                    } else if (route.name === 'Consultas') {
                        iconName = 'event-note';
                    } else if (route.name === 'Mensagens') {
                        iconName = 'chat-bubble-outline';
                    } else if (route.name === 'Perfil') {
                        iconName = 'person-outline';
                    }

                    return <Icon name={iconName} type="material" size={size} color={color} />;
                },
                tabBarActiveTintColor: colors.primary,
                tabBarInactiveTintColor: colors.textSecondary,
                tabBarStyle: {
                    backgroundColor: colors.white,
                    borderTopColor: colors.border,
                },
                tabBarLabelStyle: {
                    fontSize: 12,
                    paddingBottom: 4,
                },
            })}
        >
            <Tab.Screen name="Início" component={HomeScreen} />
            <Tab.Screen name="Consultas" component={ConsultasScreen} />
            <Tab.Screen name="Mensagens" component={MensagensScreen} />
            <Tab.Screen name="Perfil" component={PerfilScreen} />
        </Tab.Navigator>
    );
}
