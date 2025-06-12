// src/navigation/PrivateDrawer.js
import React from 'react';
import { createDrawerNavigator, DrawerContentScrollView,
    DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import Icon        from 'react-native-vector-icons/MaterialIcons';
import HomeScreen  from '../screens/Home/HomeScreen';
import DadosScreen from '../screens/Dados/DadosScreen';
import ConsultasScreen     from '../screens/Consultas/ConsultasScreen';
import NotificacoesScreen  from '../screens/Notificacoes/NotificacoesScreen';
import { useAuth } from '../contexts/AuthContext';

const Drawer = createDrawerNavigator();

export default function PrivateDrawer() {
    const { logout } = useAuth();

    /* --- Drawer custom para injetar botão Sair --------------- */
    const Custom = (props) => (
        <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <DrawerItem
                label="Sair"
                icon={() => <Icon name="logout" size={22} color="#d32f2f" />}
                onPress={logout}
            />
        </DrawerContentScrollView>
    );

    return (
        <Drawer.Navigator
            screenOptions={{
                headerTintColor:'#FFF',
                headerStyle:{ backgroundColor:'#009688' },
                drawerActiveTintColor:'#009688'
            }}
            drawerContent={Custom}
        >
            <Drawer.Screen name="Início"        component={HomeScreen}
                           options={{ drawerIcon:()=><Icon name="home" size={22}/> }}/>
            <Drawer.Screen name="Meus dados"    component={DadosScreen}
                           options={{ drawerIcon:()=><Icon name="person" size={22}/> }}/>
            <Drawer.Screen name="Consultas"     component={ConsultasScreen}
                           options={{ drawerIcon:()=><Icon name="event-note" size={22}/> }}/>
            <Drawer.Screen name="Notificações"  component={NotificacoesScreen}
                           options={{ drawerIcon:()=><Icon name="notifications" size={22}/> }}/>
        </Drawer.Navigator>
    );
}
