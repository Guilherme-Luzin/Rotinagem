import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import {Picker} from '@react-native-picker/picker';

import Repositorio_Compras from './Repositorio_Compras'

export default function AddCompras({ route, navigation }) {
    const id = route.params ? route.params.id : '';
    const [descricao, setDescricao] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [unidadeMedida, setUnidadeMedida] = useState('');
    const medida = [
        { label: 'Und', value: 'Und', color: 'black' },
        { label: 'Kg', value: 'Kg', color: 'black' },
        { label: 'g', value: 'g', color: 'black' },
        { label: 'Lt', value: 'Lt', color: 'black'},
        { label: 'ml', value: 'ml', color: 'black'}
      ];
     
      const placeholder = { label:'Selecione a unidade de medida', value: null, color: 'black'};

    useEffect(() => {
        if(!route.params) return;
        setDescricao(route.params.descricao);
        setQuantidade(route.params.quantidade.toString());
        setUnidadeMedida(route.params.unidadeMedida);
    }, [route])

    function handleDescriptionChange(descricao){ setDescricao(descricao); } 
    function handleQuantityChange(quantidade){ setQuantidade(quantidade); }
    function handleUnityChange(unidadeMedida){ setUnidadeMedida(unidadeMedida); }
    function handleClearPress(){
        setDescricao('');
        setQuantidade('');
        setUnidadeMedida('');
        navigation.navigate("AddCompras");
    }
    async function handleButtonPress(){ 
        try{
            const listItens = {descricao, quantidade, unidadeMedida};
            if(listItens.descricao != '' &&
             listItens.quantidade != '' && listItens.quantidade != '0' && 
             listItens.unidadeMedida != ''){
                Repositorio_Compras.salvarItems(listItens, id)
                .then(response => alert("Dados Salvo com sucesso"))
                .then(response => navigation.navigate("AddCompras"))
                .then(response => navigation.navigate("ListaCompras", listItens));
                setDescricao('');
                setQuantidade('');
                setUnidadeMedida('');
            }
            else{
                if(listItens.descricao == ''){
                    alert('Insira o nome do item');
                }
                else if(listItens.quantidade == '' || listItens.quantidade == '0'){
                    alert('A quantidade do item não pode ser zero(0)');
                }
                else if(listItens.unidadeMedida == ''){
                    alert('Insira a unidade de medida do item');
                }
            }
            
        }
        catch(error){
            alert("Erro ao salvar item " + error);
            throw error;
        }
        
    }

  return (
    <View style={styles.container}>
        <Text style={styles.title}>Cadastro de Item</Text>
        <View style={styles.inputContainer}> 
            <TextInput 
                onChangeText={handleDescriptionChange}
                style={styles.input} 
                placeholder="Nome do item"
                clearButtonMode="always"
                value={descricao} /> 
            <TextInput 
                onChangeText={handleQuantityChange}
                style={styles.input}  
                placeholder="Quantidade necessária" 
                keyboardType={'number-pad'}
                clearButtonMode="always"
                value={quantidade} />
            <Picker selectedValue={unidadeMedida}
            onValueChange={(itemValue, itemIndex) =>
            setUnidadeMedida(itemValue)} 
            style={pickerSelectStyle.pickerStyle}>
                <Picker.Item label='Selecione a unidade de Media' value='' />
                <Picker.Item label='Und' value='Und'/>
                <Picker.Item label='Kg' value='Kg'/>
                <Picker.Item label='g' value='g'/>
                <Picker.Item label='Lt' value='Lt'/>
                <Picker.Item label='ml' value='ml'/>
            </Picker>
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
        backgroundColor: '#f5f5f5',
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

  const pickerSelectStyle = StyleSheet.create({
    pickerStyle: {
        marginTop: 10,
        height: 60,
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        paddingHorizontal: 24,
        fontSize: 16,
        alignItems: 'stretch',
    }
  });