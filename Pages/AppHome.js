import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5 as Icon } from '@expo/vector-icons';

import AddRotina from './Rotina/AddRotina';
import ListaRotina from './Rotina/ListaRotina';

const { Navigator, Screen } = createBottomTabNavigator();

function TabCompras() {
    return (
        //Definições do estilo das abas
        <NavigationContainer>
            <Navigator
                screenOptions={{
                    tabBarActiveTintColor: "#000000",
                    tabBarInactiveTintColor: "#fff",
                    tabBarActiveBackgroundColor: "#fff",
                    tabBarInactiveBackgroundColor: "#000000",
                    tabBarLabelStyle: {display: "flex"},
                    tabBarIconStyle: { display: "flex" },
                    headerStyle: { backgroundColor: "#000000" },
                    headerTintColor: "#fff"
                }}
            >
                <Screen name="ListaRotina" component={ListaRotina} 
                    options={{tabBarIcon: ({size, color}) => (
                        <Icon name="book" size={size} color={color} />
                    ), title: 'Lista de Rotinas'}}/>
                <Screen name="AddRotina" component={AddRotina} 
                    options={{tabBarIcon: ({size, color}) => (
                            <Icon name="book-open" size={size} color={color} />
                    ), title: 'Adicionar Rotina'}}/>
            </Navigator>
        </NavigationContainer>
    );
}

export default TabCompras;