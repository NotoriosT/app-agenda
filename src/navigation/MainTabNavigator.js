import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// Telas
import HomeScreen from '../screens/Home/HomeScreen';
import ConsultasScreen from '../screens/Consultas/ConsultasScreen';
import MensagensScreen from '../screens/Mensagens/MensagensScreen';
import PerfilScreen from '../screens/Perfil/PerfilScreen';

// Tema
import { colors } from '../theme/colors';

const Tab = createBottomTabNavigator();

export default function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false, // Mantém os cabeçalhos personalizados de cada tela
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
        tabBarStyle: {
          height: 60,
          paddingTop: 5,
        },
      })}
    >
      {/* Atribuindo os componentes corretos para cada aba */}
      <Tab.Screen name="Início" component={HomeScreen} />
      <Tab.Screen name="Consultas" component={ConsultasScreen} />

      {/* As outras abas permanecem como estavam */}
      <Tab.Screen name="Mensagens" component={MensagensScreen} />
      <Tab.Screen name="Perfil" component={PerfilScreen} />
    </Tab.Navigator>
  );
}