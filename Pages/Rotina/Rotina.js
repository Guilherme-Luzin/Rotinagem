import React from 'react';
import { Text, View, TouchableOpacity, Alert} from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';

import Repositorio_Rotina from './Repositorio_Rotina';
import styles from './Style';
import { cancelNotification } from '../Notification/Notification';

export default function Rotina(props){
    //Função do botão Editar
    async function handleEditPress(){ 
        const rotina = await Repositorio_Rotina.getRotina(props.id);
        props.navigation.navigate("AddRotina", rotina);
    }

    //Função do botão deletar
    async function handleDeletePress(){
        const rotina = await Repositorio_Rotina.getRotina(props.id);
        Alert.alert(
            "Atenção",
            "Você tem certeza que deseja deletar este item?",
            [
                {
                    text: "Não"
                },
                {
                    text: "Sim",
                    onPress: () => {
                                    rotina.res.forEach(idNotificacao => {
                                        cancelNotification(idNotificacao);
                                    });
                                    Repositorio_Rotina.deletarRotina(props.id)
                                    .then(alert("Item deletado com sucesso"))
                                    .then(response => props.navigation.navigate("ListaRotina", {id: props.id}));
                                }
                }
            ],
            { cancelable: false }
        );
    }

    //Construção da View
    return (
        <View style={styles.containerRotina}>
          <Text style={styles.textItemRotina}>{props.item}</Text>
          <View style={styles.buttonsContainerRotina}>
            <TouchableOpacity style={styles.deleteButtonRotina} onPress={handleDeletePress} > 
                <Icon name='trash' color='white' size={18}></Icon> 
            </TouchableOpacity> 
            <TouchableOpacity style={styles.editButtonRotina} onPress={handleEditPress} > 
                <Icon name='edit' color='white' size={18}></Icon> 
            </TouchableOpacity> 
          </View>
        </View>
      );
}
