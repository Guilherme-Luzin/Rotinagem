import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

import Repositorio_Rotina from './Repositorio_Rotina';

export default function AddRotina({ route, navigation }) {
    const id = route.params ? route.params.id : '';
    
    //Campos necessários para o cadastro
    const [afazer, setAfazer] = useState('');
    const [hora, setHora] = useState('00:00');
    const [show, setShow] = useState(false);
    const [texto, setTexto] = useState('00:00');

    //Tratando o horário
    const onChange = (envent, selectedTime) => {
        const teste = selectedTime;
        setShow(false)
        const tempTime = new Date(teste);
        const horario = tempTime.getHours();
        const minutos = tempTime.getMinutes();
        const horaFormatada = `${horario}:${minutos}`;
        if(horaFormatada == 'NaN:NaN'){
            setTexto('00:00');
            setHora('00:00');
        }
        else{
            setHora(horaFormatada);
            setTexto(horaFormatada);
        }
    };
    const showTimePicker = () => {
        setShow(true);
    };
    
    //Trazendo Parametros
    useEffect(() => {
        if(!route.params) return;
        setAfazer(route.params.afazer);
        setHora(route.params.hora);
        setTexto(route.params.hora);
    }, [route])

    //função para salvar atividade e para limpar campos
    function handleAfazerChange(afazer){ setAfazer(afazer); }
    function handleClearPress(){
        setAfazer('');
        setHora('');
        setTexto('00:00');
        navigation.navigate("AddRotina");
    }

    //Função para chamar o repositório
    async function handleButtonPress(){ 
        try{
            const listAfazer = {afazer, hora};
            if(listAfazer.afazer != '' && listAfazer.hora != ''){
                Repositorio_Rotina.salvarRotina(listAfazer, id)
                .then(response => alert("Dados Salvo com sucesso"))
                .then(response => navigation.navigate("AddRotina"))
                .then(response => navigation.navigate("ListaRotina", listAfazer));
                setAfazer('');
                setHora('');
                setTexto('00:00');
            }
            else{
                if(listAfazer.afazer == '')
                    alert('Preencha o nome da atividade');
                else if(listAfazer.hora == '' || listAfazer.hora == 'NaN:NaN')
                alert('Preencha o horário da Atividade');
            }
            
        }
        catch(error){
            alert("Erro ao salvar item " + error);
            throw error;
        }
        
    }

    //Retorno da view
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
                <Text style={styles.inputTime} onPress={showTimePicker}>
                    <Icon name="clock" size={24} color="black" />
                    {texto}
                </Text>
                {show && (
                    <DateTimePicker
                        testId="dateTimePicker"
                        value={new Date}
                        mode={'time'}
                        is24Hour={false}
                        display="default"
                        onChange={onChange}
                    />
                )}
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
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
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
    inputTime: {
        marginTop: 10,
        height: 60,
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingHorizontal: 100,
        fontSize: 20,
        alignItems: 'center'
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
    buttonTime: {
        marginTop: 5,
        height: 35,
        backgroundColor: 'black',
        paddingHorizontal: 24,
        fontSize: 10,
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