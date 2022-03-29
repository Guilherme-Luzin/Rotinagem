import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5 as Icon } from '@expo/vector-icons';

import ListaCompras from './Compras/ListaCompras';
import AddCompras from './Compras/AddCompras';

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
                    tabBarLabelStyle: {display: "flex"},
                    tabBarIconStyle: { display: "flex" }
                }}
            >
                <Screen name="Lista de Compras" component={ListaCompras} 
                    options={{tabBarIcon: ({size, color}) => (
                        <Icon name="shopping-cart" size={size} color={color}/>
                    )}} />
                <Screen name="Adicionar Item" component={AddCompras} 
                    options={{tabBarIcon: ({size, color}) => (
                        <Icon name="cart-plus" size={size} color={color} />
                    )}}/>
                <Screen name="Lista de Rotina" component={AddCompras} 
                    options={{tabBarIcon: ({size, color}) => (
                        <Icon name="book" size={size} color={color} />
                    )}}/>
                <Screen name="Adicionar Rotina" component={AddCompras} 
                    options={{tabBarIcon: ({size, color}) => (
                            <Icon name="book-open" size={size} color={color} />
                    )}}/>
            </Navigator>
        </NavigationContainer>
    );
}

export default TabCompras;