import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Alert} from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';

import Repositorio_Rotina from './Repositorio_Rotina';

export default function Rotina(props){
    async function handleEditPress(){ 
        const afazer = await Repositorio_Rotina.getRotina(props.id);
        props.navigation.navigate("AddRotina", afazer);
    }

    function handleDeletePress(){
        Alert.alert(
            "Atenção",
            "Você tem certeza que deseja deletar este item?",
            [
                {
                    text: "Não",
                    onPress: () => console.log("Cancelado"),
                    style: "cancel"
                },
                {
                    text: "Sim",
                    onPress: () => {
                                    Repositorio_Rotina.deletarRotina(props.id)
                                    .then(alert("Item deletado com sucesso"))
                                    .then(response => props.navigation.navigate("ListaRotina", {id: props.id}));
                                }
                }
            ],
            { cancelable: false }
        );
    }

    return (
        <View style={styles.container}>
          <Text style={styles.textItem}>{props.item}</Text>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.deleteButton} onPress={handleDeletePress} > 
                <Icon name='trash' color='white' size={18}></Icon> 
            </TouchableOpacity> 
            <TouchableOpacity style={styles.editButton} onPress={handleEditPress} > 
                <Icon name='edit' color='white' size={18}></Icon> 
            </TouchableOpacity> 
          </View>
        </View>
      );
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      marginTop: 20,
      width: '100%'
    },
    buttonsContainer: {
        flexDirection: 'row-reverse',
        alignItems: 'flex-end',
        borderBottomWidth: 1,
        borderBottomColor: '#CCC',
        paddingBottom: 10,
        marginTop: 10,
    },
    editButton: {
        marginLeft: 10,
        height: 40,
        backgroundColor: 'blue',
        borderRadius: 10,
        padding: 10,
        fontSize: 12,
        elevation: 10,
        shadowOpacity: 10,
        shadowColor: '#ccc',
        alignItems: 'center'
    },
    deleteButton: {
        marginLeft: 10,
        height: 40,
        width: 40,
        backgroundColor: 'red',
        borderRadius: 10,
        padding: 10,
        fontSize: 12,
        elevation: 10,
        shadowOpacity: 10,
        shadowColor: '#ccc',
        alignItems: 'center'
    },
    textItem: {
        fontSize: 20,
    }
});
