import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

import Repositorio_Compras from './Repositorio_Compras'

export default function AddCompras({ navigation }) {
    const [descricao, setDescricao] = useState('');
    const [quantidade, setQuantidade] = useState('');

    function handleDescriptionChange(descricao){ setDescricao(descricao); } 
    function handleQuantityChange(quantidade){ setQuantidade(quantidade); }
    async function handleButtonPress(){ 
        try{
            const listItens = {descricao, quantidade: parseInt(quantidade)};
            Repositorio_Compras.salvarItems(listItens)
            .then(response => alert("Dados Salvo com sucesso"))
            .then(response => navigation.navigate("ListaCompras", listItens));
        }
        catch(error){
            alert("Erro ao salvar item " + error);
            throw error;
        }
        
    }

  return (
    <View style={styles.container}>
        <Text style={styles.title}>Adicionar Item para comprar</Text>
        <View style={styles.inputContainer}> 
            <TextInput 
                onChangeText={handleDescriptionChange}
                style={styles.input} 
                placeholder="Nome do item"
                clearButtonMode="always" /> 
            <TextInput 
                onChangeText={handleQuantityChange}
                style={styles.input}  
                placeholder="Quantidade necessária" 
                keyboardType={'numeric'}
                clearButtonMode="always" /> 
            <TouchableOpacity style={styles.button} onPress={handleButtonPress}> 
                <Text style={styles.buttonText}>Salvar</Text> 
            </TouchableOpacity> 
        </View>
        <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#262926',
        alignItems: 'center',
    },
    title: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 50,
    },
    inputContainer: {
        flex: 1,
        marginTop: 30,
        width: '90%',
        padding: 20,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        alignItems: 'stretch',
        backgroundColor: '#fff'
    },
    input: {
        marginTop: 10,
        height: 60,
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingHorizontal: 24,
        fontSize: 16,
        alignItems: 'stretch'
    },
    button: {
        marginTop: 10,
        height: 60,
        backgroundColor: 'blue',
        borderRadius: 10,
        paddingHorizontal: 24,
        fontSize: 16,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 20,
        shadowOpacity: 20,
        shadowColor: '#ccc',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    }
  });