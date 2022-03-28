import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import ListaCompras from './ListaCompras';
import AddCompras from './AddCompras';

const { Navigator, Screen } = createBottomTabNavigator();

function TabCompras() {
    return (
        <NavigationContainer>
            <Navigator
                screenOptions={{
                    tabBarActiveTintColor: "#000000",
                    tabBarInactiveTintColor: "#fff",
                    tabBarActiveBackgroundColor: "#fff",
                    tabBarInactiveBackgroundColor: "#000000",
                    tabBarLabelStyle: {
                        fontSize: 13,
                        position: 'absolute',
                        top: 15,
                        bottom: 0,
                        left: 0,
                        right: 0
                    },
                    tabBarIconStyle: { display: "none" }
                }}
            >
                <Screen name="ListaCompras" component={ListaCompras} 
                    options={{tabBarLabel: "Lista de Compras"}} />
                <Screen name="AddCompras" component={AddCompras} o
                    ptions={{tabBarLabel: "Adicionar"}}/>
            </Navigator>
        </NavigationContainer>
    );
}

export default TabCompras;