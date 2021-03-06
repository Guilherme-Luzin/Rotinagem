import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, TouchableOpacity } from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { HelperText, TextInput } from 'react-native-paper';

import Repositorio_Rotina from './Repositorio_Rotina';
import styles from './Style';
import { cancelNotification, schedulePushNotification } from '../Notification/Notification';

export default function AddRotina({ route, navigation }) {
    const id = route.params ? route.params.id : '';
    
    //Campos necessários para o cadastro
    const [afazer, setAfazer] = useState('');
    const [hora, setHora] = useState('00:00');
    const [show, setShow] = useState(false);
    const [texto, setTexto] = useState('00:00');
    const [notificationId, setNotificationId] = useState('');

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
        setNotificationId(route.params.res);
    }, [route])

    //Verificando Valores Inseridos
    const AfazerComErro = () => {
        return afazer.includes('@');
    }

    //função para salvar atividade e para limpar campos
    function handleAfazerChange(afazer){ setAfazer(afazer); }
    function handleClearPress(){
        setAfazer('');
        setHora('');
        setTexto('00:00');
        setNotificationId('');
        navigation.navigate("AddRotina");
    }

    //Função para chamar o repositório
    async function handleButtonPress(){ 
        try{
            const horas = hora.split(':')[0]
            const minuto = hora.split(':')[1]
            if(afazer != '' && hora != ''){
                if(notificationId !== '')
                    cancelNotification(notificationId);

                schedulePushNotification(afazer, parseInt(horas), parseInt(minuto))
                .then(res => {
                    const listAfazer = {afazer, hora, res};
                    Repositorio_Rotina.salvarRotina(listAfazer, id)
                    .then(response => alert("Dados Salvo com sucesso"))
                    .then(response => navigation.navigate("AddRotina"))
                    .then(response => navigation.navigate("ListaRotina", listAfazer));
                    setAfazer('');
                    setHora('');
                    setTexto('00:00');
                })
            }
            else{
                if(afazer == '')
                    alert('Preencha o nome da atividade');
                else if(hora == '' || hora == 'NaN:NaN')
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
                mode="outlined"
                activeOutlineColor='blue'
                onChangeText={handleAfazerChange}
                style={styles.input}
                label="Nome da Atividade"
                clearButtonMode="always"
                value={afazer} />
                <HelperText type='error' visible={AfazerComErro()}>
                    Nome da atividade é inválido!
                </HelperText>
                <Text style={styles.inputTime} onPress={showTimePicker}>
                    <Icon name="clock" size={24} color="black" />
                    {texto}
                </Text>
                {show && (
                    <DateTimePicker
                        testId="dateTimePicker"
                        value={new Date}
                        mode={'time'}
                        is24Hour={true}
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
