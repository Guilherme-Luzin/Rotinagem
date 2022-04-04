import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

import Repositorio_Rotina from './Repositorio_Rotina';

export default function AddRotina({ route, navigation }) {
    const id = route.params ? route.params.id : '';
    const [afazer, setAfazer] = useState('');

    useEffect(() => {
        if(!route.params) return;
        setAfazer(route.params.afazer);
    }, [route])

    function handleAfazerChange(afazer){ setAfazer(afazer); } 
    function handleClearPress(){
        setAfazer('');
        navigation.navigate("AddRotina");
    }
    async function handleButtonPress(){ 
        try{
            const listAfazer = {afazer};
            if(listAfazer.afazer != ''){
                Repositorio_Rotina.salvarRotina(listAfazer, id)
                .then(response => alert("Dados Salvo com sucesso"))
                .then(response => navigation.navigate("AddRotina"))
                .then(response => navigation.navigate("ListaRotina", listAfazer));
                setAfazer('');
            }
            else{
                alert('Preencha o nome da atividade');
            }
            
        }
        catch(error){
            alert("Erro ao salvar item " + error);
            throw error;
        }
        
    }

  return (
    <View style={styles.container}>
        <Text style={styles.title}>Cadastro de Rotina</Text>
        <View style={styles.inputContainer}> 
            <TextInput 
                onChangeText={handleAfazerChange}
                style={styles.input} 
                placeholder="Nome da Atividade"
                clearButtonMode="always"
                value={afazer} /> 
            <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
                <View style={styles.buttonContainer}> 
                    <Icon name="save" size={22} color="white" />
                    <Text style={styles.buttonText}>Salvar</Text> 
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonCancel} onPress={handleClearPress}>
                <View style={styles.buttonContainer}> 
                    <MaterialIcons name="cancel" size={22} color="white" />
                    <Text style={styles.buttonText}>Limpar</Text> 
                </View>
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
    buttonCancel: {
        marginTop: 10,
        height: 60,
        backgroundColor: 'red',
        borderRadius: 10,
        paddingHorizontal: 24,
        fontSize: 16,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 20,
        shadowOpacity: 20,
        shadowColor: '#ccc',
    },
    buttonContainer: {
        flexDirection: "row"
      },
      buttonText: {
        marginLeft: 10,
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
      }
  });