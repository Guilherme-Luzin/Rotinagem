import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

import Repositorio_Compras from './Repositorio_Compras';

import Itens from './Itens';

export default function ListaCompras({ route, navigation }) {
    const [items, setItems] = useState([]);

    useEffect(() => {
      Repositorio_Compras.getAll().then(items => setItems(items));
    }, [route]);
    return (
        <View style={styles.container}>
            <StatusBar style="light" />
            <Text style={styles.title}>Lista de Compras</Text>
            <ScrollView 
            style={styles.scrollContainer}
            contentContainerStyle={styles.itemsContainer}>
                { 
                  items.map(item => {
                    return <Itens key={item.id} id={item.id} item={item.descricao + '  = ' + item.quantidade + ' und'} navigation={navigation} />
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