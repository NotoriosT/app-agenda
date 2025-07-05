// src/navigation/MainTabNavigator.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context'; // 1. Importar o hook

// Telas
import HomeScreen from '../screens/Home/HomeScreen';
import ConsultasScreen from '../screens/Consultas/ConsultasScreen';
import MensagensScreen from '../screens/Mensagens/MensagensScreen';
import PerfilScreen from '../screens/Perfil/PerfilScreen';

// Tema
import { colors } from '../theme/colors';

const Tab = createBottomTabNavigator();

export default function MainTabNavigator() {
  const insets = useSafeAreaInsets(); // 2. Obter os valores da área segura

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Início') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Consultas') {
            iconName = focused ? 'calendar' : 'calendar-outline';
          } else if (route.name === 'Mensagens') {
            iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
          } else if (route.name === 'Perfil') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: 'gray',
        tabBarLabelStyle: {
          paddingBottom: 5,
          fontSize: 12,
        },
        // 3. Aplicar o ajuste de responsividade no estilo da barra
        tabBarStyle: {
          height: 60 + insets.bottom, // A altura total considera a área segura
          paddingBottom: insets.bottom, // Adiciona um preenchimento inferior
          paddingTop: 5,
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