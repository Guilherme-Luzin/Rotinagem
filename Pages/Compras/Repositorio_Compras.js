import AsyncStorage from '@react-native-async-storage/async-storage';

async function salvarItems(listaDeItems, id){
    listaDeItems.id = id ? id : new Date().getTime();
    const itemsSalvos = await getAll();

    if(id){
        const index = await itemsSalvos.findIndex(item => item.id == id);
        itemsSalvos[index] = listaDeItems;
    }
    else
    itemsSalvos.push(listaDeItems);
    
    return AsyncStorage.setItem('items', JSON.stringify(itemsSalvos));
}

function getAll(){
    return AsyncStorage.getItem('items')
        .then(response => {
            if(response)
                return Promise.resolve(JSON.parse(response))
            else
                return Promise.resolve([]);
        });
}

async function getItem(id){
    const itemsSalvos = await getAll();
    return itemsSalvos.find(item => item.id == id);
}

async function deletarItems(id){
    let itemsSalvos = await getAll();
    const index = await itemsSalvos.findIndex(item => item.id == id);
    itemsSalvos.splice(index, 1);
    return AsyncStorage.setItem('items', JSON.stringify(itemsSalvos));
}

module.exports = {
    salvarItems,
    getAll,
    getItem,
    deletarItems
}
