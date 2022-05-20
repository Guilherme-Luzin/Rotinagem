import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView } from 'react-native';

import Repositorio_Rotina from './Repositorio_Rotina';
import styles from './Style';

import Rotina from './Rotina';

export default function ListaRotina({ route, navigation }) {
    const [items, setItems] = useState([]);

    //Pegando todos os itens do repositório e retornando na tela
    useEffect(() => {
      Repositorio_Rotina.getAll().then(items => setItems(items));
    }, [route]);
    return (
        <View style={styles.containerListaRotina}>
            <StatusBar style="light" />
            <Text style={styles.titleListaRotina}>Lista de Rotina</Text>
            <ScrollView 
              style={styles.scrollContainerListaRotina}
              contentContainerStyle={styles.itemsContainerListaRotina}>
                { 
                  items.map(item => {
                    return <Rotina key={item.id} id={item.id} item={`${item.afazer} - ${JSON.stringify(item.hora)}`} navigation={navigation} />
                }) }
            </ScrollView>
        </View>
    );
}
