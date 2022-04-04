import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

import Repositorio_Rotina from './Repositorio_Rotina';

import Rotina from './Rotina';

export default function ListaRotina({ route, navigation }) {
    const [items, setItems] = useState([]);

    useEffect(() => {
      Repositorio_Rotina.getAll().then(items => setItems(items));
    }, [route]);
    return (
        <View style={styles.container}>
            <StatusBar style="light" />
            <Text style={styles.title}>Lista de Rotina</Text>
            <ScrollView 
              style={styles.scrollContainer}
              contentContainerStyle={styles.itemsContainer}>
                { 
                  items.map(item => {
                    return <Rotina key={item.id} id={item.id} item={`${item.afazer}`} navigation={navigation} />
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
    marginTop: 10,
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: 'stretch',
    backgroundColor: '#fff'
  },
});