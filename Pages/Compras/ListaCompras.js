import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView } from 'react-native';

import Repositorio_Compras from './Repositorio_Compras';
import Itens from './Itens';
import { styles } from './Styles';

export default function ListaCompras({ route, navigation }) {
    const [items, setItems] = useState([]);

    //Pegando todos os itens do repositório e retornando na tela
    useEffect(() => {
      Repositorio_Compras.getAll().then(items => setItems(items));
    }, [route]);
    
    return (
        <View style={styles.containerListaItens}>
            <StatusBar style="light" />
            <Text style={styles.titleListaItens}>Lista de Compras</Text>
            <ScrollView 
              style={styles.scrollContainerListaItens}
              contentContainerStyle={styles.itemsContainerListaItens}>
                { 
                  items.map(item => {
                    return <Itens key={item.id} id={item.id} item={`${item.descricao} = ${item.quantidade} ${item.unidadeMedida} `} navigation={navigation} />
                }) }
            </ScrollView>
        </View>
    );
}
