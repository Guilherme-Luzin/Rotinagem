import React from 'react';
import { Text, View, TouchableOpacity, Alert} from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';

import Repositorio_Compras from './Repositorio_Compras';
import { styles } from './Styles';

export default function Itens(props){
    //Função do botão Editar
    async function handleEditPress(){ 
        const item = await Repositorio_Compras.getItem(props.id);
        props.navigation.navigate("AddCompras", item);
    }

    //Função do botão deletar
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
                                    Repositorio_Compras.deletarItems(props.id)
                                    .then(alert("Item deletado com sucesso"))
                                    .then(response => props.navigation.navigate("ListaCompras", {id: props.id}));
                                }
                }
            ],
            { cancelable: false }
        );
    }

    //Construção da View
    return (
        <View style={styles.containerItens}>
          <Text style={styles.textItemItens}>{props.item}</Text>
          <View style={styles.buttonsContainerItens}>
            <TouchableOpacity style={styles.deleteButtonItens} onPress={handleDeletePress} > 
                <Icon name='trash' color='white' size={18}></Icon> 
            </TouchableOpacity> 
            <TouchableOpacity style={styles.editButtonItens} onPress={handleEditPress} > 
                <Icon name='edit' color='white' size={18}></Icon> 
            </TouchableOpacity> 
          </View>
        </View>
      );
}
