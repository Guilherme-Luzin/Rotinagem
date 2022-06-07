import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5 as Icon } from '@expo/vector-icons';

import ListaCompras from './Compras/ListaCompras';
import AddCompras from './Compras/AddCompras';
import AddRotina from './Rotina/AddRotina';
import ListaRotina from './Rotina/ListaRotina';

const { Navigator, Screen } = createBottomTabNavigator();

function TabCompras() {
    return (
        //Definições do estilo das abas
        <NavigationContainer>
            <Navigator
                screenOptions={{
                    tabBarActiveTintColor: "#fff",
                    tabBarInactiveTintColor: "#696868",
                    tabBarActiveBackgroundColor: "#000000",
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
                <Screen name="AddCompras" component={AddCompras} 
                    options={{tabBarIcon: ({size, color}) => (
                        <Icon name="cart-plus" size={size} color={color} />
                    ), title: 'Adicionar Item'}}/>
                <Screen name="ListaCompras" component={ListaCompras} 
                options={{tabBarIcon: ({size, color}) => (
                    <Icon name="shopping-cart" size={size} color={color}/>
                ), title: 'Lista de Compras'}} />
            </Navigator>
        </NavigationContainer>
    );
}

export default TabCompras;