import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

import Itens from './Itens';

export default function ListaCompras() {
    const [items, setItems] = useState([
        {id: 1, quantidade: 5, descricao: "Arroz" }, 
        {id: 2, quantidade: 1, descricao: "Feijão" }, 
        {id: 3, quantidade: 1, descricao: "Macarrão" }, 
        {id: 4, quantidade: 1, descricao: "Massa de Pastel" }, 
        {id: 5, quantidade: 1, descricao: "Katchup" }, 
        {id: 6, quantidade: 1, descricao: "Queijo-ralado" }
    ]);
    return (
        <View style={styles.container}>
            <StatusBar style="light" />
            <Text style={styles.title}>Lista de Compras</Text>
            <ScrollView 
            style={styles.scrollContainer}
            contentContainerStyle={styles.itemsContainer}>
                { items.map(item => {
                    return <Itens key={item.id} id={item.id} item={item.quantidade + '  de ' + item.descricao} />
                }) }
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#262926',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 50,
    marginBottom: 20
  },
  scrollContainer: {
    flex: 1,
    width: '90%'
  },
  itemsContainer: {
    flex: 1,
    marginTop: 10,
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: 'stretch',
    backgroundColor: '#fff'
  },
});