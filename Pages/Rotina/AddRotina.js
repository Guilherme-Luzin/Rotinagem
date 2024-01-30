import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, TouchableOpacity, Modal } from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { HelperText, TextInput } from 'react-native-paper';
import { CheckBox } from '@rneui/themed';

import Repositorio_Rotina from './Repositorio_Rotina';
import styles from './Style';
import { cancelNotification, schedulePushNotification } from '../Notification/Notification';

export default function AddRotina({ route, navigation }) {
    const id = route.params ? route.params.id : '';
    
    //Campos necessários para o cadastro
    const [rotina, setRotina] = useState('');
    const [hora, setHora] = useState('00:00');
    const [show, setShow] = useState(false);
    const [texto, setTexto] = useState('00:00');
    const [notificationId, setNotificationId] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedDays, setSelectedDays] = useState({});
    const [checked, setChecked] = React.useState(true);
    const [diasParaMostrarNaTela, setdiasParaMostrarNaTela] = useState('');

    const toggleCheckbox = () => {
        setChecked(!checked);
        limparSelecaoDeDias();
    }

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
        setRotina(route.params.rotina);
        setHora(route.params.hora);
        setTexto(route.params.hora);
        setNotificationId(route.params.res);
        preencherDias(route.params.dias)
    }, [route])

    const preencherDias = (dias) => {
        if(dias[0]?.includes("Todos os dias")){
            setChecked(true)
            return;
        }

        setChecked(false)
        setSelectedDays(dias)
        return;
    }

    //Verificando Valores Inseridos
    const RotinaComErro = () => {
        return rotina.includes('@');
    }

    //função para salvar atividade e para limpar campos
    function handleRotinaChange(rotina){ setRotina(rotina); }
    function handleClearPress(){
        setRotina('');
        setHora('');
        setTexto('00:00');
        setNotificationId([]);
        navigation.navigate("AddRotina");
        limparSelecaoDeDias();
        setChecked(true);
    }

    //Função para chamar o repositório
    async function handleButtonPress(){ 
        try{
            const dias = checked ? {0: 'Todos os dias'} : selectedDays
            const horas = hora.split(':')[0]
            const minuto = hora.split(':')[1]
            if(rotina != '' && hora != ''){
                if(notificationId != null && notificationId?.length !== 0){
                    notificationId.forEach(x => {
                        cancelNotification(x);
                    })
                }

                schedulePushNotification(rotina, parseInt(horas), parseInt(minuto), dias)
                .then(res => {
                    const listaDeRotina = {rotina: rotina, hora, dias, res};
                    Repositorio_Rotina.salvarRotina(listaDeRotina, id)
                    .then(response => alert("Dados Salvo com sucesso"))
                    .then(response => navigation.navigate("AddRotina"))
                    .then(response => navigation.navigate("ListaRotina", listaDeRotina));
                    setRotina('');
                    setHora('');
                    setTexto('00:00');
                    limparSelecaoDeDias();
                    setChecked(true);
                })
            }
            else{
                if(rotina == '')
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
    
      const isDaySelected = (position) => {
        return selectedDays.hasOwnProperty(position);
      };

      const limparSelecaoDeDias = () => {
        return setSelectedDays({});
      };
    
      const toggleDaySelection = (day, position) => {
        var novoDicionario = selectedDays
        const updatedDays = isDaySelected(position)
          ? delete novoDicionario[position]
          : novoDicionario[position] = day;

        setSelectedDays(novoDicionario);
        atualizarTextoDaTela()
      };
    
      const atualizarTextoDaTela = () => {
        var novosDias = ''
        var diasSelecionado = Object.values(selectedDays)
        if(diasSelecionado.length == 0){
            return setdiasParaMostrarNaTela(novosDias)
        }

        diasSelecionado.forEach(x => {
            if(novosDias.length > 0)
                novosDias += `, ${x}`
            else
            novosDias += `${x}`
        })
        setdiasParaMostrarNaTela(novosDias)
      }

    //Retorno da view
  return (
    <View style={styles.container}>
        <Text style={styles.title}>Cadastro de Rotina</Text>
        <View style={styles.inputContainer}> 
            <TextInput 
                mode="outlined"
                activeOutlineColor='blue'
                onChangeText={handleRotinaChange}
                style={styles.input}
                label="Nome da Atividade"
                clearButtonMode="always"
                value={rotina} />
                <HelperText type='error' visible={RotinaComErro()}>
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
                <CheckBox
                    title='Todos os dias'
                    checked={checked}
                    onPress={toggleCheckbox}
                    iconType="material-community"
                    checkedIcon="checkbox-outline"
                    uncheckedIcon={'checkbox-blank-outline'}
                />
                <View style={[styles.inputContainerWeekDays2, { display: checked ? 'none' : 'flex' }]}>
                    <TouchableOpacity onPress={() => toggleDaySelection('Segunda-Feira', 2)}>
                        <Text style={[styles.buttonTextWeekDays2, { color: isDaySelected(2) ? 'blue' : 'black' }]}>
                        S
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => toggleDaySelection('Terça-Feira', 3)}>
                        <Text style={[styles.buttonTextWeekDays2, { color: isDaySelected(3) ? 'blue' : 'black' }]}>
                        T
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => toggleDaySelection('Quarta-Feira', 4)}>
                        <Text style={[styles.buttonTextWeekDays2, { color: isDaySelected(4) ? 'blue' : 'black' }]}>
                        Q
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => toggleDaySelection('Quinta-Feira', 5)}>
                        <Text style={[styles.buttonTextWeekDays2, { color: isDaySelected(5) ? 'blue' : 'black' }]}>
                        Q
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => toggleDaySelection('Sexta-Feira', 6)}>
                        <Text style={[styles.buttonTextWeekDays2, { color: isDaySelected(6) ? 'blue' : 'black' }]}>
                        S
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => toggleDaySelection('Sábado', 7)}>
                        <Text style={[styles.buttonTextWeekDays2, { color: isDaySelected(7) ? 'blue' : 'black' }]}>
                        S
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => toggleDaySelection('Domingo', 1)}>
                        <Text style={[styles.buttonTextWeekDays2, { color: isDaySelected(1) ? 'blue' : 'black' }]}>
                        D
                        </Text>
                    </TouchableOpacity>
                    </View>
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
