import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, TouchableOpacity } from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import {Picker} from '@react-native-picker/picker';
import { HelperText, TextInput } from 'react-native-paper';

import Repositorio_Compras from './Repositorio_Compras'
import { styles, pickerSelectStyle } from './Styles';

export default function AddCompras({ route, navigation }) {
    const id = route.params ? route.params.id : '';
    const [descricao, setDescricao] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [unidadeMedida, setUnidadeMedida] = useState('');

    useEffect(() => {
        if(!route.params) return;
        setDescricao(route.params.descricao);
        setQuantidade(route.params.quantidade.toString());
        setUnidadeMedida(route.params.unidadeMedida);
    }, [route])

    //Verificando Valores Inseridos
    const DescricaoComErro = () => {
        return descricao.includes('@');
    }

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
                mode='outlined'
                activeOutlineColor='blue'
                onChangeText={handleDescriptionChange}
                style={styles.input} 
                label="Nome do item"
                clearButtonMode="always"
                value={descricao} />
                <HelperText type='error' visible={DescricaoComErro()}>
                    Informe um nome válido
                </HelperText>
            <TextInput
                mode='outlined'
                activeOutlineColor='blue'
                onChangeText={handleQuantityChange}
                style={styles.input}  
                label="Quantidade necessária" 
                keyboardType='number-pad'
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
