import AsyncStorage from '@react-native-async-storage/async-storage';

async function salvarItems(listaDeItems){
    listaDeItems.id = new Date().getTime();
    let itemsSalvos = [];
    const response = await AsyncStorage.getItem('items');
    
    if(response) itemsSalvos = JSON.parse(response);
    itemsSalvos.push(listaDeItems);
    
    return AsyncStorage.setItem('items', JSON.stringify(itemsSalvos));
}

module.exports = {
    salvarItems
}
